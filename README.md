# Accelalpha–Oracle Event Portal (Full-Stack Intern Assessment)

Interactive single-page event experience with intelligent session matching and personalized invitation drafting.

## Repository Structure

- `frontend/` — Next.js SPA (Vercel/Netlify)
- `backend/` — FastAPI API + `agenda.txt` + LLM matching/drafting (Render/Hugging Face)
- `REPORT.md` — Required submission document (live URLs, setup, LinkedIn post, prompt strategy)

## Quick Start

See **REPORT.md → Local Setup Guide** for full instructions.

```bash
# Backend
cd backend
python -m venv venv
# activate venv, then:
pip install -r requirements.txt
cp .env.example .env   # add GEMINI_API_KEY
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Before You Deploy

1. Add all image assets listed in `frontend/public/ASSETS_REQUIRED.md`.
2. Deploy backend first, then frontend.
3. Update live URLs and CORS/API env vars in `REPORT.md`.
