import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Speakers from "@/components/Speakers";
import Agenda from "@/components/Agenda";
import RegistrationForm from "@/components/RegistrationForm";
import { parseAgenda } from "@/utils/agenda";

export default function Home() {
  const agendaItems = parseAgenda();

  return (
    <main className="min-h-screen">
      <Hero />
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