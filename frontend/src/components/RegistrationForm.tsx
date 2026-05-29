"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, Copy, Check, ShieldAlert } from "lucide-react";

type MatchResponse = {
  status: string;
  message: string;
  matched_session?: {
    session_id: string;
    time: string;
    title: string;
    speaker: string;
  };
  llm_output_validated?: boolean;
  draft?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ name: '', email: '', focus: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [apiResult, setApiResult] = useState<MatchResponse | null>(null);
  const [loadingStep, setLoadingStep] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; focus?: string; submit?: string }>({});
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
    try {
      const raw = window.sessionStorage.getItem('last_invitation_result');
      if (!raw) return;
      const parsed = JSON.parse(raw) as { result: string; apiResult: MatchResponse | null };
      if (parsed.result) setResult(parsed.result);
      if (parsed.apiResult) setApiResult(parsed.apiResult);
    } catch (error) {
      console.error("Failed to restore previous result:", error);
    }
  }, []);

  const validateForm = () => {
    const nextErrors: { name?: string; email?: string; focus?: string } = {};

    const trimmedName = formData.name.trim();
    if (trimmedName.length < 2) {
      nextErrors.name = 'Please enter at least 2 characters for your name.';
    }

    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid professional email address.';
    }

    const trimmedFocus = formData.focus.trim();
    if (trimmedFocus.length < 20) {
      nextErrors.focus = 'Please share at least 20 characters about your professional focus/challenges.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setResult('');
    setApiResult(null);
    setCopied(false);
    setErrors({});
    setLoadingStep('Analyzing your business priorities...');

    try {
      setLoadingStep('Matching your recommended session...');
      const response = await fetch(`${API_BASE_URL}/api/match-and-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let apiMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json();
          if (typeof errorData?.detail === "string") {
            apiMessage = errorData.detail;
          }
        } catch {
          // Keep fallback status message if error payload is not JSON.
        }
        throw new Error(apiMessage);
      }
      setLoadingStep('Drafting your personalized invitation...');
      const data: MatchResponse = await response.json();
      setResult(data.draft ?? '');
      setApiResult(data);
      if (hasHydrated) {
        window.sessionStorage.setItem(
          'last_invitation_result',
          JSON.stringify({ result: data.draft ?? '', apiResult: data }),
        );
      }
    } catch (error) {
      console.error("Connection failed:", error);
      const message = error instanceof Error ? error.message : "Could not complete request.";
      setResult(`Error: ${message}`);
      setApiResult(null);
      setErrors((prev) => ({ ...prev, submit: message }));
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Copy failed:", error);
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
            <h2 className="text-3xl font-bold mb-3">Request a Personalized Invitation</h2>
            <p style={{ color: 'var(--muted)' }}>Share your details to receive a session recommendation and a personalized B2B invitation draft.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold ml-1">Full Name</label>
              <input 
                type="text" id="name" required
                className="w-full rounded-xl px-4 py-3 bg-[var(--bg)] border border-[var(--card-border)] focus-accent ui-transition"
                placeholder="John Doe"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={loading}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold ml-1">Business Email</label>
              <input 
                type="email" id="email" required
                className="w-full rounded-xl px-4 py-3 bg-[var(--bg)] border border-[var(--card-border)] focus-accent ui-transition"
                placeholder="john@company.com"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={loading}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="focus" className="text-sm font-semibold ml-1">Professional Priorities / Challenges</label>
              <textarea 
                id="focus" required rows={4}
                className="w-full rounded-xl px-4 py-3 bg-[var(--bg)] border border-[var(--card-border)] focus-accent ui-transition resize-none"
                placeholder="e.g., We are improving warehouse automation and supply chain resilience..."
                value={formData.focus} onChange={(e) => setFormData({...formData, focus: e.target.value})}
                disabled={loading}
                aria-invalid={Boolean(errors.focus)}
                aria-describedby={errors.focus ? "focus-error" : "focus-help"}
              />
              <p id="focus-help" className="text-xs" style={{ color: 'var(--muted)' }}>Minimum 20 characters to improve session matching accuracy.</p>
              {errors.focus && <p id="focus-error" className="text-sm text-red-500">{errors.focus}</p>}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              aria-busy={loading}
              className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 px-6 rounded-xl ui-transition disabled:opacity-70 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-600)] hover:shadow-lg hover:shadow-[var(--accent-glow)] transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {loadingStep || 'Analyzing your business priorities...'}
                </>
              ) : (
                <>
                  Generate Personalized Invitation
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

            {errors.submit && (
              <p role="alert" className="text-sm text-red-500">{errors.submit}</p>
            )}

            <div
              className="rounded-xl border px-4 py-3 text-xs leading-relaxed"
              style={{ borderColor: 'var(--card-border)', color: 'var(--muted)', backgroundColor: 'var(--card)' }}
            >
              By submitting this form, you consent to the use of your details solely for session matching and invitation drafting related to this event.
              We do not use this information for unrelated marketing communications.
            </div>
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
              Your Recommended Session
            </h2>

            <div aria-live="polite" className="sr-only">
              {loading ? loadingStep : result ? 'Invitation generated.' : 'Awaiting registration details.'}
            </div>

            {loading ? (
              <div className="flex-1 rounded-2xl border border-[var(--card-border)] bg-[var(--bg)] p-6 min-h-[300px]">
                <div className="flex items-center gap-3 mb-6">
                  <Loader2 className="w-5 h-5 animate-spin text-[var(--accent)]" />
                  <p className="font-medium">{loadingStep || 'Generating your personalized invitation...'}</p>
                </div>
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 rounded bg-[var(--card-border)]/60 w-11/12"></div>
                  <div className="h-4 rounded bg-[var(--card-border)]/60 w-10/12"></div>
                  <div className="h-4 rounded bg-[var(--card-border)]/60 w-9/12"></div>
                  <div className="h-4 rounded bg-[var(--card-border)]/60 w-8/12"></div>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-4 flex-1">
                {apiResult?.matched_session && (
                  <div className="rounded-2xl p-4 border border-[var(--card-border)] bg-[var(--card)]">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] mb-2 text-[var(--accent)]">Matched Session</p>
                    <h3 className="font-bold text-lg">{apiResult.matched_session.title}</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{apiResult.matched_session.time}</p>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>Speaker: {apiResult.matched_session.speaker}</p>
                    <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>Session ID: {apiResult.matched_session.session_id}</p>
                  </div>
                )}

                {apiResult && (
                  <div className="rounded-xl p-3 border border-[var(--card-border)] flex items-center gap-2 text-sm">
                    {apiResult.llm_output_validated ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span style={{ color: 'var(--muted)' }}>Your invitation draft is based on verified session details from the official agenda.</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4 text-amber-500" />
                        <span style={{ color: 'var(--muted)' }}>Your invitation draft was prepared from your matched session using the official agenda.</span>
                      </>
                    )}
                  </div>
                )}

                <div className="flex-1 bg-[var(--bg)] rounded-2xl p-6 border border-[var(--card-border)] overflow-y-auto max-h-[500px]">
                  <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{result}</p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] px-4 py-3 font-semibold hover:border-[var(--accent)] ui-transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Copied to clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Invitation Draft
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex-1 border-2 border-dashed border-[var(--card-border)] rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                <div className="w-16 h-16 rounded-full bg-[var(--glass)] flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-[var(--muted)]" />
                </div>
                <p className="text-[var(--muted)] max-w-sm">
                  Submit your details to receive a recommended session and a personalized invitation draft.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
