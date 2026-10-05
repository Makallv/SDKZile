// SDK Zīle Navigation Bar
import React, { useState, useEffect } from 'react';
import { Menu, X, Trophy, Sun, Moon, Monitor, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onOpenAdmin, onOpenCompetitions, currentView, setCurrentView }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sākums', href: '#sakums' },
    { label: 'Par Mums', href: '#par-mums' },
    { label: 'Dejotāji', href: '#dejotaji' },
    { label: 'Nodarbības', href: '#programmas' },
    { label: 'Kāzu Dejas', href: '#kazu-dejas' },
    { label: 'Sasniegumi', href: '#sacensibas', onClick: () => onOpenCompetitions() },
    { label: 'Galerija', href: '#galerija' },
    { label: 'Kontakti', href: '#kontakti' },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        if (link.href.startsWith('#')) {
          const el = document.querySelector(link.href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (link.onClick) {
        link.onClick();
      } else if (link.href.startsWith('#')) {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070D18]/90 backdrop-blur-md border-b border-brand-border/60 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#070D18]/90 via-[#070D18]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#sakums"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-brand-gold/40 p-1 flex items-center justify-center shadow-lg shadow-brand-gold/20 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/logo/logo-zile.png"
                alt="SDK Zīle Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-extrabold text-xl tracking-wider text-white group-hover:text-brand-gold transition-colors">
                SDK ZĪLE
              </span>
              <span className="text-[10px] tracking-widest text-brand-gold font-medium uppercase">
                Mālpils &bull; Sigulda &bull; Kopš 1995
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-brand-gold hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-brand-gold bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all"
              title="Kluba administrācijas panelis"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span>Admin</span>
            </button>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={onOpenAdmin}
              className="p-2 text-brand-gold bg-slate-800/60 rounded-lg border border-slate-700"
              title="Admin"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/60 rounded-lg border border-slate-700"
              aria-label="Izvēlne"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070D18]/95 backdrop-blur-xl border-b border-brand-border px-4 pt-3 pb-6 mt-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-200 hover:text-brand-gold hover:bg-slate-800/50 rounded-xl transition-all text-left"
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-500">&rarr;</span>
              </button>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs text-slate-300 bg-slate-800 border border-slate-700 rounded-xl"
              >
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Kluba Admin Panelis</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
