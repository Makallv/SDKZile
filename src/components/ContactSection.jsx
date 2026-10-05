import React, { useState } from 'react';
import { Phone, Mail, MapPin, Building, CreditCard, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dancerAge: '',
    location: 'Mālpils',
    program: 'Bērnu iesācēju grupa',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit inquiry to backend API or simulate
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).catch(() => {});
    setSent(true);
  };

  return (
    <section id="kontakti" className="py-24 bg-[#070D18] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">
            Pievienojies Mūsu Deju Saimei
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Kontakti & Pieteikšanās
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3">
            Sazinieties ar kluba vadītāju Ivetu Zīli, lai uzzinātu par uzņemšanu, grafikiem vai kāzu deju mēģinājumiem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contacts & Legal Rekvizīti */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Card */}
            <div className="bg-[#0F172A] rounded-3xl p-8 border border-slate-800 shadow-xl">
              <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                <span>Kluba Vadība</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Tālrunis (Iveta Zīle)</div>
                    <a
                      href="tel:+37129265335"
                      className="text-lg font-bold text-white hover:text-brand-gold transition-colors block"
                    >
                      +371 29265335
                    </a>
                    <a
                      href="https://wa.me/37129265335"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline mt-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Rakstīt WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">E-pasts</div>
                    <a
                      href="mailto:iveta.zile@sdk-zile.lv"
                      className="text-sm font-semibold text-white hover:text-brand-gold transition-colors"
                    >
                      iveta.zile@sdk-zile.lv
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Nodarbību vietas</div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      Mālpils &bull; Sigulda
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      (Allaži, More, Līgatne, Murjāņi)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Rekvizīti Card */}
            <div className="bg-[#0F172A] rounded-3xl p-8 border border-slate-800 shadow-xl">
              <h3 className="text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-brand-gold" />
                <span>Norēķinu Rekvizīti</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Nosaukums:</span>
                  <span className="font-semibold text-white">Biedrība “SDK ZĪLE”</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Reģistrācijas Nr.:</span>
                  <span className="font-semibold text-white">40008309180</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Banka:</span>
                  <span className="font-semibold text-white">Swedbank AS</span>
                </div>
                <div className="py-1">
                  <div className="text-slate-400 mb-1">Konta Nr. (IBAN):</div>
                  <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-[13px] text-brand-gold select-all border border-slate-700">
                    LV37HABA0551051246294
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Registration / Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-2xl">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                Pieteikties Nodarbībām
              </h3>
              <p className="text-xs text-slate-400 mb-8">
                Aizpildiet anketu, un mēs sazināsimies ar Jums, lai sniegtu detalizētu informāciju par nodarbību laikiem un grupu sadalījumu.
              </p>

              {sent ? (
                <div className="py-12 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-xl font-serif font-bold text-white">Paldies par pieteikumu!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
                    Jūsu ziņa ir veiksmīgi nosūtīta. Kluba vadītāja Iveta Zīle drīzumā ar Jums sazināsies.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-brand-gold hover:bg-slate-700 transition-colors"
                  >
                    Nosūtīt vēl vienu ziņu
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Vecāka vai dejotāja vārds, uzvārds *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Vārds Uzvārds"
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        E-pasts
                      </label>
                      <input
                        type="email"
                        placeholder="vards@epasts.lv"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Dejotāja vecums (gadi)
                      </label>
                      <input
                        type="text"
                        placeholder="piem., 6 gadi"
                        value={formData.dancerAge}
                        onChange={(e) => setFormData({ ...formData, dancerAge: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Vēlamā nodarbību vieta
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold transition-colors"
                      >
                        <option value="Mālpils">Mālpils</option>
                        <option value="Sigulda">Sigulda</option>
                        <option value="Cita">Cita / Nav nozīmes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Programma
                      </label>
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold transition-colors"
                      >
                        <option value="Bērnu iesācēju grupa">Bērnu iesācēju grupa</option>
                        <option value="Sporta deju izlase">Sporta deju izlase (ar priekšzināšanām)</option>
                        <option value="Kāzu dejas">Kāzu dejas</option>
                        <option value="Individuālās nodarbības">Individuālās nodarbības</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Komentārs vai jautājums
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Iepriekšējā dejas pieredze vai citi jautājumi..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-dark bg-gradient-to-r from-amber-400 via-brand-gold to-amber-500 shadow-xl shadow-brand-gold/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Nosūtīt Pieteikumu</span>
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
