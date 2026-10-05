import React, { useState } from 'react';
import { Heart, Music, Sparkles, Clock, Check, Send } from 'lucide-react';

export default function WeddingDanceSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    weddingDate: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kazu-dejas" className="py-24 relative bg-[#070D18] overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Description & Features */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Heart className="w-3.5 h-3.5 fill-pink-400" />
              <span>Neaizmirstams Mirkli Jūsu Kāzu Dienā</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight mb-6">
              Kāzu Deju Apmācība & <br />
              <span className="text-gold-gradient">Oriģināla Horeogrāfija</span>
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                Kāzas ir viens no skaistākajiem mirkļiem Jūsu dzīvē. <strong className="text-white">Kāzu deja</strong> ir 
                brīnišķīga iespēja jaunlaulātajiem paust savas jūtas vienam pret otru kustībā.
              </p>
              <p>
                Kā Jūs to izdejosiet, ir atkarīgs no Jūsu vēlmēm — vai tās būs maigums un elegance <em>lēnajā valsī</em>, 
                kaisle <em>ugunīgā tango</em>, mīlestības piepildīta <em>rumba</em> vai varbūt trakulīgs, pārsteidzošs <em>džaivs</em> un dziesmu popūrijs!
              </p>
              <p>
                SDK “ZĪLE” palīdzēs realizēt pat vispārdrošāko ieceri. Ņemot vērā Jūsu vēlmes un dejas pieredzi, 
                piemeklēsim piemērotāko muzikālo pavadījumu un kopīgi sagatavosim priekšnesumu, kas patīkami 
                saviļņos Jūs un Jūsu viesus.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <Music className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-xs sm:text-sm">Mūzikas izvēle & miksēšana</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Pielāgojam dziesmas garumu un ritmu</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <Sparkles className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-xs sm:text-sm">Bez iepriekšējas pieredzes</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Iemācāmies soļus brīvi un bez stresa</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-xs sm:text-sm">Elastīgs grafiks</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Mēģinājumi vakaros vai brīvdienās</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <Check className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-xs sm:text-sm">Mālpilī & Siguldā</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Privātās nodarbības deju zālē</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Reservation Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0F172A] rounded-3xl p-8 border border-brand-gold/30 shadow-2xl relative">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-pink-500 to-amber-500 text-brand-dark font-bold text-[10px] uppercase tracking-wider rounded-full shadow-md">
                Pieteikt Kāzu Deju
              </div>

              <h3 className="font-serif font-bold text-2xl text-white mb-2">
                Pieteikties konsultācijai
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Aizpildiet īso formu vai zvaniet tieši kluba vadītājai Ivetai Zīlei pa tālr. <a href="tel:+37129265335" className="text-brand-gold font-semibold">+371 29265335</a>.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-white text-lg">Paldies par pieteikumu!</h4>
                  <p className="text-xs text-slate-300 mt-2">
                    Mēs sazināsimies ar Jums tuvākajā laikā, lai vienotos par ērtāko pirmo tikšanās laiku.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs text-brand-gold underline"
                  >
                    Iesniegt citu pieteikumu
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Pāra vārdi vai kontaktpersona *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="piem., Līga un Jānis"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Tālruņa numurs *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+371 20000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Paredzamais kāzu datums (nav obligāts)
                    </label>
                    <input
                      type="date"
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Vēlamā dziesma vai iecere
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Vai jau esat izvēlējušies dziesmu vai vēlaties ieteikumus?"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-dark bg-gradient-to-r from-amber-400 via-brand-gold to-amber-500 shadow-lg shadow-brand-gold/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Nosūtīt pieteikumu</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
