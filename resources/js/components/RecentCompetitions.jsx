import React from 'react';
import { Calendar, MapPin, Trophy, ArrowRight, Award } from 'lucide-react';
import { cleanText } from '../lib/textUtils';

export default function RecentCompetitions({ competitions = [], onSelectCompetition, onViewAll, onOpenAdmin }) {
  const safeComps = Array.isArray(competitions) ? competitions : [];
  const latestComps = safeComps.slice(0, 3);

  return (
    <section id="sacensibas" className="py-20 relative bg-[#0B1120] border-t border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">
              <Trophy className="w-4 h-4 text-brand-gold" />
              <span>Kluba Sasniegumi & Reitingi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Jaunākās Sacensības
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Mūsu dejotāji aktīvi piedalās LSDF reitingos, čempionātos un kausa posmos visā Latvijā.
            </p>
          </div>

          <div>
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-dark bg-brand-gold hover:bg-amber-400 rounded-lg shadow-md transition-all group"
            >
              <span>Visi Rezultāti</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Competitions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestComps.map((comp) => {
            if (!comp) return null;
            const results = Array.isArray(comp.results) ? comp.results : [];
            const hasMedals = results.some(r => {
              const p = typeof r?.placement === 'string' ? r.placement : String(r?.placement || '');
              return p.includes('1.') || p.includes('2.') || p.includes('3.');
            });

            return (
              <div
                key={comp.id || Math.random()}
                onClick={() => onSelectCompetition && onSelectCompetition(comp)}
                className="group relative bg-[#131D31]/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-brand-gold/40 shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
              >
                {/* Image Cover */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={comp.coverImage || (Array.isArray(comp.gallery) && comp.gallery[0]) || "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80"}
                    alt={comp.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131D31] via-[#131D31]/10 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md bg-brand-gold/90 text-brand-dark backdrop-blur-sm shadow-md">
                      {comp.category || 'Sacensības'}
                    </span>
                  </div>

                  {/* Date badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{comp.date}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location */}
                    {comp.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span className="truncate">{comp.location}</span>
                      </div>
                    )}

                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-brand-gold transition-colors line-clamp-2 mb-3">
                      {cleanText(comp.title)}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {cleanText(comp.summary || comp.description)}
                    </p>
                  </div>

                  {/* Results preview snippet */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Dejotāju Panākumi</span>
                      {hasMedals && <span className="text-amber-400">🏅 Godalgotas vietas</span>}
                    </div>

                    <div className="space-y-1.5 mb-4">
                      {Array.isArray(comp.results) && comp.results.length > 0 ? (
                        comp.results.slice(0, 2).map((res, idx) => res ? (
                          <div key={idx} className="flex items-center justify-between text-xs bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
                            <span className="font-medium text-slate-200 truncate pr-2 flex items-center gap-1.5 min-w-0">
                              {(res.age_group || res.ageGroup || res.group || res.category) && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-brand-gold border border-slate-700 font-semibold shrink-0">
                                  {cleanText(res.age_group || res.ageGroup || res.group || res.category)}
                                </span>
                              )}
                              <span className="truncate">{cleanText(res.couple || 'SDK Zīle dejotāji')}</span>
                            </span>
                            <span className="font-bold text-brand-gold whitespace-nowrap shrink-0">{res.placement || ''}</span>
                          </div>
                        ) : null)
                      ) : (
                        <div className="text-xs text-slate-500 italic">Rezultātu kopsavilkums pieejams aprakstā</div>
                      )}
                    </div>

                    <div className="flex items-center text-xs font-semibold text-brand-gold group-hover:underline">
                      <span>Skatīt visus pārus un rezultātus &rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
