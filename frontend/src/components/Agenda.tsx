"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Clock, Users, Mic, Coffee } from "lucide-react";

import type { AgendaItem, SessionType } from "@/types/agenda";
import Particles from "./Particles";

interface AgendaProps {
  agendaItems: AgendaItem[];
}

export default function Agenda({ agendaItems }: AgendaProps) {
  const [filter, setFilter] = useState<SessionType>('all');

  const filteredItems = agendaItems.filter(item => filter === 'all' || item.type === filter);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'networking': return Coffee;
      case 'panel': return Users;
      case 'keynote': return Mic;
      default: return Mic;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="agenda">
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
        <Particles
          particleColors={["#C74634", "#B33C2C", "#D45B4A"]}
          particleCount={300}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>Event Schedule</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Session Agenda</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'keynote', label: 'Keynotes' },
            { id: 'panel', label: 'Panels' },
            { id: 'networking', label: 'Networking' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as SessionType)}
              className={`px-6 py-2 rounded-full text-sm font-semibold ui-transition ${
                filter === btn.id
                  ? 'text-white shadow-lg'
                  : 'border hover:border-(--accent)'
              }`}
              style={filter === btn.id ? { backgroundColor: 'var(--accent)' } : { backgroundColor: 'var(--card)', color: 'var(--text)', borderColor: 'var(--card-border)' }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 ml-4 md:ml-8 space-y-8" style={{ borderColor: 'var(--card-border)' }}>
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.title + idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute top-4 w-8 h-8 rounded-full flex items-center justify-center z-10" style={{ left: '-17px', backgroundColor: 'var(--bg)', border: '2px solid var(--accent)' }}>
                  {(() => {
                    const IconComponent = getIconForType(item.type);
                    return <IconComponent className="w-4 h-4" style={{ color: 'var(--accent)' }} />;
                  })()}
                </div>

                <a
                  href="#"
                  className="block glass-panel p-6 rounded-2xl hover:-translate-y-1 ui-transition relative overflow-hidden group cursor-pointer"
                  style={{ boxShadow: '0 0 0 rgba(0,0,0,0)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 30px rgba(249,115,22,0.18)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)')}
                >

                  <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}></div>
                  <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--accent)' }}>{item.time}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-(--accent) ui-transition" style={{ color: 'var(--text)' }}>{item.title}</h3>
                  
                  {item.speakers.length > 0 && (
                    <div className="space-y-2 mt-4 pt-4 border-t ui-transition" style={{ borderColor: 'var(--card-border)' }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 40%, transparent)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--card-border)')}>
                      {item.speakers.map((speaker, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="font-bold">{speaker.name}</span>
                          <span className="hidden sm:inline" style={{ color: 'var(--muted)' }}>•</span>
                          <span style={{ color: 'var(--muted)' }}>{speaker.role}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
