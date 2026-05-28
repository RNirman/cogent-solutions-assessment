# Full-Stack Intern Assessment

## 1. Live Gateways
* **Frontend (Next.js):** [Add Vercel Link Here]
* **Backend API (FastAPI):** [Add Render Link Here]

## 2. Local Setup Guide
### Prerequisites
* Node.js (v18+)
* Python (3.9+)

### Backend Setup
1. Open a terminal and navigate to the `backend` directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate it: 
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file in the `backend` folder and add:
   - `GEMINI_API_KEY=your_key`
   - `ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000` (adjust for deployed frontend domains)
6. Run the server: `uvicorn main:app --reload`

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env.local` file in the `frontend` folder and add:
   - `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000` (change to your deployed backend URL in production)
4. Run the development server: `npm run dev`
5. Open `http://localhost:3000` in your browser.

## 3. Content Creation Check (LinkedIn Post)
Is your Gulf supply chain ready to weather the storm of rising costs and market volatility? Join us at the Accelalpha-Oracle 2024 Summit to explore how Gen AI and predictive analytics are revolutionizing regional logistics. Register through our new intelligent portal to instantly receive a personalized event itinerary tailored directly to your specific operational challenges!

## 4. Prompt Strategy
To ensure the LLM strictly adhered to the provided event data and eliminated hallucinations, I implemented a rigid constraint-based prompt. The prompt acts as a walled garden by injecting the raw `agenda.txt` content directly into the context window and issuing explicit negative commands (e.g., "DO NOT invent, hallucinate, or guess"). Furthermore, the system instruction explicitly defines the AI's role and restricts its output strictly to the email body, preventing conversational filler or unauthorized data retrieval outside the provided context.