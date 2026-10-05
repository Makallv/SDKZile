import React from 'react';
import { X, Calendar, MapPin, Trophy, Award, Camera, Share2 } from 'lucide-react';
import { cleanText } from '../lib/textUtils';

export default function CompetitionDetailModal({ competition, onClose }) {
  if (!competition) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-[#0F172A] w-full max-w-3xl rounded-3xl border border-brand-gold/30 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white hover:text-brand-gold transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image in modal */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={competition.coverImage || "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80"}
            alt={competition.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-black/20" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-block px-3 py-1 text-xs font-bold uppercase rounded-md bg-brand-gold text-brand-dark mb-2">
              {competition.category || 'Reitings'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {cleanText(competition.title)}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-gold" />
                {competition.date}
              </span>
              {competition.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {competition.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Story / Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-2">
              Sacensību Norise & Treneru Atsauce
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
              {cleanText(competition.description || competition.summary)}
            </p>
          </div>

          {/* Results Table */}
          {competition.results && competition.results.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  <span>SDK “Zīle” Dejotāju Rezultāti</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  Kopā: {competition.results.length} starti
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-4 py-3">Pāris</th>
                      <th className="px-4 py-3">Grupa / Klase</th>
                      <th className="px-4 py-3">Programma</th>
                      <th className="px-4 py-3 text-right">Vieta / Sasniegums</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#131D31]">
                    {competition.results.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-white whitespace-nowrap">
                          {cleanText(r.couple)}
                        </td>
                        <td className="px-4 py-3.5 text-slate-300">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-800 border border-slate-700 text-slate-200">
                            {cleanText(r.age_group || r.ageGroup || r.group || r.category || '–')}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {cleanText(r.discipline || 'Sporta dejas')}
                        </td>
                        <td className="px-4 py-3.5 text-right font-bold text-brand-gold whitespace-nowrap">
                          {cleanText(r.placement)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Additional Event Photos if available */}
          {competition.gallery && competition.gallery.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-3 flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                <span>Foto no sacensībām</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {competition.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Foto ${i + 1}`}
                    className="h-36 sm:h-44 w-full object-cover object-top rounded-xl border border-slate-800"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer actions in modal */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              Aizvērt
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
