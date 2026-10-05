import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, MapPin, Trophy, ArrowLeft, Share2, 
  ChevronLeft, ChevronRight, Camera, X, Award, CheckCircle2, Star
} from 'lucide-react';
import { cleanText } from '../lib/textUtils';

export default function CompetitionDetailPage({ 
  competition, 
  competitions = [], 
  onBack, 
  onNavigateToCompetition 
}) {
  const [activePhoto, setActivePhoto] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!competition) return null;

  // Use all pictures from that competition, fallback to coverImage
  const galleryImages = useMemo(() => {
    if (Array.isArray(competition.gallery) && competition.gallery.length > 0) {
      return competition.gallery;
    }
    return competition.coverImage ? [competition.coverImage] : [];
  }, [competition]);

  // Reset selected photo when switching competitions
  useEffect(() => {
    setSelectedPhotoIndex(0);
  }, [competition.id]);

  const activeBigPicture = galleryImages[selectedPhotoIndex] || galleryImages[0] || competition.coverImage;

  // Find previous and next competitions for discrete post navigation
  const currentIndex = competitions.findIndex(c => c.id === competition.id);
  const prevComp = currentIndex > 0 ? competitions[currentIndex - 1] : null;
  const nextComp = currentIndex >= 0 && currentIndex < competitions.length - 1 ? competitions[currentIndex + 1] : null;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#070D18] min-h-screen text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Atpakaļ uz visiem rezultātiem</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-all border border-slate-700 shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5 text-brand-gold" />
              <span>{copied ? 'Saite nokopēta! ✓' : 'Kopīgot'}</span>
            </button>
          </div>
        </div>

        {/* Hero Article Header */}
        <article className="space-y-8">
          
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-md bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-wider shadow-md">
                {competition.category || 'Reitings'}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-md">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                <span>{competition.date}</span>
              </span>

              {competition.location && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-md">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{competition.location}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight">
              {cleanText(competition.title)}
            </h1>
          </div>

          {/* Main Big Picture Showcase from that comp pictures */}
          {activeBigPicture && (
            <div id="big-picture-showcase" className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden border border-brand-gold/30 shadow-2xl bg-slate-950 flex items-center justify-center min-h-[380px] max-h-[640px] group">
                {/* Blurred atmospheric backdrop filling the container */}
                <img
                  src={activeBigPicture}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-top blur-2xl opacity-30 scale-110 pointer-events-none select-none transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D18]/80 via-transparent to-[#070D18]/40 pointer-events-none" />

                {/* Uncropped foreground big picture preserving full height, heads & awards */}
                <img
                  src={activeBigPicture}
                  alt={competition.title}
                  onClick={() => setActivePhoto(activeBigPicture)}
                  className="relative z-10 max-h-[620px] w-auto max-w-full object-contain mx-auto shadow-2xl rounded-2xl cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                  title="Klikšķiniet, lai atvērtu pilnā izmērā"
                />

                {/* Previous / Next Arrows on Big Picture (if multiple pictures from that comp) */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-white backdrop-blur-md border border-white/10 transition-all opacity-85 hover:opacity-100 shadow-lg"
                      title="Iepriekšējā fotogrāfija"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-white backdrop-blur-md border border-white/10 transition-all opacity-85 hover:opacity-100 shadow-lg"
                      title="Nākamā fotogrāfija"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Photo counter badge */}
                {galleryImages.length > 1 && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-slate-200">
                    <span>{selectedPhotoIndex + 1} / {galleryImages.length}</span>
                  </div>
                )}

                {/* Quick action to open full resolution */}
                <button
                  type="button"
                  onClick={() => setActivePhoto(activeBigPicture)}
                  className="absolute bottom-4 right-4 z-20 px-3.5 py-2 rounded-xl bg-black/75 hover:bg-brand-gold hover:text-brand-dark text-white text-xs font-semibold flex items-center gap-2 backdrop-blur-md border border-white/10 transition-all opacity-85 hover:opacity-100 shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                  <span>Skatīt pilnā izmērā</span>
                </button>
              </div>

              {/* Thumbnails strip directly below the big picture */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                  {galleryImages.map((img, idx) => {
                    const isSelected = idx === selectedPhotoIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPhotoIndex(idx)}
                        className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-slate-900 ${
                          isSelected
                            ? 'border-brand-gold ring-2 ring-brand-gold/50 scale-105 shadow-lg'
                            : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                        }`}
                        title={`Izvēlēties fotogrāfiju ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Sīktēls ${idx + 1}`}
                          className="w-full h-full object-cover object-top"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Article Text Content */}
          <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-10 border border-slate-800/80 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold">
              <Trophy className="w-4 h-4" />
              <span>Sacensību norise & Treneru atsauce</span>
            </div>

            <div className="text-sm sm:text-base text-slate-200 leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {cleanText(competition.description || competition.summary || 'Sacensību apraksts sagatavošanā.')}
            </div>
          </div>

          {/* Results Breakdown Table (if available) */}
          {Array.isArray(competition.results) && competition.results.length > 0 && (
            <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  <Award className="w-4 h-4" />
                  <span>Dejotāju Starti & Iegūtās Vietas</span>
                </div>
                <span className="text-xs text-slate-400">
                  Kopā: {competition.results.length} starti
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-5 py-3.5">Dejotājs / Pāris</th>
                      <th className="px-5 py-3.5">Vecuma Grupa / Klase</th>
                      <th className="px-5 py-3.5">Programma</th>
                      <th className="px-5 py-3.5 text-right">Vieta / Sasniegums</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#131D31]">
                    {competition.results.map((r, idx) => {
                      const isSolo = r.isSolo || (typeof r.couple === 'string' && r.couple.toLowerCase().includes('solo'));
                      const displayName = cleanText(r.couple || '').replace(/^Solo:\s*/i, '');
                      const is1st = (r.placement || '').includes('1.');
                      const is2nd = (r.placement || '').includes('2.');
                      const is3rd = (r.placement || '').includes('3.');

                      return (
                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-4 font-bold text-white whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {isSolo ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                                  Solo
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                  Pāris
                                </span>
                              )}
                              <span>{displayName}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-300 font-medium">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-800 border border-slate-700 text-slate-200">
                              {cleanText(r.age_group || r.ageGroup || r.group || r.category || '—')}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                              r.discipline === 'Standartdejas (ST)'
                                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                                : r.discipline === 'Latīņamerikas dejas (LA)'
                                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                : r.discipline === '10 dejas'
                                ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                                : 'bg-slate-700/30 text-slate-300 border border-slate-700/50'
                            }`}>
                              {r.discipline || 'Sporta dejas'}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right font-bold whitespace-nowrap">
                            <span className={
                              is1st
                                ? 'text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30'
                                : is2nd
                                ? 'text-slate-200 bg-slate-400/10 px-2.5 py-1 rounded-md border border-slate-400/30'
                                : is3rd
                                ? 'text-amber-600 bg-amber-700/10 px-2.5 py-1 rounded-md border border-amber-700/30'
                                : 'text-brand-gold'
                            }>
                              {is1st ? '🥇 ' : is2nd ? '🥈 ' : is3rd ? '🥉 ' : ''}{cleanText(r.placement)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Photo Gallery from the actual competition */}
          {galleryImages.length > 0 && (
            <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  <Camera className="w-4 h-4" />
                  <span>Visas fotogrāfijas no sacensībām</span>
                </div>
                <span className="text-xs text-slate-400">
                  {galleryImages.length} {galleryImages.length === 1 ? 'fotogrāfija' : 'fotogrāfijas'} &bull; Klikšķiniet, lai rādītu kā lielo attēlu
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {galleryImages.map((img, idx) => {
                  const isSelected = idx === selectedPhotoIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedPhotoIndex(idx);
                        const el = document.getElementById('big-picture-showcase');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className={`group relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 shadow-md bg-slate-900 ${
                        isSelected ? 'border-brand-gold ring-2 ring-brand-gold/50' : 'border-slate-800 hover:border-brand-gold/60'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${competition.title} foto ${idx + 1}`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <span className="text-xs text-white font-medium flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-brand-gold" />
                          <span>Rādīt lielo attēlu</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhoto(img);
                          }}
                          className="px-2.5 py-1 rounded-md bg-brand-gold text-brand-dark text-[11px] font-bold shadow hover:bg-amber-400 transition-colors"
                          title="Atvērt pilnā ekrānā"
                        >
                          Palielināt
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Discrete Post Navigation (Previous / Next) */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {nextComp ? (
              <button
                onClick={() => onNavigateToCompetition(nextComp)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all group"
              >
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Iepriekšējās sacensības</span>
                </div>
                <div className="text-xs font-semibold text-white group-hover:text-brand-gold transition-colors truncate max-w-xs mt-0.5">
                  {nextComp.title}
                </div>
              </button>
            ) : <div />}

            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              Atpakaļ uz sarakstu
            </button>

            {prevComp ? (
              <button
                onClick={() => onNavigateToCompetition(prevComp)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-right transition-all group"
              >
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-end gap-1">
                  <span>Jaunākas sacensības</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-xs font-semibold text-white group-hover:text-brand-gold transition-colors truncate max-w-xs mt-0.5">
                  {prevComp.title}
                </div>
              </button>
            ) : <div />}
          </div>

        </article>

      </div>

      {/* Lightbox Modal for Full Size Photo */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-30"
          >
            <X className="w-6 h-6" />
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const curIdx = galleryImages.indexOf(activePhoto);
                  const newIdx = curIdx > 0 ? curIdx - 1 : galleryImages.length - 1;
                  setActivePhoto(galleryImages[newIdx]);
                  setSelectedPhotoIndex(newIdx);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-white/20 text-white transition-all z-30 border border-white/10"
                title="Iepriekšējā fotogrāfija"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const curIdx = galleryImages.indexOf(activePhoto);
                  const newIdx = curIdx < galleryImages.length - 1 ? curIdx + 1 : 0;
                  setActivePhoto(galleryImages[newIdx]);
                  setSelectedPhotoIndex(newIdx);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-white/20 text-white transition-all z-30 border border-white/10"
                title="Nākamā fotogrāfija"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <img
            src={activePhoto}
            alt="Pilna izmēra foto"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      )}

    </div>
  );
}
