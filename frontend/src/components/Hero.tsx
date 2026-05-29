"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const backgrounds = [
  '/slider1.jpg',
  '/slider2.jpg',
];

const WordReveal = ({ text, delayOffset = 0, className = "" }: { text: string, delayOffset?: number, className?: string }) => {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-0 mb-[-0.5em] pt-[0.2em] mt-[-0.2em]">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: delayOffset + (i * 0.05) }}
            className={`inline-block pb-[0.2em] leading-normal ${className}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentBg, setCurrentBg] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const targetDate = new Date("2024-11-13T09:30:00").getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(bgInterval);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 overflow-hidden">
      
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentBg}
            src={backgrounds[currentBg]}
            alt="Hero Background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ y: yBg }}
            className="absolute inset-0 w-full h-[120%] object-cover object-center"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent z-0"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white drop-shadow-md">
              <span className="whitespace-nowrap">
                <WordReveal text="Troubled Waters:" delayOffset={0.2} />
              </span>
              <br />
              <WordReveal 
                text="Sailing with AI in Supply Chain" 
                delayOffset={0.4} 
                className="text-transparent bg-clip-text bg-linear-to-r from-(--accent) to-(--accent-600)" 
              />
            </h1>
            
            <div className="pt-2">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-200 drop-shadow-sm max-w-xl">
                 <WordReveal text="Navigate the complexities of Gulf supply chain & logistics with Accelalpha & Oracle." delayOffset={0.7} />
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20">
                <Calendar className="w-5 h-5 text-(--accent)" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">13th Nov 2024</p>
                <p className="text-xs text-gray-400">Date</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20">
                <Clock className="w-5 h-5 text-(--accent)" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">09:30 AM - 01:00 PM</p>
                <p className="text-xs text-gray-400">Time</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20">
                <MapPin className="w-5 h-5 text-(--accent)" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Marriott Resort, The Palm</p>
                <p className="text-xs text-gray-400">Location</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <a href="#register" className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-[0_0_20px_var(--accent-glow)] hover:scale-[1.02] ui-transition bg-linear-to-r from-(--accent) to-(--accent-600) border border-(--accent)/50">
              Request Your Invitation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:h-150 flex items-center justify-center lg:justify-end"
        >
           <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-full max-w-md text-center space-y-6 shadow-2xl">
              <h3 className="text-2xl font-bold text-white">Countdown to Event</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds }
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-inner bg-black/40 text-white border border-white/10">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-3 text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm font-medium text-gray-300 leading-relaxed">
                  Join executive leaders from <span className="text-white">Al-Futtaim Logistics</span>, <span className="text-white">Weatherford</span>, and <span className="text-white">Dubai Cable Company</span>.
                </p>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
