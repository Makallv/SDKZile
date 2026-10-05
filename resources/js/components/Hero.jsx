import React, { useState, useEffect } from 'react';
import { ArrowRight, Trophy, Heart, Users, MapPin, Sparkles, Award, ChevronLeft, ChevronRight } from 'lucide-react';

// 5 authentic rotating photos: Marks & Evelina, Kristers & Amanda, Iveta Zile, and Championship
const DIENAS_FOTO_SLIDES = [
  {
    url: '/images/hero/hero-marks-evelina-latin.jpg',
    webpUrl: '/images/hero/hero-marks-evelina-latin.webp',
    title: 'Marks & Evelīna • Jauniešu A Klase',
    subtitle: 'SDK Zīle meistarības flagmanis un ilggadējie čempionātu laureāti',
    position: 'object-[center_24%] sm:object-[center_26%]'
  },
  {
    url: '/images/hero/hero-kristers-amanda-standard.jpg',
    webpUrl: '/images/hero/hero-kristers-amanda-standard.webp',
    title: 'Kristers & Amanda • Juniori I C Klase',
    subtitle: '7 gadi partnerībā no 1. klases līdz valsts čempionātu virsotnēm',
    position: 'object-[center_28%]'
  },
  {
    url: '/images/hero/hero-iveta-zile-founder.jpg',
    webpUrl: '/images/hero/hero-iveta-zile-founder.webp',
    title: 'Kluba dibinātāja • Iveta Zīle',
    subtitle: 'Sporta deju tradīcijas, pedagoģiskā meistarība un mīlestība pret deju kopš 1995. gada',
    position: 'object-[center_20%]'
  },
  {
    url: '/images/hero/hero-cempionati-abipori.jpg',
    webpUrl: '/images/hero/hero-cempionati-abipori.webp',
    title: 'Latvijas Čempionāts 10 dejās',
    subtitle: 'SDK Zīle vadošie pāri Jelgavas Domes kausā uz goda pjedestāla',
    position: 'object-[center_25%]'
  },
  {
    url: '/images/hero/hero-marks-evelina-waltz.jpg',
    webpUrl: '/images/hero/hero-marks-evelina-waltz.webp',
    title: 'Marks & Evelīna • Standartdejas',
    subtitle: 'Nevainojama stāja, valša vieglums un kluba meistarība',
    position: 'object-[center_24%]'
  }
];

export default function Hero({ onOpenCompetitions }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DIENAS_FOTO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section 
      id="sakums" 
      className="relative min-h-[94vh] flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Pictures Carousel: Dedicated right-hand section on desktop so the left stack never covers anyone */}
      <div className="hero-bg-base absolute inset-0 z-0 overflow-hidden bg-[#070D18]">
        
        {/* Pictures Container: Shifted to the right on desktop, with feathered perimeter blending */}
        <div className="hero-photos-container absolute inset-0 lg:left-[16%] lg:w-[84%] xl:left-[18%] xl:w-[82%] 2xl:left-[22%] 2xl:w-[78%]">
          {DIENAS_FOTO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.url}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <picture className="w-full h-full block">
                  <source srcSet={slide.webpUrl} type="image/webp" />
                  <img
                    src={slide.url}
                    alt={slide.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className={`w-full h-full object-cover hero-sharp-img ${slide.position || 'object-center'}`}
                  />
                </picture>
              </div>
            );
          })}
        </div>

        {/* Soft edge gradient on left to seamlessly blend into the text backdrop */}
        <div className="hero-left-vignette absolute inset-0 z-10 pointer-events-none" />

        {/* Top vignette: blends smoothly into the navbar and page top */}
        <div className="hero-top-vignette absolute inset-0 z-10 pointer-events-none" />

        {/* Right edge vignette: feathers ultra-wide borders */}
        <div className="hero-right-vignette absolute inset-0 z-10 pointer-events-none" />

        {/* Bottom vignette: keeps the bottom stats area clear and readable while transitioning into next section */}
        <div className="hero-bottom-vignette absolute inset-0 z-10 pointer-events-none" />
      </div>

      {/* TOP & MIDDLE: Compact welcoming text strictly on the left, keeping all photo subjects 100% uncovered */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 flex-1 flex items-center">
        <div className="w-full max-w-md lg:max-w-[420px] xl:max-w-[450px] text-center sm:text-left hero-text-card">
          
          {/* Badge in club logo electric green */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070D18]/85 backdrop-blur-md border border-[#00FF00]/40 text-[#00FF00] text-xs font-bold uppercase tracking-widest mb-4 shadow-xl shadow-black/40">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF00]" />
            <span>Sporta Deju Klubs kopš 1995. gada</span>
          </div>

          {/* Main Title / Tagline in SDK Zīle electric green */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-sans font-black tracking-tight text-white leading-[1.08] mb-4 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            DEJA IR KUSTĪBA, <br />
            <span className="text-[#00FF00] text-zile-green">
              KUSTĪBA IR PATI DZĪVE
            </span>
          </h1>

          {/* Welcoming Subheading in Italics */}
          <p 
            className="text-sm sm:text-base text-slate-100 italic font-medium leading-relaxed mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-md"
            style={{ fontStyle: 'italic' }}
          >
            Laipni lūgti sporta deju klubā <strong className="text-white !text-white font-bold underline decoration-[#00FF00]/80 underline-offset-4">“Zīle”</strong>! Aicinām bērnus, 
            jauniešus un pieaugušos apgūt sporta deju soli Mālpilī un Siguldā — no pirmajiem soļiem 
            līdz augstākās klases čempionātu godalgām.
          </p>

          {/* Compact CTA Buttons: stacked cleanly within 360px so they never stretch into the image */}
          <div className="flex flex-col gap-3 max-w-[360px] mx-auto sm:mx-0 w-full">
            <a
              href="#kontakti"
              className="w-full px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-brand-dark bg-gradient-to-r from-amber-400 via-brand-gold to-amber-500 shadow-xl shadow-brand-gold/30 hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-2 group ring-2 ring-brand-gold/50"
            >
              <span>Pieteikties Nodarbībām</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full">
              <a
                href="#kazu-dejas"
                className="flex-1 px-4 py-3 rounded-xl font-bold text-xs tracking-wider text-white bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-slate-600/80 hover:border-brand-gold/60 shadow-xl shadow-black/40 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>Kāzu Dejas</span>
              </a>

              <button
                onClick={onOpenCompetitions}
                className="flex-1 px-4 py-3 rounded-xl font-semibold text-xs text-slate-200 hover:text-brand-gold transition-colors flex items-center justify-center gap-1.5 bg-[#070D18]/80 hover:bg-white/10 backdrop-blur-md border border-white/15 shadow-lg cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Rezultāti</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION: Highlights / Stats Strip spanning the bottom as it was */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Subtle photo info & controls right above the stats strip */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-slate-200 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="font-semibold text-white">{DIENAS_FOTO_SLIDES[currentSlide]?.title}</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">• {DIENAS_FOTO_SLIDES[currentSlide]?.subtitle}</span>
          </div>

          {/* Photo carousel pagination controls */}
          <div className="inline-flex items-center gap-2 ml-auto bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + DIENAS_FOTO_SLIDES.length) % DIENAS_FOTO_SLIDES.length)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Iepriekšējais foto"
              aria-label="Iepriekšējais foto"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            
            <div className="flex items-center gap-1.5 px-1">
              {DIENAS_FOTO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? 'w-4 bg-brand-gold'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  title={`Foto ${idx + 1}`}
                  aria-label={`Foto ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % DIENAS_FOTO_SLIDES.length)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Nākamais foto"
              aria-label="Nākamais foto"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Stats Cards along the bottom as it was */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-700/60 pt-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg">
            <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-brand-gold shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-lg sm:text-xl font-extrabold text-white">30+</div>
              <div className="text-xs text-slate-300 font-medium">Gadi Deju Zālē</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg">
            <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-lg sm:text-xl font-extrabold text-white">2 Bāzes</div>
              <div className="text-xs text-slate-300 font-medium">Mālpils & Sigulda</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg">
            <div className="p-2 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-lg sm:text-xl font-extrabold text-white">No 4 g.v.</div>
              <div className="text-xs text-slate-300 font-medium">Līdz A klasei</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg">
            <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-lg sm:text-xl font-extrabold text-white">LSDF</div>
              <div className="text-xs text-slate-300 font-medium">Sertificēti Treneri</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
