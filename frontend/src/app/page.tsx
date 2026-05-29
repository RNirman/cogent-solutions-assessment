import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import Features from "@/components/Features";
import Speakers from "@/components/Speakers";
import Agenda from "@/components/Agenda";
import RegistrationForm from "@/components/RegistrationForm";
import { parseAgenda } from "@/utils/agenda";

export default function Home() {
  const agendaItems = parseAgenda();

  return (
    <main id="top" className="min-h-screen">
      <Hero />
      <Overview />
      <Features />
      <Speakers />
      <Agenda agendaItems={agendaItems} />
      <RegistrationForm />

      <footer className="border-t glass-panel" style={{ borderColor: 'var(--card-border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
          <section className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Cogent Solutions™</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              Through our conferences we transform your business challenges into opportunities. Our clients and customers are leading government entities and the fortune 500 companies.
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: 'var(--accent)' }}>Awards</h4>
            <div className="grid grid-cols-2 gap-3">
              {[ '/BPW-2024_2.png', '/bestwork-01.png', '/bestwork-03.png', '/bestwork-04.png' ].map((img) => (
                <img key={img} src={img} alt="Award" className="w-full rounded-xl border object-cover bg-b" style={{ borderColor: 'var(--card-border)' }} />
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: 'var(--accent)' }}>Our Office</h4>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              <p><strong style={{ color: 'var(--text)' }}>Middle East & Africa HQ</strong><br />Office No: 209, The Metropolis Tower<br />Business Bay, Dubai, UAE</p>
              <p><strong style={{ color: 'var(--text)' }}>Asia Pacific HQ</strong><br />2nd floor Green Lanka Tower, Colombo<br />Sri Lanka</p>
              <p><strong style={{ color: 'var(--text)' }}>Saudi Arabia HQ</strong><br />Riyadh, Saudi Arabia</p>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: 'var(--accent)' }}>Contact</h4>
            <div className="space-y-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              <p>+971 4 576 1039</p>
              <p>+971 50 643 5244</p>
              <a href="mailto:partnerships@cogentsolutions.ae" className="inline-block mt-2 font-medium hover:text-(--accent) ui-transition" style={{ color: 'var(--text)' }}>
                partnerships@cogentsolutions.ae
              </a>
              <div className="pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--accent)' }}>Follow Us</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.linkedin.com/company/cogent-solutions-event-management/mycompany/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="inline-flex items-center justify-center rounded-full w-9 h-9 border ui-transition hover:border-(--accent) hover:text-(--accent)"
                    style={{ borderColor: 'var(--card-border)', color: 'var(--muted)' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M6.94 8.5H3.56V20h3.38zM5.25 3A1.97 1.97 0 0 0 3.28 5c0 1.08.88 1.97 1.97 1.97S7.22 6.08 7.22 5A1.97 1.97 0 0 0 5.25 3M20 20h-3.38v-5.6c0-1.34-.03-3.06-1.87-3.06-1.88 0-2.17 1.46-2.17 2.96V20H9.2V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.17z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/cseventsuae/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                    className="inline-flex items-center justify-center rounded-full w-9 h-9 border ui-transition hover:border-(--accent) hover:text-(--accent)"
                    style={{ borderColor: 'var(--card-border)', color: 'var(--muted)' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M13.5 21v-8.1h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H8v3.1h2.6V21h2.9z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/cogent_solutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    className="inline-flex items-center justify-center rounded-full w-9 h-9 border ui-transition hover:border-(--accent) hover:text-(--accent)"
                    style={{ borderColor: 'var(--card-border)', color: 'var(--muted)' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2m0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95zM17.2 6.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 1.8A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/cseventsdxb"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    title="X"
                    className="inline-flex items-center justify-center rounded-full w-9 h-9 border ui-transition hover:border-(--accent) hover:text-(--accent)"
                    style={{ borderColor: 'var(--card-border)', color: 'var(--muted)' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.604 20.635h2.039L6.486 3.25H4.298z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="border-t px-6 py-6 text-center text-sm font-medium" style={{ borderColor: 'var(--card-border)', color: 'var(--muted)' }}>
          © 2026 Cogent Solutions Event Management LLC. All Right Reserved
        </div>
      </footer>
    </main>
  );
}