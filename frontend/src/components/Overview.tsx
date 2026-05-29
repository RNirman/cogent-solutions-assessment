"use client";
import { motion } from "framer-motion";

export default function Overview() {
  return (
    <section id="overview" className="py-24 relative overflow-hidden bg-[var(--card)] border-y border-[var(--card-border)]">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-8 leading-tight"
        >
          Navigate the Complexities of Gulf Supply Chain & Logistics
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-lg md:text-xl leading-relaxed font-medium" 
          style={{ color: 'var(--muted)' }}
        >
          <p>
            The Gulf’s supply chains are under pressure from rising costs, geopolitical instability, and shifting sustainability mandates, forcing CFOs, COOs, and supply chain leaders to reduce costs, build resilience, and integrate sustainable practices without compromising performance, with AI-powered SCM and WMS solutions being key to future-proofing logistics and driving efficiency.
          </p>
          <p>
            This exclusive event, hosted by <strong style={{ color: 'var(--text)' }}>Accelalpha & Oracle</strong>, offers practical insights and real-world strategies to streamline operations, reduce risks, and meet sustainability goals while staying ahead of market volatility.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
