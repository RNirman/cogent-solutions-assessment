import os
import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is missing. Check your .env file.")
genai.configure(api_key=api_key)

app = FastAPI(title="Event RAG Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VisitorInput(BaseModel):
    name: str
    email: str
    focus: str

def send_draft_via_mcp(email_address: str, email_body: str):
    """
    Simulates sending an email by logging it with a UTC timestamp.
    """
    utc_now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    
    print("\n" + "="*50)
    print(f"[{utc_now}] MCP AUTOMATION TRIGGERED")
    print("="*50)
    print(f"TO: {email_address}")
    print(f"BODY:\n{email_body}")
    print("="*50 + "\n")

@app.post("/api/match-and-draft")
async def process_visitor(visitor: VisitorInput):
    try:
        # Read the local agenda file
        # Make sure agenda.txt is in the same directory as this file
        with open("agenda.txt", "r", encoding="utf-8") as file:
            agenda_content = file.read()
            
    except FileNotFoundError:
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
    
    YOUR TASKS:
    1. Analyze the visitor's focus and identify the SINGLE BEST matching session from the agenda.
    2. Draft a professional, welcoming B2B invitation email to the visitor, highlighting this specific session and why it fits their needs.
    
    STRICT RULES:
    - DO NOT invent, hallucinate, or guess any sessions, speakers, times, or topics.
    - ONLY use the exact data provided in the agenda text above.
    - Keep the email concise, persuasive, and under 150 words.
    - Output ONLY the email body text. Do not include subject lines or conversational filler like "Here is the draft".
    """

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        drafted_email = response.text.strip()

        send_draft_via_mcp(visitor.email, drafted_email)
        
        return {
            "status": "success",
            "message": "Match found and draft generated.",
            "draft": drafted_email
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Engine Error: {str(e)}")

@app.get("/")
def read_root():
    return {"status": "Backend is running"}