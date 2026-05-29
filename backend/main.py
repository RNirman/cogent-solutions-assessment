import os
import datetime
import re
import json
import logging
import uuid
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is missing. Check your .env file.")

gemini_client = genai.Client(api_key=api_key)

default_origins = "http://localhost:3000,http://127.0.0.1:3000"
allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", default_origins)
allowed_origins = [origin.strip() for origin in allowed_origins_raw.split(",") if origin.strip()]

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)sZ | %(levelname)s | %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
logger = logging.getLogger("event-rag-backend")

app = FastAPI(title="Event RAG Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VisitorInput(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: EmailStr
    focus: str = Field(..., min_length=20, max_length=1000)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise ValueError("Name must be at least 2 characters.")
        return cleaned

    @field_validator("focus")
    @classmethod
    def validate_focus(cls, value: str) -> str:
        cleaned = value.strip()
        if len(cleaned) < 20:
            raise ValueError("Professional focus/challenges must be at least 20 characters.")
        return cleaned


class AgendaSession(BaseModel):
    session_id: str
    time: str
    title: str
    speaker: str
    focus_keywords: str
    description: str


def _normalize_tokens(text: str) -> set[str]:
    """
    Lowercases and tokenizes text into simple alphanumeric words.
    """
    return set(re.findall(r"[a-z0-9]+", text.lower()))


def parse_agenda_sessions(agenda_content: str) -> list[AgendaSession]:
    """
    Parses [SESSION_X] blocks from agenda.txt into structured sessions.
    """
    blocks = re.findall(
        r"\[(SESSION_\d+)\]\s*(.*?)(?=\n\s*\[SESSION_\d+\]|\Z)",
        agenda_content,
        flags=re.DOTALL,
    )
    sessions: list[AgendaSession] = []

    for session_id, body in blocks:
        def extract(field: str) -> str:
            match = re.search(rf"{field}:\s*(.+)", body)
            return match.group(1).strip() if match else ""

        session = AgendaSession(
            session_id=session_id,
            time=extract("Time"),
            title=extract("Title"),
            speaker=extract("Speaker"),
            focus_keywords=extract("Focus Keywords"),
            description=extract("Description"),
        )
        sessions.append(session)

    if not sessions:
        raise HTTPException(status_code=500, detail="No sessions could be parsed from agenda.txt.")

    return sessions


def match_best_session(visitor_focus: str, sessions: list[AgendaSession]) -> AgendaSession:
    """
    Deterministically matches visitor focus to the most relevant session.
    Scoring favors keyword matches, then title/description overlap.
    """
    focus_tokens = _normalize_tokens(visitor_focus)
    if not focus_tokens:
        raise HTTPException(status_code=400, detail="Professional focus/challenges cannot be empty.")

    best_session = sessions[0]
    best_score = -1.0

    for session in sessions:
        keyword_tokens = _normalize_tokens(session.focus_keywords)
        title_tokens = _normalize_tokens(session.title)
        description_tokens = _normalize_tokens(session.description)

        keyword_overlap = len(focus_tokens & keyword_tokens)
        title_overlap = len(focus_tokens & title_tokens)
        description_overlap = len(focus_tokens & description_tokens)

        # Weighted score with deterministic tie-breaker by agenda order.
        score = (keyword_overlap * 3.0) + (title_overlap * 1.5) + (description_overlap * 1.0)

        if score > best_score:
            best_score = score
            best_session = session

    return best_session


def send_draft_via_mcp(email_address: str, email_body: str, request_id: str):
    """
    Simulates sending an email by logging it with a UTC timestamp.
    """
    utc_now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    logger.info(
        "mcp_triggered request_id=%s timestamp_utc=%s to=%s body=%s",
        request_id,
        utc_now,
        email_address,
        json.dumps(email_body),
    )


def _extract_json_object(text: str) -> dict:
    """
    Attempts to parse a JSON object from model output.
    Handles raw JSON or JSON wrapped in markdown code fences.
    """
    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\s*```$", "", cleaned)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", cleaned, flags=re.DOTALL)
        if not match:
            raise
        return json.loads(match.group(0))


def _build_fallback_email(visitor_name: str, matched_session: AgendaSession) -> str:
    """
    Safe fallback invitation if model output is malformed.
    """
    return (
        f"Dear {visitor_name},\n\n"
        f"Thank you for your interest in the ACCELALPHA-ORACLE-2024 summit. "
        f"Based on your professional focus, we recommend attending "
        f"\"{matched_session.title}\" at {matched_session.time}, presented by {matched_session.speaker}. "
        f"This session is aligned with your stated priorities and offers practical, relevant insights.\n\n"
        f"We look forward to welcoming you.\n"
        f"Kind regards,\n"
        f"Accelalpha & Oracle Event Team"
    )


@app.post("/api/match-and-draft")
async def process_visitor(visitor: VisitorInput):
    request_id = str(uuid.uuid4())
    logger.info("request_received request_id=%s email=%s", request_id, visitor.email)

    try:
        with open("agenda.txt", "r", encoding="utf-8") as file:
            agenda_content = file.read()
        sessions = parse_agenda_sessions(agenda_content)
        matched_session = match_best_session(visitor.focus, sessions)
        logger.info(
            "session_matched request_id=%s session_id=%s title=%s time=%s",
            request_id,
            matched_session.session_id,
            matched_session.title,
            matched_session.time,
        )
            
    except FileNotFoundError:
        logger.exception("agenda_not_found request_id=%s", request_id)
        raise HTTPException(status_code=500, detail="agenda.txt file not found on server.")

    prompt = f"""
    You are an intelligent event routing assistant for the 'ACCELALPHA-ORACLE-2024' summit.
    
    Here is the official event agenda:
    ---
    {agenda_content}
    ---
    
    A new visitor has registered:
    Name: {visitor.name}
    Professional Focus/Challenges: {visitor.focus}

    This visitor has already been matched to this exact session:
    Session ID: {matched_session.session_id}
    Time: {matched_session.time}
    Title: {matched_session.title}
    Speaker: {matched_session.speaker}
    Focus Keywords: {matched_session.focus_keywords}
    Description: {matched_session.description}
    
    YOUR TASKS:
    1. Use ONLY the matched session above.
    2. Draft a professional, welcoming B2B invitation email to the visitor, highlighting this specific session and why it fits their needs.
    
    STRICT RULES:
    - DO NOT invent, hallucinate, or guess any sessions, speakers, times, or topics.
    - ONLY use the exact data provided in the agenda text above.
    - Keep the email concise, persuasive, and under 150 words.
    - Output MUST be valid JSON and nothing else.
    - Use exactly this JSON schema:
      {{
        "session_id": "<matched session id>",
        "session_title": "<matched session title>",
        "email_body": "<professional invitation email body>"
      }}
    - session_id must exactly be "{matched_session.session_id}".
    - session_title must exactly be "{matched_session.title}".
    - email_body must not include subject lines or filler like "Here is the draft".
    """

    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        raw_output = (response.text or "").strip()
        used_fallback = False

        try:
            parsed = _extract_json_object(raw_output)
            drafted_email = str(parsed["email_body"]).strip()
            response_session_id = str(parsed["session_id"]).strip()
            response_session_title = str(parsed["session_title"]).strip()

            if not drafted_email:
                raise ValueError("email_body is empty")
            if response_session_id != matched_session.session_id:
                raise ValueError("session_id does not match enforced session")
            if response_session_title != matched_session.title:
                raise ValueError("session_title does not match enforced session")
        except (KeyError, ValueError, json.JSONDecodeError, TypeError):
            drafted_email = _build_fallback_email(visitor.name, matched_session)
            used_fallback = True
            logger.warning("llm_validation_failed request_id=%s fallback_used=true", request_id)
        else:
            logger.info("llm_validation_passed request_id=%s fallback_used=false", request_id)

        send_draft_via_mcp(visitor.email, drafted_email, request_id)
        
        return {
            "status": "success",
            "message": "Match found and draft generated.",
            "request_id": request_id,
            "matched_session": {
                "session_id": matched_session.session_id,
                "time": matched_session.time,
                "title": matched_session.title,
                "speaker": matched_session.speaker,
            },
            "llm_output_validated": not used_fallback,
            "draft": drafted_email,
        }
        
    except Exception as e:
        logger.exception("request_failed request_id=%s error=%s", request_id, str(e))
        raise HTTPException(status_code=500, detail=f"AI Engine Error: {str(e)}")

@app.get("/")
def read_root():
    return {"status": "Backend is running"}