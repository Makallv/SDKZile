import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, Calendar, MapPin, Search, Filter, ArrowLeft, Star, Users } from 'lucide-react';
import { cleanText } from '../lib/textUtils';

const KNOWN_ATHLETES = [
  // Pairs
  { 
    label: 'Marks & Evelīna', 
    query: 'Marks & Evelīna',
    patterns: [
      /\bmarks\b.*?\b(?:un|ar|&|\/)\s*evelīn/i,
      /\bmarks\s*&\s*evelīna\b/i,
      /\bmarks\s+zīle\b/i
    ],
    resultPatterns: [/marks\s*&\s*evelīna/i, /marks\s*&\s*signe/i]
  },
  { 
    label: 'Martins & Ieva', 
    query: 'Martins & Ieva',
    patterns: [
      /\bmartins?\b.*?\b(?:un|ar|&|\/)\s*iev/i,
      /\bmartins\s*&\s*ieva\b/i
    ],
    resultPatterns: [/martins\s*&\s*ieva/i]
  },
  { 
    label: 'Jēkabs & Nora', 
    query: 'Jēkabs & Nora',
    patterns: [
      /\bjēkabs?\b.*?\b(?:un|ar|&|\/)\s*nor/i,
      /\bjēkabs\s*&\s*nora\b/i
    ],
    resultPatterns: [/jēkabs\s*&\s*nora/i]
  },
  { 
    label: 'Haralds & Amanda', 
    query: 'Haralds & Amanda',
    patterns: [
      /\bharalds?\b.*?\b(?:un|ar|&|\/)\s*amand/i,
      /\bharaldu\s*ar\s*amandu/i,
      /\bharalds\s*&\s*amanda\b/i
    ],
    resultPatterns: [/haralds\s*&\s*amanda/i]
  },
  { 
    label: 'Paulis & Katrīne', 
    query: 'Paulis & Katrīne',
    patterns: [
      /\bpauli\w*\b.*?\b(?:un|ar|&|\/)\s*katrīn/i,
      /\bpaulis\s*&\s*katrīne\b/i
    ],
    resultPatterns: [/paulis\s*&\s*katrīne/i]
  },
  { 
    label: 'Roberts & Alise', 
    query: 'Roberts & Alise',
    patterns: [
      /\broberts?\b.*?\b(?:un|ar|&|\/)\s*alis/i,
      /\brobertu\s*ar\s*alisi/i,
      /\broberts\s*&\s*alise\b/i
    ],
    resultPatterns: [/roberts\s*&\s*alise\b/i]
  },
  { 
    label: 'Jānis & Lote', 
    query: 'Jānis & Lote',
    patterns: [
      /\bjāni\w*\b.*?\b(?:un|ar|&|\/)\s*lot/i,
      /\bjānis\s*&\s*lote\b/i
    ],
    resultPatterns: [/jānis\s*&\s*lote\b/i]
  },
  { 
    label: 'Sendijs & Elvita', 
    query: 'Sendijs & Elvita',
    patterns: [
      /\bsendij\w*\b.*?\b(?:un|ar|&|\/)\s*elvit/i,
      /\bsendiju\s*ar\s*elvitu/i,
      /\bsendijs\s*&\s*elvita\b/i
    ],
    resultPatterns: [/sendijs\s*&\s*elvita\b/i]
  },
  { 
    label: 'Georgs & Olīvija', 
    query: 'Georgs & Olīvija',
    patterns: [
      /\bgeorgs?\b.*?\b(?:un|ar|&|\/)\s*olīvij/i,
      /\bgeorgs\s*&\s*olīvija\b/i
    ],
    resultPatterns: [/georgs\s*&\s*olīvija/i]
  },
  { 
    label: 'Georgs & Katrīne', 
    query: 'Georgs & Katrīne',
    patterns: [
      /\bgeorgs?\b.*?\b(?:un|ar|&|\/)\s*katrīn/i,
      /\bgeorgs\s*&\s*katrīne\b/i
    ],
    resultPatterns: [/georgs\s*&\s*katrīne/i]
  },
  { 
    label: 'Gustavs & Dārta', 
    query: 'Gustavs & Dārta',
    patterns: [
      /\bgustavs?\b.*?\b(?:un|ar|&|\/)\s*dārt/i,
      /\bgustavs\s*&\s*dārta\b/i
    ],
    resultPatterns: [/gustavs\s*&\s*dārta/i]
  },
  { 
    label: 'Roberts & Emīlija', 
    query: 'Roberts & Emīlija',
    patterns: [
      /\broberts?\b.*?\b(?:un|ar|&|\/)\s*emīlij/i,
      /\broberts\s*&\s*emīlija\b/i
    ],
    resultPatterns: [/roberts\s*&\s*emīlija/i]
  },
  { 
    label: 'Robins & Sintija', 
    query: 'Robins & Sintija',
    patterns: [
      /\brobins?\b.*?\b(?:un|ar|&|\/)\s*sintij/i,
      /\brobins\s*&\s*sintija\b/i
    ],
    resultPatterns: [/robins\s*&\s*sintija/i]
  },
  { 
    label: 'Ņikita & Ieva', 
    query: 'Ņikita & Ieva',
    patterns: [
      /\bņikita\b.*?\b(?:un|ar|&|\/)\s*iev/i,
      /\bņikita\s*&\s*ieva\b/i
    ],
    resultPatterns: [/ņikita\s*&\s*ieva/i]
  },
  { 
    label: 'Anrijs & Patrīcija', 
    query: 'Anrijs & Patrīcija',
    patterns: [
      /\banrijs?\b.*?\b(?:un|ar|&|\/)\s*patrīcij/i,
      /\banrijs\s*&\s*patrīcija\b/i
    ],
    resultPatterns: [/anrijs\s*&\s*patrīcija/i]
  },
  { 
    label: 'Edvards & Tifānija', 
    query: 'Edvards & Tifānija',
    patterns: [
      /\bedvards?\b.*?\b(?:un|ar|&|\/)\s*tifān/i,
      /\bedvards\s*&\s*tifānija\b/i
    ],
    resultPatterns: [/edvards\s*&\s*tifānija/i]
  },
  { 
    label: 'Kristers & Amanda', 
    query: 'Kristers & Amanda',
    patterns: [
      /\bkristers\b.*?\b(?:un|ar|&|\/)\s*amand/i,
      /\bkristers\s*&\s*amanda\b/i
    ],
    resultPatterns: [/kristers\s*&\s*amanda/i]
  },
  { 
    label: 'Krišjānis & Patrīcija', 
    query: 'Krišjānis & Patrīcija',
    patterns: [
      /\bkrišjān\w*\b.*?\b(?:un|ar|&|\/)\s*patrīcij/i,
      /\bkrišjānis\s*&\s*patrīcija\b/i
    ],
    resultPatterns: [/krišjānis\s*&\s*patrīcija/i]
  },
  { 
    label: 'Krišjānis & Beatrise', 
    query: 'Krišjānis & Beatrise',
    patterns: [
      /\bkrišjān\w*\b.*?\b(?:un|ar|&|\/)\s*beatris/i,
      /\bkrišjānis\s*&\s*beatrise\b/i
    ],
    resultPatterns: [/krišjānis\s*&\s*beatrise/i]
  },
  { 
    label: 'Daniels & Elīna', 
    query: 'Daniels & Elīna',
    patterns: [
      /\bdaniels?\b.*?\b(?:un|ar|&|\/)\s*elīn/i,
      /\bdaniels\s*&\s*elīna\b/i
    ],
    resultPatterns: [/daniels\s*&\s*elīna/i]
  },
  { 
    label: 'Reinis & Aleksandra', 
    query: 'Reinis & Aleksandra',
    patterns: [
      /\breini\w*\b.*?\b(?:un|ar|&|\/)\s*aleksandr/i,
      /\breinis\s*&\s*aleksandra\b/i
    ],
    resultPatterns: [/reinis\s*&\s*aleksandra/i]
  },
  { 
    label: 'Mārtiņš & Jekaterina', 
    query: 'Mārtiņš & Jekaterina',
    patterns: [
      /\bmārtiņ\w*\b.*?\b(?:un|ar|&|\/)\s*jekaterin/i,
      /\bmārtiņš\s*&\s*jekaterina\b/i
    ],
    resultPatterns: [/mārtiņš\s*&\s*jekaterina/i]
  },
  { 
    label: 'Roberts & Samanta Alise', 
    query: 'Roberts & Samanta Alise',
    patterns: [
      /\broberts?\b.*?\b(?:un|ar|&|\/)\s*samant/i,
      /\broberts\s*&\s*samanta/i
    ],
    resultPatterns: [/roberts\s*&\s*samanta/i]
  },
  { 
    label: 'Hugo & Ieva', 
    query: 'Hugo & Ieva',
    patterns: [
      /\bhugo\b.*?\b(?:un|ar|&|\/)\s*iev/i,
      /\bhugo\s*&\s*ieva\b/i
    ],
    resultPatterns: [/hugo\s*&\s*ieva/i]
  },
  { 
    label: 'Aleksis & Julianna', 
    query: 'Aleksis & Julianna',
    patterns: [
      /\baleksis?\b.*?\b(?:un|ar|&|\/)\s*juliann/i,
      /\baleksis\s*&\s*julianna\b/i
    ],
    resultPatterns: [/aleksis\s*&\s*julianna/i]
  },
  { 
    label: 'Emīls & Dārta', 
    query: 'Emīls & Dārta',
    patterns: [
      /\bemīls?\b.*?\b(?:un|ar|&|\/)\s*dārt/i,
      /\bemīls\s*&\s*dārta\b/i
    ],
    resultPatterns: [/emīls\s*&\s*dārta/i]
  },
  // Solo Girls
  { 
    label: 'Solo: Ramona', 
    query: 'Ramona', 
    isSolo: true, 
    patterns: [/\bramon[a-zāčēģīķļņšūž]*/i],
    resultPatterns: [/solo:\s*ramona/i, /\bramona\b/i] 
  },
  { 
    label: 'Solo: Elizabete', 
    query: 'Elizabete', 
    isSolo: true, 
    patterns: [/\belizabet[a-zāčēģīķļņšūž]*/i],
    resultPatterns: [/solo:\s*elizabete/i, /\belizabete\b/i] 
  },
  { 
    label: 'Solo: Kristena', 
    query: 'Kristena', 
    isSolo: true, 
    patterns: [/\bkristen[a-zāčēģīķļņšūž]*/i],
    resultPatterns: [/solo:\s*kristena/i, /\bkristena\b/i] 
  },
  { 
    label: 'Solo: Rūta', 
    query: 'Rūta', 
    isSolo: true, 
    patterns: [/\brūt[a-zāčēģīķļņšūž]*/i],
    resultPatterns: [/solo:\s*rūta/i, /\brūta\b/i] 
  },
  { 
    label: 'Solo: Maija', 
    query: 'Maija', 
    isSolo: true, 
    patterns: [/\bmaij[a-zāčēģīķļņšūž]*/i],
    resultPatterns: [/solo:\s*maija/i, /\bmaija\b/i] 
  },
  { 
    label: 'Solo: Alise', 
    query: 'Solo: Alise', 
    isSolo: true, 
    patterns: [/solo[^.;]*?\balis/i, /\balis[^.;]*?solo/i],
    resultPatterns: [/solo:\s*alise/i] 
  },
  { 
    label: 'Solo: Lauma', 
    query: 'Lauma', 
    isSolo: true, 
    patterns: [/\blaum[a-zāčēģīķļņšūž]*/i],
    resultPatterns: [/solo:\s*lauma/i, /\blauma\b/i] 
  }
];

function athleteCompetedInComp(comp, cp) {
  if (!comp) return false;
  const results = Array.isArray(comp.results) ? comp.results : [];
  if (results.some(r => {
    if (!r || !r.couple) return false;
    const c = r.couple;
    return cp.resultPatterns.some(p => p.test(c)) || c.toLowerCase().includes(cp.label.toLowerCase());
  })) {
    return true;
  }
  const text = `${comp.title || ''} ${comp.summary || ''} ${comp.description || ''}`;
  return cp.patterns.some(p => p.test(text));
}

function matchAgeGroup(resultAgeGroup, selected) {
  if (!selected || selected === 'all') return true;
  if (!resultAgeGroup) return false;
  const ag = String(resultAgeGroup).trim();
  
  if (ag.toLowerCase() === selected.toLowerCase()) return true;

  if (selected === 'Bērni I') {
    return (/\bbērni\s*(?:i\b|1\b|\bi\s*\+)/i.test(ag)) && !(/\bbērni\s*ii\b/i.test(ag.replace(/bērni\s*i\s*\+\s*ii/i, '')));
  }
  if (selected === 'Bērni II') {
    return /\bbērni\s*(?:ii\b|2\b|\+\s*ii\b)/i.test(ag);
  }
  if (selected === 'Bērni I+II') {
    return /\bbērni\s*i\s*\+\s*ii\b/i.test(ag) || /\bbērni\s*i\s*\/\s*ii\b/i.test(ag);
  }
  if (selected === 'Juniori I') {
    return (/\bjuniori\s*(?:i\b|1\b|\bi\s*\+)/i.test(ag)) && !(/\bjuniori\s*ii\b/i.test(ag.replace(/juniori\s*i\s*\+\s*ii/i, '')));
  }
  if (selected === 'Juniori II') {
    return /\bjuniori\s*(?:ii\b|2\b|\+\s*ii\b)/i.test(ag);
  }
  if (selected === 'Juniori I+II') {
    return /\bjuniori\s*i\s*\+\s*ii\b/i.test(ag) || /\bjuniori\s*i\s*\/\s*ii\b/i.test(ag);
  }
  if (selected === 'Juniori II + Jaunieši') {
    return /\bjuniori\s*ii\s*\+\s*jaunie/i.test(ag);
  }
  if (selected === 'Jaunieši') {
    return /\bjaunie/i.test(ag);
  }
  if (selected === 'Jaunieši + Pieaugušie') {
    return /\bjaunie[^\n\r+]*\+\s*pieaugu/i.test(ag);
  }
  if (selected === 'Pieaugušie') {
    return /\bpieaugu/i.test(ag);
  }
  if (selected === 'Seniori I') {
    return /\bseniori/i.test(ag);
  }
  if (selected === 'Iesācēji') {
    return /\biesācēj/i.test(ag);
  }

  return ag.toLowerCase().includes(selected.toLowerCase());
}

export default function CompetitionsView({ 
  competitions = [], 
  onSelectCompetition, 
  onOpenAdmin, 
  onBackToHome,
  initialSearch = ''
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  const categories = ['all', 'Reitings', 'Latvijas Kauss', 'Čempionāts', 'Kausa izcīņa', 'Starptautiskās'];
  const ageGroups = [
    'all', 
    'Bērni I', 
    'Bērni II', 
    'Bērni I+II', 
    'Juniori I', 
    'Juniori II', 
    'Juniori I+II', 
    'Juniori II + Jaunieši',
    'Jaunieši', 
    'Jaunieši + Pieaugušie',
    'Pieaugušie',
    'Seniori I',
    'Iesācēji'
  ];
  const years = [
    'all', '2026', '2025', '2024', '2023', '2022', '2021', '2020',
    '2019', '2018', '2017', '2016', '2015', '2014', '2013'
  ];

  const safeCompetitions = Array.isArray(competitions) ? competitions : [];

  // Filter competitions for the selected year to compute which couples actually competed in this year
  const yearComps = useMemo(() => {
    return safeCompetitions.filter(comp => {
      if (!comp) return false;
      return selectedYear === 'all' || (typeof comp.date === 'string' && comp.date.startsWith(selectedYear));
    });
  }, [safeCompetitions, selectedYear]);

  // Dynamically compute active athlete chips for the selected year
  const activeChips = useMemo(() => {
    return KNOWN_ATHLETES.filter(cp => {
      return yearComps.some(comp => athleteCompetedInComp(comp, cp));
    });
  }, [yearComps]);

  // If an athlete filter was active and the user switches to a year where they didn't compete,
  // automatically clear searchTerm so the user isn't left with an empty result screen.
  useEffect(() => {
    if (searchTerm) {
      const matchingAthlete = KNOWN_ATHLETES.find(
        c => c.query.toLowerCase() === searchTerm.toLowerCase() || c.label.toLowerCase() === searchTerm.toLowerCase()
      );
      if (matchingAthlete) {
        const isStillActive = activeChips.some(c => c.label === matchingAthlete.label);
        if (!isStillActive) {
          setSearchTerm('');
        }
      }
    }
  }, [selectedYear, activeChips]);

  const filtered = safeCompetitions.filter((comp) => {
    if (!comp) return false;
    const term = (searchTerm || '').trim().toLowerCase();
    const title = (comp.title || '').toLowerCase();
    const loc = (comp.location || '').toLowerCase();
    const sum = (comp.summary || '').toLowerCase();
    const desc = (comp.description || '').toLowerCase();
    const compText = `${title} ${loc} ${sum} ${desc}`;
    const results = Array.isArray(comp.results) ? comp.results : [];

    let matchesSearch = !term;
    if (term) {
      if (compText.includes(term)) {
        matchesSearch = true;
      } else if (results.some(r => {
        if (!r) return false;
        const couple = typeof r.couple === 'string' ? r.couple.toLowerCase() : '';
        const notes = typeof r.notes === 'string' ? r.notes.toLowerCase() : '';
        const group = typeof r.group === 'string' ? r.group.toLowerCase() : '';
        const ageGroup = typeof r.ageGroup === 'string' ? r.ageGroup.toLowerCase() : '';
        const cat = typeof r.category === 'string' ? r.category.toLowerCase() : '';
        const pl = typeof r.placement === 'string' ? r.placement.toLowerCase() : '';
        return couple.includes(term) || notes.includes(term) || group.includes(term) || ageGroup.includes(term) || cat.includes(term) || pl.includes(term);
      })) {
        matchesSearch = true;
      } else if (term.includes('&') || term.includes(' un ') || term.includes(' ar ')) {
        const parts = term.split(/&|\bun\b|\bar\b/).map(p => p.trim()).filter(p => p.length > 1);
        if (parts.length >= 2) {
          const allPartsInText = parts.every(p => compText.includes(p));
          const allPartsInResults = results.some(r => {
            const couple = (r.couple || '').toLowerCase();
            return parts.every(p => couple.includes(p));
          });
          if (allPartsInText || allPartsInResults) {
            matchesSearch = true;
          }
        }
      }
    }

    const matchesCategory =
      selectedCategory === 'all' || (comp.category || '').toLowerCase() === selectedCategory.toLowerCase();

    const matchesAgeGroup =
      selectedAgeGroup === 'all' ||
      results.some(r => matchAgeGroup(r.age_group || r.ageGroup || r.group || r.category, selectedAgeGroup));

    const matchesYear =
      selectedYear === 'all' || (typeof comp.date === 'string' && comp.date.startsWith(selectedYear));

    return matchesSearch && matchesCategory && matchesAgeGroup && matchesYear;
  });

  return (
    <div className="pt-28 pb-24 bg-[#070D18] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Atpakaļ uz sākumlapu</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">
            <Trophy className="w-4 h-4" />
            <span>Kluba Sasniegumu & Sacensību Arhīvs (2013–2026)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Sacensības & Dejotāju Sasniegumi
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl">
            Pārskats par SDK “Zīle” audzēkņu startiem Latvijas Sporta Deju Federācijas (LSDF) un starptautiskajās sacensībās kopš 2013. gada.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#0F172A] p-4 sm:p-6 rounded-2xl border border-slate-800 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="lg:col-span-4 md:col-span-12 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Meklēt pēc dejotāja (Marks, Kristers, Roberts), grupas (Bērni I/II, Juniori) vai vietas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-gold transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Notīrīt
                </button>
              )}
            </div>

            {/* Age Group Filter */}
            <div className="lg:col-span-3 md:col-span-4">
              <select
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold transition-colors"
              >
                <option value="all">Visas vecuma grupas</option>
                {ageGroups.filter(g => g !== 'all').map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-3 md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold transition-colors"
              >
                <option value="all">Visas kategorijas</option>
                <option value="Reitings">Reitings</option>
                <option value="Latvijas Kauss">Latvijas Kauss</option>
                <option value="Čempionāts">Čempionāts</option>
                <option value="Kausa izcīņa">Kausa izcīņa</option>
                <option value="Starptautiskās">Starptautiskās sacensības</option>
              </select>
            </div>

            {/* Year Filter */}
            <div className="lg:col-span-2 md:col-span-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold transition-colors"
              >
                <option value="all">Visi gadi (2013–2026)</option>
                {years.filter(y => y !== 'all').map(y => (
                  <option key={y} value={y}>{y}. gads</option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Athlete Chips */}
          <div className="pt-3 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-gold" />
                <span>
                  Ātrā atlase pēc pāra vai solo dejotājas{selectedYear !== 'all' ? ` (${selectedYear}. gadā)` : ''}:
                </span>
              </div>
              {selectedYear !== 'all' && (
                <span className="text-[10px] text-brand-gold/80 font-medium">
                  Rādīti tikai {selectedYear}. gadā startējušie sportisti ({activeChips.length})
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSearchTerm('')}
                className={`px-3 py-1 rounded-lg text-[11px] transition-all ${
                  searchTerm === ''
                    ? 'bg-brand-gold text-brand-dark font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Visi
              </button>
              {activeChips.map((chip) => {
                const isActive =
                  searchTerm.toLowerCase() === chip.query.toLowerCase() ||
                  searchTerm.toLowerCase() === chip.label.toLowerCase() ||
                  (searchTerm && searchTerm.toLowerCase().includes(chip.query.toLowerCase()));
                return (
                  <button
                    key={chip.label}
                    onClick={() => {
                      if (isActive) {
                        setSearchTerm('');
                      } else {
                        setSearchTerm(chip.query);
                      }
                    }}
                    className={`px-3 py-1 rounded-lg text-[11px] transition-all ${
                      chip.isSolo
                        ? isActive
                          ? 'bg-pink-500 text-white font-bold shadow-md shadow-pink-500/20'
                          : 'bg-pink-950/30 text-pink-300 hover:text-white border border-pink-800/60 hover:border-pink-500'
                        : isActive
                          ? 'bg-brand-gold text-brand-dark font-bold shadow-md'
                          : 'bg-slate-800/80 text-slate-300 hover:text-brand-gold border border-slate-700'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
              {activeChips.length === 0 && (
                <span className="text-[11px] text-slate-500 italic py-1">
                  Šajā gadā nav atlasītu dejotāju filtru
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
          <span>Atrastas {filtered.length} sacensības</span>
          {searchTerm && (
            <span>Meklēts: <strong className="text-brand-gold">"{searchTerm}"</strong></span>
          )}
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800">
            <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <div className="text-white font-serif text-lg font-bold">Nekas netika atrasts</div>
            <p className="text-xs text-slate-400 mt-1">
              Mēģiniet mainīt meklēšanas kritērijus vai noņemt filtrus.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedAgeGroup('all'); setSelectedYear('all'); }}
              className="mt-4 px-4 py-2 bg-slate-800 text-xs font-semibold text-brand-gold rounded-xl hover:bg-slate-700"
            >
              Atiestatīt visus filtrus
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((comp) => (
              <div
                key={comp.id}
                onClick={() => onSelectCompetition(comp)}
                className="group bg-[#131D31] rounded-2xl overflow-hidden border border-slate-800 hover:border-brand-gold/40 shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={comp.coverImage || (Array.isArray(comp.gallery) && comp.gallery[0]) || "/images/competitions/lrr-2026.jpg"}
                      alt={comp.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131D31] via-[#131D31]/10 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md bg-brand-gold/90 text-brand-dark">
                        {comp.category || 'Reitings'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-300 bg-black/60 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{comp.date}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif font-bold text-base text-white group-hover:text-brand-gold transition-colors mb-2 line-clamp-2">
                      {cleanText(comp.title)}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-3">
                      {cleanText(comp.summary || comp.description)}
                    </p>

                    {/* Coupled matches highlight */}
                    {comp.results && comp.results.length > 0 && (
                      <div className="space-y-1.5 mb-2">
                        {comp.results.slice(0, 3).map((res, rIdx) => (
                          <div key={rIdx} className="flex items-center justify-between text-[11px] bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                            <span className="text-slate-300 truncate pr-2 font-medium flex items-center gap-1.5 min-w-0">
                              {(res.age_group || res.ageGroup || res.group || res.category) && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-brand-gold border border-slate-700 font-semibold shrink-0">
                                  {cleanText(res.age_group || res.ageGroup || res.group || res.category)}
                                </span>
                              )}
                              <span className="truncate">{cleanText(res.couple)}</span>
                              {res.discipline && res.discipline !== 'Sporta dejas' && (
                                <span className="text-[10px] text-slate-400 font-normal shrink-0">
                                  ({res.discipline === 'Standartdejas (ST)' ? 'ST' : res.discipline === 'Latīņamerikas dejas (LA)' ? 'LA' : res.discipline})
                                </span>
                              )}
                            </span>
                            <span className="text-brand-gold font-bold whitespace-nowrap shrink-0">{res.placement}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-brand-gold font-medium">
                    <span>{comp.results?.length || 0} starti</span>
                    <span>Skatīt rezultātus &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
