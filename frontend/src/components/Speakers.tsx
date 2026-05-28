"use client";
import { motion } from "framer-motion";

const speakers = [
  { name: 'Dr Raman Kumar', title: 'CEO', company: 'Al-Futtaim Logistics', image: '/drramankumar.png' },
  { name: 'David Moono', title: 'Global Logistics Manager', company: 'Weatherford', image: '/davidmoono.png' },
  { name: 'Tamer Hamed', title: 'CIO', company: 'Dubai Cable Company', image: '/tamerhamed.png' },
  { name: 'Richard Buxton', title: 'VP EMEA', company: 'Accelalpha', image: '/richardbuxton.png' },
  { name: 'Joe Spear', title: 'Partner', company: 'Accelalpha', image: '/joespear.png' },
  { name: 'Srivatsav Sarvepalli', title: 'Regional Director', company: 'Oracle', image: '/srivatsavsarvepalli.png' },
  { name: 'Rohan Chitnis', title: 'Sales Director', company: 'Oracle', image: '/rohanchitnis.png' },
  { name: 'Ujjwal Kumar', title: 'Principal Domain Lead', company: 'Oracle', image: '/ujjwalkumar.png' },
];

export default function Speakers() {
  return (
    <section className="py-24 relative overflow-hidden" id="speakers">
      <div className="absolute inset-0 bg-(--accent) opacity-[0.03] transform -skew-y-3 origin-top-left"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>Featured Speakers</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Meet the Leaders Shaping the Future of Supply Chain</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
          {speakers.map((speaker, idx) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative flex flex-col items-center text-center cursor-pointer"
            >
              <div className="relative w-44 h-44 mb-6">
                
                {/* Static Glow Ring Background on Hover */}
                <div className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 bg-(--accent) filter blur-md bg-opacity-40"></div>
                
                {/* Solid Ring Border */}
                <div className="absolute -inset-1.5 rounded-full border border-(--card-border) group-hover:border-(--accent) transition-colors duration-500 z-0"></div>

                {/* Avatar Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-(--bg) shadow-xl group-hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-shadow duration-500 z-10 bg-(--card-solid)">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 -z-10"></div>
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover object-top filter grayscale-50 group-hover:grayscale-0 ui-transition group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(speaker.name) + '&background=random';
                    }}
                  />
                </div>
              </div>
              
              <div className="relative w-full flex flex-col items-center">
                <h3 className="text-xl font-bold mb-1 group-hover:text-[var(--accent)] ui-transition">{speaker.name}</h3>
                <p className="text-sm font-medium text-[var(--accent)]">{speaker.title}</p>
                
                <div className="absolute top-full left-0 w-full text-center mt-2 overflow-hidden transition-all duration-300 opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
                  <p className="text-sm px-4" style={{ color: 'var(--muted)' }}>{speaker.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
