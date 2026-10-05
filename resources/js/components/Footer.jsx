import React from 'react';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050912] border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-brand-gold/40 p-1 flex items-center justify-center shadow-lg">
                <img
                  src="/images/logo/logo-zile.png"
                  alt="SDK Zīle Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-extrabold text-lg tracking-wider text-white">
                  SDK ZĪLE
                </span>
                <div className="text-[10px] text-brand-gold uppercase tracking-widest font-semibold">
                  Sporta deju klubs kopš 1995. gada
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Deja ir kā māksla, kuras galvenie izteiksmes līdzekļi ir ķermeņa plastika, harmoniskas kustības, 
              kā arī temps un dinamika. Mālpils un Siguldas deju saime.
            </p>

            <div className="pt-2 text-[11px] text-slate-500">
              Latvijas Sporta Deju Federācijas (LSDF) biedrs
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider text-brand-gold">
              Saites
            </h4>
            <ul className="space-y-2">
              <li><a href="#sakums" className="hover:text-white transition-colors">Sākums</a></li>
              <li><a href="#par-mums" className="hover:text-white transition-colors">Par mums & Vēsture</a></li>
              <li><a href="#programmas" className="hover:text-white transition-colors">Nodarbības & Grafiks</a></li>
              <li><a href="#kazu-dejas" className="hover:text-white transition-colors">Kāzu deju apmācība</a></li>
              <li><a href="#sacensibas" className="hover:text-white transition-colors">Sacensību sasniegumi</a></li>
              <li><a href="#kontakti" className="hover:text-white transition-colors">Kontakti & Lokācijas</a></li>
            </ul>
          </div>

          {/* Col 3: Contacts & Admin */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider text-brand-gold">
              Kluba Kontakti
            </h4>
            <div className="space-y-2 text-xs">
              <div>Vadītāja: <strong className="text-white">Iveta Zīle</strong></div>
              <div>Tālr: <a href="tel:+37129265335" className="text-white hover:text-brand-gold">+371 29265335</a></div>
              <div>E-pasts: <span className="text-slate-300">iveta.zile@sdk-zile.lv</span></div>
              <div className="text-[11px] text-slate-500 pt-1">
                Biedrība “SDK ZĪLE” &bull; Reģ. 40008309180
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-brand-gold border border-slate-800 transition-colors text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Kluba administrācijas panelis</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} SDK Zīle. Visas tiesības aizsargātas.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-brand-gold transition-colors"
          >
            <span>Uz augšu</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
