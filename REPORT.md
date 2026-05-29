# Full-Stack Intern Assessment

## 1. Live Gateways

* **Frontend (Next.js):** https://cogent-solutions-assessment.vercel.app
* **Backend API (FastAPI):** https://ravindunirman-cogent-solutions-assessment.hf.space

---

## 2. Local Setup Guide

### Prerequisites

* Node.js (v18+)
* Python (3.9+)
* Google Gemini API key

### Backend Setup

1. `cd backend`
2. `python -m venv venv`
3. Activate virtual environment:
   * Windows: `.\venv\Scripts\activate`
   * Mac/Linux: `source venv/bin/activate`
4. `pip install -r requirements.txt`
5. Copy env template: `cp .env.example .env` (Windows: `copy .env.example .env`)
6. Set variables in `.env`:
   * `GEMINI_API_KEY=your_key`
   * `ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000`
7. Run API: `uvicorn main:app --reload`
8. API docs: `http://127.0.0.1:8000/docs`

### Frontend Setup

1. `cd frontend`
2. `npm install`
3. Copy env template: `cp .env.example .env.local` (Windows: `copy .env.example .env.local`)
4. Set in `.env.local`:
   * `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000`
5. Run app: `npm run dev`
6. Open: `http://localhost:3000`

### Test the Full Flow

1. Open the registration form and submit Name, Email, and Professional Priorities.
2. Confirm a matched session and invitation draft appear in the UI.
3. Confirm backend logs show MCP trigger output with UTC timestamp, recipient email, and draft body.

---

## 3. Content Creation Check (LinkedIn Post)

Gulf supply chain leaders are navigating rising costs, volatility, and sustainability pressure—often without a clear roadmap. Our new Accelalpha–Oracle interactive event portal helps corporate conference planners deliver a smarter delegate experience: visitors share their priorities, receive a recommended session from the official agenda, and instantly get a personalized B2B invitation draft. If you run executive summits and want higher engagement with less manual follow-up, this is the kind of intelligent event experience your audience expects.

---

## 4. Prompt Strategy

To prevent hallucinations, session routing and email generation are separated. First, the backend deterministically retrieves the best session from `agenda.txt` using keyword/title/description scoring. Only that matched session (plus official agenda context) is passed to the LLM. The prompt includes strict negative rules (“do not invent sessions, speakers, times, or topics”), requires JSON-only output (`session_id`, `session_title`, `email_body`), and the server validates that returned session fields exactly match the pre-selected session. If validation fails, a safe fallback invitation is generated using only verified agenda fields. Finally, `send_draft_via_mcp()` is triggered automatically and logs recipient, body, and UTC timestamp.

---