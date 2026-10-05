import React, { useState, useEffect } from 'react';
import { ArrowRight, Trophy, Heart, Users, MapPin, Sparkles, Award, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

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
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Pictures Carousel from sdk-zile.lv */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {DIENAS_FOTO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <picture>
                <source srcSet={slide.webpUrl} type="image/webp" />
                <img
                  src={slide.url}
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${slide.position || 'object-center'}`}
                />
              </picture>
            </div>
          );
        })}

        {/* Soft, balanced bottom/top transition: preserves 100% full-width photo visibility while keeping text crisp */}
        <div className="hero-dark-overlay absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#070D18] via-transparent via-25% to-black/30" />
        <div className="hero-light-overlay absolute inset-0 z-20 pointer-events-none hidden" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-3xl hero-text-card">
          
          {/* Badge in club logo electric green */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#070D18]/85 backdrop-blur-md border border-[#00FF00]/40 text-[#00FF00] text-xs font-bold uppercase tracking-widest mb-6 shadow-xl shadow-black/40">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF00]" />
            <span>Sporta Deju Klubs ar tradīcijām kopš 1995. gada</span>
          </div>

          {/* Main Title / Tagline in SDK Zīle club logo electric green */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white leading-[1.08] mb-6 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            DEJA IR KUSTĪBA, <br />
            <span className="text-[#00FF00] text-zile-green">
              KUSTĪBA IR PATI DZĪVE
            </span>
          </h1>

          {/* Subheading with high readability */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-100 font-medium leading-relaxed mb-8 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Laipni lūgti sporta deju klubā <strong className="text-white !text-white font-bold underline decoration-[#00FF00]/80 underline-offset-4">“Zīle”</strong>! Aicinām bērnus, 
            jauniešus un pieaugušos apgūt sporta deju soli Mālpilī un Siguldā — no pirmajiem soļiem 
            līdz augstākās klases čempionātu godalgām.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <a
              href="#kontakti"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-brand-dark bg-gradient-to-r from-amber-400 via-brand-gold to-amber-500 shadow-2xl shadow-brand-gold/30 hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-2 group ring-2 ring-brand-gold/50"
            >
              <span>Pieteikties Nodarbībām</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#kazu-dejas"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm tracking-wider text-white bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-slate-600/80 hover:border-brand-gold/60 shadow-xl shadow-black/40 transition-all text-center flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-pink-400" />
              <span>Kāzu Deju Apmācība</span>
            </a>

            <button
              onClick={onOpenCompetitions}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-slate-200 hover:text-brand-gold transition-colors flex items-center justify-center gap-2 bg-[#070D18]/70 hover:bg-white/10 backdrop-blur-md border border-white/15 shadow-lg"
            >
              <Trophy className="w-4 h-4 text-brand-gold" />
              <span>Sacensību Rezultāti</span>
            </button>
          </div>

          {/* Highlights / Stats strip with individual glass cards for superior legibility */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-700/60">
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
      </div>

      {/* Subtle Carousel Controls & Photo Indicators */}
      <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-3 bg-black/75 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-2xl text-xs">
        {/* Photo indicator badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[11px] font-semibold">
          <Camera className="w-3 h-3 text-brand-gold" />
          <span>Kluba fotogalerija</span>
        </div>

        <div className="h-4 w-px bg-white/20" />

        {/* Current slide label */}
        <span className="text-[11px] text-slate-200 font-medium max-w-[260px] truncate hidden md:inline-block">
          {DIENAS_FOTO_SLIDES[currentSlide]?.title}
        </span>

        {/* Prev / Dots / Next */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + DIENAS_FOTO_SLIDES.length) % DIENAS_FOTO_SLIDES.length)}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
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
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-5 bg-brand-gold shadow-sm'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                title={`Pārslēgt uz attēlu ${idx + 1}`}
                aria-label={`Pārslēgt uz attēlu ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % DIENAS_FOTO_SLIDES.length)}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Nākamais foto"
            aria-label="Nākamais foto"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
