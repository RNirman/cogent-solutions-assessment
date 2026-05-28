"use client";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-header' : 'bg-transparent border-transparent shadow-none'}`}>
      <div className="w-full flex items-center justify-between px-4 sm:px-8 py-3">
        {/* Left Logo */}
        <div className="flex items-center gap-4">
            <img src="/logo_nbg.png" alt="Event logo" className="w-auto h-16 sm:h-20 object-contain rounded-md" />
            <div className="hidden xl:block">
              <div className="text-sm font-bold tracking-wide" style={{ color: isScrolled ? 'var(--text)' : '#ffffff' }}>Accelalpha • Oracle</div>
              <div className="text-xs font-medium" style={{ color: isScrolled ? 'var(--muted)' : 'rgba(255, 255, 255, 0.7)' }}>Regional AI & Supply Chain Summit</div>
            </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium" style={{ color: isScrolled ? 'var(--text)' : '#ffffff' }}>
          <a href="#overview" className="hover:text-[var(--accent)] ui-transition">Overview</a>
          <a href="#speakers" className="hover:text-[var(--accent)] ui-transition">Speakers</a>
          <a href="#agenda" className="hover:text-[var(--accent)] ui-transition">Agenda</a>
        </nav>

        {/* Right Actions & Logo */}
        <div className="flex items-center gap-4 sm:gap-6">
          <ThemeToggle isScrolled={isScrolled} />
          <a href="#register" className="hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-105 ui-transition" style={{ background: 'var(--accent)' }}>
            Register
          </a>
          <div className="h-10 w-px bg-[var(--card-border)] hidden md:block"></div>
          <img src="/oracle_nbg.png" alt="Oracle" className="w-auto h-12 sm:h-16 object-contain hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
