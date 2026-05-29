"use client";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'glass-header shadow-md' : 'bg-transparent border-transparent shadow-none'}`}>
      <div className="w-full flex items-center justify-between px-4 sm:px-8 py-3 relative z-10">
        {/* Left Logo */}
        <a href="#top" onClick={scrollToTop} className="flex items-center gap-4 rounded-xl transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/60" aria-label="Go to the top of the page">
          <img src="/logo_nbg.png" alt="Event logo" className="w-auto h-16 sm:h-20 object-contain rounded-md" />
          <div className="hidden xl:block">
            <div className="text-sm font-bold tracking-wide" style={{ color: isScrolled || isMenuOpen ? 'var(--text)' : '#ffffff' }}>Accelalpha • Oracle</div>
            <div className="text-xs font-medium" style={{ color: isScrolled || isMenuOpen ? 'var(--muted)' : 'rgba(255, 255, 255, 0.7)' }}>Regional AI & Supply Chain Summit</div>
          </div>
        </a>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium" style={{ color: isScrolled || isMenuOpen ? 'var(--text)' : '#ffffff' }}>
          <a href="#overview" className="hover:text-(--accent) ui-transition">Event Overview</a>
          <a href="#speakers" className="hover:text-(--accent) ui-transition">Speaker Lineup</a>
          <a href="#agenda" className="hover:text-(--accent) ui-transition">Session Agenda</a>
        </nav>

        {/* Right Actions & Logo */}
        <div className="flex items-center gap-4 sm:gap-6">
          <ThemeToggle isScrolled={isScrolled || isMenuOpen} />
          <a href="#register" className="hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-105 ui-transition" style={{ background: 'var(--accent)' }}>
            Register
          </a>
          <div className="h-10 w-px bg-(--card-border) hidden md:block"></div>
          <img src="/oracle_nbg.png" alt="Oracle" className="w-auto h-12 sm:h-16 object-contain hidden sm:block" />
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 rounded-md focus-accent ui-transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: isScrolled || isMenuOpen ? 'var(--text)' : '#ffffff' }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 glass-header border-t shadow-2xl"
            style={{ borderTopColor: 'var(--card-border)', backgroundColor: 'var(--bg)' }}
          >
            <nav className="flex flex-col py-6 px-6 gap-6 font-medium text-lg" style={{ color: 'var(--text)' }}>
              <a href="#overview" onClick={() => setIsMenuOpen(false)} className="hover:text-(--accent) ui-transition">
                Event Overview
              </a>
              <a href="#speakers" onClick={() => setIsMenuOpen(false)} className="hover:text-(--accent) ui-transition">
                Speaker Lineup
              </a>
              <a href="#agenda" onClick={() => setIsMenuOpen(false)} className="hover:text-(--accent) ui-transition">
                Session Agenda
              </a>
              
              <div className="pt-4 mt-2 border-t flex flex-col" style={{ borderColor: 'var(--card-border)' }}>
                <a href="#register" onClick={() => setIsMenuOpen(false)} className="inline-flex items-center justify-center rounded-full px-5 py-3 text-base font-bold text-white shadow-md hover:shadow-lg ui-transition bg-linear-to-r from-(--accent) to-(--accent-600)">
                  Register Now
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
