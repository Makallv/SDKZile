import React from 'react';
import { Sparkles, Users, Flame, Dumbbell, Compass, CheckCircle } from 'lucide-react';

export default function ProgramsSection() {
  const programs = [
    {
      title: "Sporta Deju Grupas & Izlase",
      age: "No 4 gadiem līdz jauniešiem (Iesācēji līdz A klasei)",
      description: "Visaptveroša sporta deju apmācība visos prasmju līmeņos Mālpilī un Siguldā. No pirmajiem soļiem, pareizas stājas un ritmikas bērnībā līdz dalībai LSDF reitingos un valsts mēroga sacensībās.",
      features: [
        "Bērnu sagatavošanas grupas (ritmika, stāja, pamatkustības)",
        "Sporta deju izlase (E, D, C, B un A meistarības klases)",
        "Standartdejas (Valsis, Tango, Vīnes valsis, Fokstrots, Kviksteps)",
        "Latīņamerikas dejas (Samba, Ča-Ča-Ča, Rumba, Pasodoble, Džaivs)",
        "Dalība LSDF reitingos, Latvijas Kausā un čempionātos",
        "Individuālās nodarbības un personīgā meistarības izaugsme"
      ],
      badge: "Pamata Programma",
      highlight: true
    },
    {
      title: "Horeogrāfija & Fiziskā Sagatavotība",
      age: "Visiem kluba dejotājiem",
      description: "Dejotājs ir augstas klases atlēts. Papildus deju tehnikai mēs attīstām kardio izturību, lokanību, pēdu spēku un auguma plastiku.",
      features: [
        "Muguras un korsetes muskulatūras stiprināšana",
        "Stiepšanās un lokanības vingrinājumi",
        "Kustību sinhronitāte un estētika"
      ],
      badge: "Atlētika",
      highlight: false
    },
    {
      title: "Vasaras Treniņnometnes",
      age: "Jūlijs & Augusts (visām grupām)",
      description: "Neaizmirstamas vasaras nometnes Mālpilī, Siguldā un pie jūras. Intensīvi treniņi, vieslektori, meistarklases un saliedējoša atpūta.",
      features: [
        "Intensīva sagatavošanās jaunajai rudens sezonai",
        "Viespasniedzēji no Latvijas un ārzemēm",
        "Radošie vakari un komandas gars"
      ],
      badge: "Sezonas kulminācija",
      highlight: false
    }
  ];

  return (
    <section id="programmas" className="py-24 bg-[#0B1120] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">
            Nodarbības & Grupas
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Deju Programmas Ikvienam Līmenim
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Piedāvājam daudzpusīgu sporta deju apmācību programmu, sākot no pašiem mazākajiem līdz pat augstākajai sporta meistarībai.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                item.highlight
                  ? 'bg-gradient-to-br from-[#162238] to-[#0F172A] border-2 border-brand-gold shadow-2xl shadow-brand-gold/10'
                  : 'bg-[#0F172A] border border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    item.highlight
                      ? 'bg-brand-gold text-brand-dark'
                      : 'bg-slate-800 text-brand-gold border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                  <span className="text-xs text-slate-400">{item.age}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="space-y-2.5 mb-8">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href="#kontakti"
                  className={`block text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    item.highlight
                      ? 'bg-brand-gold hover:bg-amber-400 text-brand-dark shadow-md'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  Pieteikt dalībnieku
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Training Bases Strip */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-brand-gold/5 to-transparent border border-brand-gold/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif font-bold text-xl text-white mb-1">
              Nodarbības norisinās divās bāzēs: Mālpilī un Siguldā
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Ērtas un aprīkotas deju zāles ar profesionālu parketa segumu un spoguļsienām.
            </p>
          </div>
          <a
            href="#kontakti"
            className="shrink-0 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all"
          >
            Skatīt norises vietas
          </a>
        </div>

      </div>
    </section>
  );
}
