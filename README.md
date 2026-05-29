# 🌐 Accelalpha & Oracle Interactive Event Portal

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-f00?style=flat&logo=framer)
![Google Gemini](https://img.shields.io/badge/Gemini_AI-1.5_Pro-blue?style=flat&logo=google)

A modern, highly interactive Single Page Application (SPA) built for corporate event registration. This project serves as a full-stack assessment submission, combining a premium, animated frontend with an intelligent, deterministic AI-powered backend for dynamic session routing and automated B2B invitation drafting.

---

## ✨ Key Features

### 🎨 Premium Frontend Experience
* **Modern Glassmorphism:** Sleek, frosted-glass UI components and modal windows.
* **Fluid Animations:** Scroll-triggered reveals, spring physics, and stagger animations powered by `framer-motion`.
* **Dynamic WebGL Backgrounds:** High-tech, subtle particle mesh backgrounds using `ogl` and React Bits.
* **Theme Switching:** Fully responsive Light and Dark modes with seamless global CSS color transitions.
* **Mobile Optimized:** Custom hamburger navigation menu and responsive layout grids.

### 🧠 Intelligent Backend Pipeline
* **Deterministic Routing:** Uses keyword/title scoring against a verified `agenda.txt` to guarantee 0% hallucination when recommending sessions.
* **AI Invitation Drafting:** Leverages the Google Gemini API to generate personalized B2B invitation emails based on the user's selected professional priorities and matched session.
* **MCP Logging:** Automatically triggers and logs the generated draft simulating a Model Context Protocol (MCP) tool call.

---

## 📂 Repository Structure

- `frontend/` — The Next.js 14 Single Page Application.
- `backend/` — The FastAPI server handling logic, LLM calls, and the `agenda.txt` data.
- `REPORT.md` — **[REQUIRED ASSESSMENT DOCUMENT]** Contains live deployment URLs, detailed setup instructions, the LinkedIn post, and prompt strategy explanations.

---

## 🚀 Quick Start & Assessment Details

For full setup instructions, API keys, and to view the live deployed URLs, please refer to the official assessment report document:

👉 **[View the Complete Assessment Report (REPORT.md)](./REPORT.md)**

### Basic Local Spin-Up

```bash
# 1. Start the Backend
cd backend
python -m venv venv
source venv/bin/activate  # (Windows: .\venv\Scripts\activate)
pip install -r requirements.txt
# Set GEMINI_API_KEY in .env
uvicorn main:app --reload

# 2. Start the Frontend (New Terminal)
cd frontend
npm install
# Set NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000 in .env.local
npm run dev
```

---

*Designed and developed for the Cogent Solutions Event Management Full-Stack Intern Assessment.*
