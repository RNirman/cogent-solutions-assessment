'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', focus: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/match-and-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.draft);

    } catch (error) {
      console.error("Connection failed:", error);
      setResult("Error: Could not connect to the AI engine. Please ensure your Python backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 md:p-24 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <header className="mb-16 border-b border-slate-800 pb-12">
          <div className="inline-block px-3 py-1 mb-6 text-sm font-semibold text-indigo-400 bg-indigo-950/50 rounded-full border border-indigo-500/20">
            Accelalpha-Oracle 2024 Summit
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Troubled Waters: <br /> Sailing with AI in Supply Chain
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Discover how Gen AI and predictive analytics are future-proofing regional logistics. 
            Register below to receive a personalized event schedule tailored to your exact professional challenges.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column: The Registration Form */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Request Your Invite</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                <input type="text" id="name" required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Professional Email</label>
                <input type="email" id="email" required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="focus" className="block text-sm font-medium text-slate-400 mb-2">Career Challenges / Focus</label>
                <textarea id="focus" required rows={4}
                  placeholder="e.g., I'm struggling with warehouse automation..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  value={formData.focus} onChange={(e) => setFormData({...formData, focus: e.target.value})}
                />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center">
                {loading ? 'Analyzing Profile...' : 'Generate My Schedule'}
              </button>
            </form>
          </section>

          {/* Right Column: AI Results Display */}
          <section className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-slate-300">Your Intelligent Match</h2>
            {result ? (
              <div className="bg-slate-800/50 border border-indigo-500/30 rounded-2xl p-8 h-full">
                 <p className="whitespace-pre-wrap text-slate-300 leading-relaxed">{result}</p>
              </div>
            ) : (
              <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-8 h-full flex items-center justify-center text-slate-500 text-center">
                <p>Submit your details to let our AI route you to the perfect session and draft your personalized invitation.</p>
              </div>
            )}
          </section>
        </div>

      </div>
    </main>
  );
}