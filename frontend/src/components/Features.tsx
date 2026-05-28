"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, TrendingUp, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import Particles from "./Particles";

const features = [
  {
    icon: Lightbulb,
    title: 'Oracle’s Gen AI SCM Platform Unveiled',
    text: 'Explore how Oracle’s AI-powered SCM innovations offer predictive analytics, automation, improved visibility, and sustainability into supply chains such as yours.',
    image: '/image-1.jpg'
  },
  {
    icon: TrendingUp,
    title: 'Customer Success Stories That Deliver Results',
    text: 'Hear how companies partnered with Oracle and Accelalpha to optimize logistics flows, cut costs, and improve resilience while reducing their environmental impact through smarter inventory management and automation.',
    image: '/image-2.jpg'
  },
  {
    icon: ShieldCheck,
    title: 'Practical Solutions for Green and Resilient Operations',
    text: 'Learn how to navigate geopolitical risks, last-mile delivery challenges, and integrate eco-friendly practices—keeping operations agile and competitive in an evolving Gulf market.',
    image: '/image-3.jpg'
  },
];

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden" id="reasons">
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
        <Particles
          particleColors={["#f97316", "#ea580c", "#ff8a3d"]}
          particleCount={200}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>Three Strategic Outcomes</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Why This Summit Matters for Gulf Supply Chain Leaders</h2>
        </div>

        <div className="space-y-24">
          {features.map((feature, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={feature.title} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                
                {/* Image Column */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2 relative group perspective-1000"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl glass-panel group-hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] ui-transition transform transition-transform duration-500 group-hover:scale-[1.02]">
                    <motion.img 
                      src={feature.image} 
                      alt={feature.title}
                      style={{ y: yParallax, scale: 1.1 }}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 to-transparent mix-blend-overlay"></div>
                  </div>
                  
                  {/* Floating Icon Badge */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                    className="absolute -bottom-6 -right-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-[-30px] w-16 h-16 rounded-2xl glass-panel flex items-center justify-center shadow-xl border-2 border-[var(--accent)] z-10 bg-[var(--bg)]"
                  >
                    <feature.icon className="w-8 h-8 text-[var(--accent)]" />
                  </motion.div>
                </motion.div>

                {/* Text Column */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--card-border)] bg-[var(--card)]">
                    <span className="text-xl font-bold text-[var(--accent)]">0{idx + 1}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">{feature.title}</h3>
                  <p className="text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>{feature.text}</p>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
