"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : systemPrefersDark
        ? "dark"
        : "light";

    setTheme(initialTheme);
    setIsHydrated(true);
    document.documentElement.setAttribute("data-theme", initialTheme);
    window.localStorage.setItem("theme", initialTheme);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme, isHydrated]);

  const toggle = () => setTheme((current) => (current === "dark" ? "light" : "dark"));
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle light / dark"
      className="ui-transition inline-flex items-center gap-2 px-3 py-1 rounded-full focus-accent"
      style={{
        background: "transparent",
        border: "1px solid var(--card-border)",
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {isDark ? (
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        ) : (
          <circle cx="12" cy="12" r="4" />
        )}
      </svg>
      <span className="text-sm text-(--muted)">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
