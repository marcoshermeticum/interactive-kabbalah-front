'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--text-secondary)]/20 hover:opacity-80 transition text-sm"
      aria-label="Toggle theme"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
