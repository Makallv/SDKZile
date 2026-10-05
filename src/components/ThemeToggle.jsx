import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getStoredTheme, storeThemePreference, systemPrefersDark, initTheme } from '../lib/theme';

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(() => {
    const pref = getStoredTheme();
    if (pref === 'dark') return true;
    if (pref === 'light') return false;
    return systemPrefersDark();
  });

  useEffect(() => {
    const cleanup = initTheme();
    const pref = getStoredTheme();
    setIsDark(pref === 'dark' || (pref === null && systemPrefersDark()));
    return () => cleanup && cleanup();
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    const nextPref = nextIsDark ? 'dark' : 'light';
    setIsDark(nextIsDark);
    storeThemePreference(nextPref);
    initTheme();
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? 'Pārslēgt uz gaišo tēmu' : 'Pārslēgt uz tumšo tēmu'}
      aria-label={isDark ? 'Pārslēgt uz gaišo tēmu' : 'Pārslēgt uz tumšo tēmu'}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer shadow-sm select-none ${
        isDark
          ? 'text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 hover:border-brand-gold/60'
          : 'text-slate-800 bg-slate-100 hover:bg-slate-200 border-slate-300 hover:border-brand-gold/80'
      } ${className}`}
    >
      {isDark ? (
        <>
          <Moon className="w-3.5 h-3.5 text-brand-gold" />
          <span>Tumšs</span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-600" />
          <span>Gaišs</span>
        </>
      )}
    </button>
  );
}
