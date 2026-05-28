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
    <main className="min-h-screen p-8 md:p-24 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <header className="mb-10 border-b pb-12" style={{ borderColor: 'var(--card-border)' }}>
          <div className="inline-block px-3 py-1 mb-6 text-sm font-semibold rounded-full border" style={{ color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 12%, transparent)', borderColor: 'color-mix(in srgb, var(--accent) 32%, transparent)' }}>
            Accelalpha-Oracle 2024 Summit
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6" style={{ color: 'var(--text)' }}>
            Navigate the Complexities of Gulf<br />Supply Chain & Logistics
          </h1>
          <section className="max-w-3xl rounded-3xl p-6 md:p-7" style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)' }}>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text)' }}>
              This is your opportunity to rethink your supply chain strategy, stay ahead of disruption, and lead with sustainable, data-driven solutions tailored to the region’s needs.
            </p>
          </section>
        </header>

        {/* Speakers Section */}
        <section className="card rounded-3xl p-8 md:p-10 mb-12 shadow-xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Reduce costs and improve operational visibility',
              'Build resilience against geopolitical and market volatility',
              'Accelerate sustainable, AI-powered logistics strategies',
            ].map((item) => (
              <article key={item} className="rounded-2xl p-5" style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)' }}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>Focus</p>
                <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text)' }}>{item}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex justify-start">
            <a
              href="#register"
              className="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg hover:scale-[1.02] transition-transform"
              style={{ background: 'var(--accent)' }}
            >
              Register Now
            </a>
          </div>
        </section>

        <section className="card rounded-3xl p-8 md:p-10 mb-12 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>Our Speakers</p>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)' }}>Meet the leaders shaping the future of supply chain</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { name: 'Dr Raman Kumar', title: 'CEO', company: 'Al-Futtaim Logistics', image: '/drramankumar.png' },
              { name: 'David Moono', title: 'Global Logistics Manager', company: 'Weatherford', image: '/davidmoono.png' },
              { name: 'Tamer Hamed', title: 'CIO', company: 'Dubai Cable Company', image: '/tamerhamed.png' },
              { name: 'Richard Buxton', title: 'VP EMEA', company: 'Accelalpha', image: '/richardbuxton.png' },
              { name: 'Joe Spear', title: 'Partner', company: 'Accelalpha', image: '/joespear.png' },
              { name: 'Srivatsav Sarvepalli', title: 'Regional Director Supply Chain Solutions, ECEMEA', company: 'Oracle', image: '/srivatsavsarvepalli.png' },
              { name: 'Rohan Chitnis', title: 'Sales Director Applications', company: 'Oracle', image: '/rohanchitnis.png' },
              { name: 'Ujjwal Kumar', title: 'Principal Domain Lead, ECEMEA', company: 'Oracle', image: '/ujjwalkumar.png' },
            ].map((speaker) => (
              <article key={speaker.name} className="rounded-2xl p-5" style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)' }}>
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="h-32 w-full rounded-xl object-cover mb-4"
                />
                <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>{speaker.name}</h3>
                <p className="mt-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>{speaker.title}</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{speaker.company}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card rounded-3xl p-8 md:p-10 mb-12 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>Top 3 Reasons to Attend</p>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)' }}>Why this event matters for Gulf supply chain leaders</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Oracle’s Gen AI SCM Platform Unveiled',
                text: 'Explore how Oracle’s AI-powered SCM innovations offer predictive analytics, automation, improved visibility, and sustainability into supply chains such as yours.',
              },
              {
                title: 'Customer Success Stories That Deliver Results',
                text: 'Hear how companies partnered with Oracle and Accelalpha to optimize logistics flows, cut costs, and improve resilience while reducing their environmental impact through smarter inventory management and automation.',
              },
              {
                title: 'Practical Solutions for Green and Resilient Operations',
                text: 'Learn how to navigate geopolitical risks, last-mile delivery challenges, and integrate eco-friendly practices—keeping operations agile and competitive in an evolving Gulf market.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl p-5" style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)' }}>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Agenda Section */}
        <section className="mb-12">
          <h2 className="text-5xl font-extrabold mb-8" style={{ color: 'var(--text)' }}>Agenda</h2>
          <div className="flex flex-col gap-6">
            {[
              {
                time: '9.30 AM - 10.00 AM',
                title: 'Registrations',
                speakers: [],
              },
              {
                time: '10.00 AM - 10.10 AM',
                title: 'Welcome Note',
                speakers: [
                  { name: 'Richard Buxton', role: 'VP EMEA, Accelalpha' },
                  { name: 'Rohan Chitnis', role: 'Sales Director Applications, Oracle' },
                ],
              },
              {
                time: '10.10 AM - 10.40 AM',
                title: 'Industry Keynote (Outlook & Challenges on Digital Logistics & Supply Chain)',
                speakers: [
                  { name: 'Srivatsav Sarvepalli', role: 'Regional Director, Supply Chain Solutions, ECEMEA, Oracle' },
                ],
              },
              {
                time: '10.40 AM - 11.10 AM',
                title: 'A Practical Guide to Successful Implementation',
                speakers: [
                  { name: 'Joe Spear', role: 'Partner, Accelalpha' },
                ],
              },
              {
                time: '11.10 AM - 11.30 AM',
                title: 'The Resilient Supply Chain & SCM Innovations',
                speakers: [
                  { name: 'Ujjwal Kumar', role: 'Principal Domain Lead, ECEMEA, Oracle' },
                ],
              },
              {
                time: '11.30 AM - 11.50 AM',
                title: 'Coffee Break',
                speakers: [],
              },
              {
                time: '11.50 AM - 12.10 PM',
                title: 'Insights from Digital Evolution',
                speakers: [
                  { name: 'Dr. Raman Kumar', role: 'CEO, Al-Futtaim Logistics' },
                ],
              },
              {
                time: '12.10 PM - 12.40 PM',
                title: 'Strategies in Action: Insights from Industry Leaders',
                speakers: [
                  { name: 'David Moono', role: 'Global Logistics Manager, Weatherford' },
                  { name: 'Tamer Hamed', role: 'CIO, Dubai Cable Company' },
                ],
              },
              {
                time: '12.40 PM - 01.00 PM',
                title: 'Q&A and Closing Remarks',
                speakers: [],
              },
              {
                time: '01.00 PM - Onwards',
                title: 'Lunch & Networking',
                speakers: [],
              },
            ].map((session, idx) => (
              <div key={idx} className="bg-[#f6f7fa] rounded-lg border border-[#e9eaee] p-7">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="18" height="18" fill="none" stroke="#e74c3c" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <span className="text-sm font-semibold tracking-wide" style={{ color: '#b71c1c' }}>{session.time}</span>
                </div>
                <div className="text-2xl font-semibold mb-2" style={{ color: '#232733' }}>{session.title}</div>
                {session.speakers.length > 0 && (
                  <div className="mt-2 text-base">
                    By{' '}
                    {session.speakers.map((s, i) => (
                      <span key={s.name}>
                        <span className="font-bold" style={{ color: '#232733' }}>{s.name}</span>
                        <span className="ml-1" style={{ color: '#e74c3c' }}>{s.role}</span>
                        {i < session.speakers.length - 1 && <span className="mx-2 text-[#e9eaee]">|</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column: The Registration Form */}
          <section id="register" className="card rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Request Your Invite</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                <input type="text" id="name" required
                  className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--text)' }}
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Professional Email</label>
                <input type="email" id="email" required
                  className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--text)' }}
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="focus" className="block text-sm font-medium text-slate-400 mb-2">Career Challenges / Focus</label>
                <textarea id="focus" required rows={4}
                  placeholder="e.g., I'm struggling with warehouse automation..."
                  className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all resize-none"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--text)' }}
                  value={formData.focus} onChange={(e) => setFormData({...formData, focus: e.target.value})}
                />
              </div>

              <button type="submit" disabled={loading}
                className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center"
                style={{ background: 'var(--accent)' }}>
                {loading ? 'Analyzing Profile...' : 'Generate My Schedule'}
              </button>
            </form>
          </section>

          {/* Right Column: AI Results Display */}
          <section className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-slate-300">Your Intelligent Match</h2>
            {result ? (
              <div className="card rounded-2xl p-8 h-full">
                 <p className="whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--text)' }}>{result}</p>
              </div>
            ) : (
              <div className="card rounded-2xl p-8 h-full flex items-center justify-center text-center" style={{ color: 'var(--muted)' }}>
                <p>Submit your details to let our AI route you to the perfect session and draft your personalized invitation.</p>
              </div>
            )}
          </section>
        </div>

      </div>

      <footer className="mt-16 border-t" style={{ borderColor: 'var(--card-border)', background: 'color-mix(in srgb, var(--card) 90%, black 10%)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
          <section className="md:col-span-1">
            <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Cogent Solutions™</h3>
            <p className="mt-4 text-sm leading-6" style={{ color: 'var(--muted)' }}>
              Through our conferences we transform your business challenges into opportunities. Our clients and customers are leading government entities and the fortune 500 companies.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>Awards</h4>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[ '/BPW-2024_2.png', '/bestwork-01.png', '/bestwork-03.png', '/bestwork-04.png' ].map((img) => (
                <img key={img} src={img} alt="Award" className="w-full rounded-xl border object-cover" style={{ borderColor: 'var(--card-border)' }} />
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>Our office</h4>
            <div className="mt-4 space-y-4 text-sm leading-6" style={{ color: 'var(--muted)' }}>
              <p><strong style={{ color: 'var(--text)' }}>Middle East & Africa HQ</strong><br />Office No: 209, The Metropolis Tower<br />Business Bay, Dubai, United Arab Emirates</p>
              <p><strong style={{ color: 'var(--text)' }}>Asia Pacific HQ</strong><br />2nd floor Green Lanka Tower, Colombo<br />Sri Lanka</p>
              <p><strong style={{ color: 'var(--text)' }}>Saudi Arabia HQ</strong><br />Riyadh, Saudi Arabia</p>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>Contact</h4>
            <div className="mt-4 space-y-2 text-sm leading-6" style={{ color: 'var(--muted)' }}>
              <p>+971 4 576 1039 / +971 50 643 5244</p>
              <a href="mailto:partnerships@cogentsolutions.ae" className="underline" style={{ color: 'var(--text)' }}>partnerships@cogentsolutions.ae</a>
            </div>
          </section>
        </div>

        <div className="border-t px-6 py-4 text-xs" style={{ borderColor: 'var(--card-border)', color: 'var(--muted)' }}>
          © 2026 Cogent Solutions Event Management LLC. All Right Reserved
        </div>
      </footer>
    </main>
  );
}