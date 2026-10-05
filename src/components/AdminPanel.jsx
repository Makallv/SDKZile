import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, LogOut, Plus, Trash2, Edit3, Trophy, 
  Calendar, MapPin, Check, AlertCircle, ArrowLeft, Image as ImageIcon,
  Users, Award, X
} from 'lucide-react';

export default function AdminPanel({ 
  competitions = [], 
  onAddCompetition, 
  onUpdateCompetition, 
  onDeleteCompetition, 
  onClose 
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [editingComp, setEditingComp] = useState(null); // null means adding or idle
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const initialFormState = {
    title: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    category: 'Reitings',
    coverImage: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
    summary: '',
    description: '',
    results: [
      {
        couple: '',
        group: 'Bērni II',
        discipline: 'Standartdejas (E klase)',
        placement: '1. vieta 🥇',
        notes: ''
      }
    ],
    gallery: []
  };

  const [formData, setFormData] = useState(initialFormState);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'zile2026' || password.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Nepareiza parole. Izmantojiet paroli: zile2026');
    }
  };

  // Open Form to Add
  const handleOpenAdd = () => {
    setEditingComp(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  // Open Form to Edit
  const handleOpenEdit = (comp) => {
    setEditingComp(comp);
    setFormData({
      ...comp,
      results: comp.results && comp.results.length > 0 ? comp.results : initialFormState.results
    });
    setIsFormOpen(true);
  };

  // Add couple row in form
  const handleAddResultRow = () => {
    setFormData({
      ...formData,
      results: [
        ...formData.results,
        { couple: '', group: 'Juniori I', discipline: 'Latīņamerikas dejas', placement: '1. vieta 🥇', notes: '' }
      ]
    });
  };

  // Remove couple row
  const handleRemoveResultRow = (index) => {
    setFormData({
      ...formData,
      results: formData.results.filter((_, idx) => idx !== index)
    });
  };

  // Update couple row field
  const handleUpdateResultRow = (index, field, value) => {
    const updated = [...formData.results];
    updated[index][field] = value;
    setFormData({ ...formData, results: updated });
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      alert('Lūdzu ievadiet sacensību nosaukumu un datumu.');
      return;
    }

    if (editingComp) {
      onUpdateCompetition({
        ...formData,
        id: editingComp.id
      });
    } else {
      onAddCompetition(formData);
    }

    setIsFormOpen(false);
    setEditingComp(null);
  };

  // If not logged in, show login screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070D18]/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0F172A] rounded-3xl p-8 border border-brand-gold/30 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto mb-4 border border-brand-gold/20">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-center text-white mb-1">
            SDK Zīle Vadība
          </h2>
          <p className="text-xs text-center text-slate-400 mb-6">
            Pieslēgšanās administratora panelim, lai pievienotu vai labotu sacensību rezultātus.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Administratora parole
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Ievadiet paroli..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold"
                  autoFocus
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-brand-dark bg-gradient-to-r from-amber-400 to-brand-gold hover:brightness-110 active:scale-95 transition-all"
            >
              Pieslēgties panelim
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <span className="text-[11px] text-slate-500">
              Demo piekļuves parole: <code className="text-brand-gold font-bold">zile2026</code>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#070D18] overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              title="Atgriezties vietnē"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xl text-white">SDK Zīle Administrācija</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                  Aktīva sesija
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Pārvaldiet sacensības, reitingu punktus un dejotāju godalgas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-brand-gold text-brand-dark font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-gold/20 hover:brightness-110 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Pievienot Sacensības</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
              title="Iziet"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Kopā Sacensības
            </div>
            <div className="text-3xl font-serif font-bold text-white mt-1">
              {competitions.length}
            </div>
          </div>

          <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Fiksētie Pāru Starti
            </div>
            <div className="text-3xl font-serif font-bold text-brand-gold mt-1">
              {competitions.reduce((acc, c) => acc + (c.results?.length || 0), 0)}
            </div>
          </div>

          <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Pēdējās Reģistrētās
            </div>
            <div className="text-sm font-semibold text-white mt-2 truncate">
              {competitions[0]?.title || 'Nav datu'}
            </div>
            <div className="text-xs text-slate-400">
              {competitions[0]?.date || ''}
            </div>
          </div>
        </div>

        {/* Competitions Table / List */}
        <div className="bg-[#0F172A] rounded-2xl border border-slate-800 overflow-hidden shadow-xl mb-12">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-white">
              Reģistrēto Sacensību Saraksts
            </h3>
            <span className="text-xs text-slate-400">
              Rādītas visas publicētās sacensības
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Sacensības & Datums</th>
                  <th className="px-6 py-4">Kategorija</th>
                  <th className="px-6 py-4">Vieta</th>
                  <th className="px-6 py-4">Dejotāju Pāri</th>
                  <th className="px-6 py-4 text-right">Darbības</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {competitions.map((comp) => (
                  <tr key={comp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-sm">{comp.title}</div>
                      <div className="text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3 text-brand-gold" />
                        <span>{comp.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                        {comp.category || 'Reitings'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {comp.location || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-white">{comp.results?.length || 0}</span>
                      <span className="text-slate-400"> pāri</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(comp)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Rediģēt"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Vai tiešām vēlaties dzēst sacensības "${comp.title}"?`)) {
                            onDeleteCompetition(comp.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-400 transition-colors"
                        title="Dzēst"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal / Slide-out Form for Adding or Editing */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0F172A] w-full max-w-4xl rounded-3xl border border-brand-gold/40 shadow-2xl p-6 sm:p-8 my-8 relative">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-white">
                    {editingComp ? 'Rediģēt Sacensības' : 'Pievienot Jaunas Sacensības'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Aizpildiet informāciju par sacensību norisi un pievienojiet dejotāju vietas
                  </p>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* General Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Sacensību nosaukums *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="piem., Lielais Rudens Reitings 2026"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Datums *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Norises vieta & Pilsēta
                    </label>
                    <input
                      type="text"
                      placeholder="piem., Jaunolaines sporta nams"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Kategorija
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Reitings">Reitings</option>
                      <option value="Latvijas Kauss">Latvijas Kauss</option>
                      <option value="Čempionāts">Čempionāts</option>
                      <option value="Kausa izcīņa">Kausa izcīņa</option>
                      <option value="Starptautiskās">Starptautiskās sacensības</option>
                      <option value="Iesācēji">Iesācēju skate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Vāka attēla saite (URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                  />
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] text-slate-500">Ieteicamie foto:</span>
                    {[
                      { label: 'Ballroom zāle', url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Latīņa pāris', url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Pjedestāls', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80' }
                    ].map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                        className="text-[10px] text-brand-gold hover:underline"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Īss kopsavilkums (Rādās kartītēs sākumlapā)
                  </label>
                  <input
                    type="text"
                    placeholder="Īss kopsavilkums par sacensību dienu..."
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Plašāks apraksts / Treneru atsauksme
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detalizēts stāsts par sacensībām, atzinība dejotājiem un vecākiem..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                {/* RESULTS BUILDER */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                        <Award className="w-4 h-4 text-brand-gold" />
                        <span>Dejotāju Pāri & Rezultāti</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Pievienojiet kluba pārus, kuri izcīnīja vietas šajās sacensībās
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddResultRow}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-gold text-xs font-semibold border border-slate-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Pievienot Pāri</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {formData.results.map((res, index) => (
                      <div
                        key={index}
                        className="bg-slate-900 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                      >
                        <div className="sm:col-span-4">
                          <label className="block text-[10px] text-slate-400 mb-0.5">Dejotāju pāris</label>
                          <input
                            type="text"
                            placeholder="piem., Kristers B. & Amanda K."
                            value={res.couple}
                            onChange={(e) => handleUpdateResultRow(index, 'couple', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[10px] text-slate-400 mb-0.5">Grupa / Klase</label>
                          <input
                            type="text"
                            placeholder="piem., Juniori II C"
                            value={res.group}
                            onChange={(e) => handleUpdateResultRow(index, 'group', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-[10px] text-slate-400 mb-0.5">Iegūtā vieta / Medaļa</label>
                          <select
                            value={res.placement}
                            onChange={(e) => handleUpdateResultRow(index, 'placement', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold"
                          >
                            <option value="1. vieta 🥇">1. vieta 🥇 (Zelts)</option>
                            <option value="2. vieta 🥈">2. vieta 🥈 (Sudrabs)</option>
                            <option value="3. vieta 🥉">3. vieta 🥉 (Bronza)</option>
                            <option value="Fināls (4. vieta)">Fināls (4. vieta)</option>
                            <option value="Fināls (5. vieta)">Fināls (5. vieta)</option>
                            <option value="Fināls (6. vieta)">Fināls (6. vieta)</option>
                            <option value="Pusfināls">Pusfināls</option>
                            <option value="1. pakāpes diploms 🏆">1. pakāpes diploms 🏆</option>
                          </select>
                        </div>

                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveResultRow(index)}
                            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                            title="Dzēst rindu"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
                  >
                    Atcelt
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-gold/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingComp ? 'Saglabāt Izmaiņas' : 'Publicēt Sacensības'}</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
