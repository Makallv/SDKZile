import React from 'react';
import { Award, UserCheck, Shield, CheckCircle2, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

export default function AboutSection() {
  const coaches = [
    {
      name: "Iveta Zīle",
      role: "Kluba vadītāja & Galvenā trenere",
      credentials: "LSDF sertificēta trenere un tiesnese, Starptautiskās klases dejotāja, vairāku Latvijas un starptautisko sacensību godalgu ieguvēja.",
      image: "/trainers/iveta-zile.jpg",
      objectPosition: "object-[center_18%]"
    },
    {
      name: "Uģis Putniņš",
      role: "Sporta deju treneris",
      credentials: "LSDF treneris, Starptautiskās klases dejotājs un augstākā līmeņa sacensību laureāts ar ilggadēju pedagoģisko pieredzi.",
      image: "/trainers/ugis-putnins.jpg",
      objectPosition: "object-center"
    }
  ];

  const alumni = [
    { pair: "Marks & Evelīna", detail: "Jauniešu A klase, daudzkārtēji čempionātu finālisti un starptautisko sacensību dalībnieki." },
    { pair: "Kristers & Amanda", detail: "7 gadi uz deju grīdas, sasniedzot Juniori I C klasi." },
    { pair: "Edvards & Tifānija", detail: "Juniori I E6, daudzkārtēji kausu un reitingu uzvarētāji." },
    { pair: "Krišjānis & Patrīcija", detail: "Juniori I E6, dalība Latvijas Čempionātā 10 dejās un reitingos." },
    { pair: "Daniels & Elīna", detail: "Bērnu grupas zelta un 1. pakāpes diplomu ieguvēji." },
    { pair: "Georgs & Katrīne", detail: "Juniori I, 1. vieta sacensībās Rīgas Ritmi 2026 un Jelgavas Domes kausā." }
  ];

  return (
    <section id="par-mums" className="py-24 relative bg-[#070D18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Vairāk nekā 30 gadu tradīcijas</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight mb-6">
              Mēs audzinām ne tikai dejotājus, <br />
              <span className="text-gold-gradient">bet personības un čempionus</span>
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Sporta deju klubs <strong className="text-white">“ZĪLE”</strong> savu darbību sāka 1995. gadā Mālpilī. 
                Gadu gaitā klubs ir izaudzis par stabilu un atzītu deju saimi, pulcējot audzēkņus gan Mālpilī, 
                gan Siguldā, kā arī tuvējos novados — Allažos, Morē, Līgatnē un Murjāņos.
              </p>
              <p>
                Ilgas un neatlaidīgas stundas deju zālē mēs pavadām ne tikai slīpējot Standarta un Latīņamerikas 
                deju soļus, bet arī vispārējās fiziskās sagatavotības un horeogrāfijas nodarbībās. Tās attīsta 
                izturību, kustību plastiku, koordināciju un grāciju.
              </p>
              <p className="border-l-2 border-brand-gold pl-4 italic text-slate-200">
                “Mūsu lepnums ir draudzīgais bērnu, pedagogu un radošo vecāku kolektīvs, kurā katra jaunā ģimene 
                atrod sirsnīgu atbalstu un drošu ceļu uz deju pasauli.”
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-xs font-medium text-slate-300">LSDF Čempionāti</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-xs font-medium text-slate-300">Vasaras Nometnes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-xs font-medium text-slate-300">Kāzu deju serviss</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-brand-gold/30 shadow-2xl group">
              <img
                src="/images/competitions/lrr-2026.jpg"
                alt="SDK Zīle Dejotāji"
                className="w-full h-[450px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sigulda & Mālpils</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  Aktīvā deju sezona: Septembris &ndash; Jūnijs
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Vasarā: profesionālas treniņnometnes Latvijas skaistākajās vietās
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coaches Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">
              Profesionāli Pedagogi
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Pasniedzēji & Treneri
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Prasīgi uz deju grīdas, mīļi un iedvesmojoši dzīvē — treneri ar starptautisku pieredzi un LSDF kvalifikāciju.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {coaches.map((coach, idx) => (
              <div
                key={idx}
                className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-brand-gold/40 shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
              >
                <img
                  src={coach.image}
                  alt={coach.name}
                  className={`w-28 h-36 sm:w-32 sm:h-44 rounded-2xl object-cover shrink-0 border-2 border-brand-gold/30 shadow-md ${coach.objectPosition || 'object-center'}`}
                />
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-xl font-serif font-bold text-white">
                    {coach.name}
                  </h4>
                  <div className="text-xs font-semibold text-brand-gold mt-0.5 mb-3">
                    {coach.role}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {coach.credentials}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notable Alumni / Club Couples */}
        <div className="bg-[#0B1424] rounded-3xl p-8 sm:p-12 border border-slate-800/80">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">
              Iedvesmojoši Stāsti
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Kluba Dejotāji & Panākumi
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Kopā no bērnudārza līdz pat augstākajām meistarības klasēm — SDK “Zīle” ir vieta, kur dzimst ilgstošas partnerības un mīlestība pret deju.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumni.map((item, idx) => (
              <div key={idx} className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <div className="font-serif font-bold text-base text-white mb-1.5">
                  {item.pair}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
