"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export default function RegistrationForm() {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
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
    <section className="py-24 relative overflow-hidden" id="register">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(249,115,22,0.05)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 md:p-10 rounded-3xl shadow-xl"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3">Request Your Invite</h2>
            <p style={{ color: 'var(--muted)' }}>Fill in your details and let our AI generate a personalized schedule tailored to your career focus.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold ml-1">Full Name</label>
              <input 
                type="text" id="name" required
                className="w-full rounded-xl px-4 py-3 bg-[var(--bg)] border border-[var(--card-border)] focus-accent ui-transition"
                placeholder="John Doe"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold ml-1">Professional Email</label>
              <input 
                type="email" id="email" required
                className="w-full rounded-xl px-4 py-3 bg-[var(--bg)] border border-[var(--card-border)] focus-accent ui-transition"
                placeholder="john@company.com"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="focus" className="text-sm font-semibold ml-1">Career Challenges / Focus</label>
              <textarea 
                id="focus" required rows={4}
                className="w-full rounded-xl px-4 py-3 bg-[var(--bg)] border border-[var(--card-border)] focus-accent ui-transition resize-none"
                placeholder="e.g., I'm struggling with warehouse automation..."
                value={formData.focus} onChange={(e) => setFormData({...formData, focus: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 px-6 rounded-xl ui-transition disabled:opacity-70 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-600)] hover:shadow-lg hover:shadow-[var(--accent-glow)] transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Profile...
                </>
              ) : (
                <>
                  Generate My Schedule
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Results Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-full"
        >
          <div className="h-full glass-panel p-8 md:p-10 rounded-3xl flex flex-col">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-[var(--accent)] w-6 h-6" />
              Your Intelligent Match
            </h2>
            
            {result ? (
              <div className="flex-1 bg-[var(--bg)] rounded-2xl p-6 border border-[var(--card-border)] overflow-y-auto max-h-[500px]">
                 <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{result}</p>
              </div>
            ) : (
              <div className="flex-1 border-2 border-dashed border-[var(--card-border)] rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                <div className="w-16 h-16 rounded-full bg-[var(--glass)] flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-[var(--muted)]" />
                </div>
                <p className="text-[var(--muted)] max-w-sm">
                  Submit your details to let our AI route you to the perfect sessions and draft your personalized invitation.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
