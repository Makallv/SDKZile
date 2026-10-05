import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, Trophy, Star, Sparkles, Heart, ChevronRight, ZoomIn, X, 
  ChevronLeft, Image as ImageIcon, ExternalLink, Calendar, Users, 
  History, Flame, Medal, Search, ArrowUpRight
} from 'lucide-react';

export default function DancersSection({ onSearchCouple }) {
  const [selectedSection, setSelectedSection] = useState('all'); // 'all' | 'active' | 'history'
  const [activeSubTab, setActiveSubTab] = useState('all'); // 'all' | 'couples' | 'solo'
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(null);

  useEffect(() => {
    if (activeHistoryIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveHistoryIndex(null);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setActiveHistoryIndex(prev => (prev === 0 ? 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeHistoryIndex]);

  const historyMoments = [
    {
      id: 'tadi-bijam',
      title: 'Tādi bijām',
      badge: '1990-ie gadi • Pirmsākumi',
      subtitle: 'Bērnība & Pirmie diplomi',
      description: 'SDK “Zīle” audzēkņi un treneri ar pirmajiem diplomiem zālē un nometnēs. Sirsnīgs ieskats kluba pirmajos soļos, kur katrs diploms tika izcīnīts ar mīlestību pret deju.',
      src: '/images/history/tadi-bijam.png',
    },
    {
      id: 'tadi-esam',
      title: 'Tādi esam',
      badge: 'Kluba salidojums • Šodiena',
      subtitle: 'Paaudžu saikne & Draudzība',
      description: 'Tie paši audzēkņi un kluba vadītāja Iveta Zīle jau pieaugušo vecumā salidojumā — tradīcijas un draudzība, kas saglabājusies cauri gadu desmitiem.',
      src: '/images/history/tadi-esam.jpg',
    }
  ];

  // ==========================================
  // 1. AKTĪVIE PĀRI (Rezultāti līdz šodienai)
  // ==========================================
  const activeCouples = [
    {
      name: "Sendijs & Elvita",
      classLevel: "Bērni & Juniori • Meistarība",
      ageGroup: "Bērni II / Juniori I",
      duration: "Aktīvi sacensību līderi",
      compsCount: 78,
      firstPlaces: 33,
      podiums: 53,
      summary: "Viens no panākumiem bagātākajiem un aktīvākajiem kluba pāriem ar 78 startiem, 33 uzvarām un desmitiem zelta diplomu visā Latvijā.",
      highlights: [
        "33 reizes izcīnīta 1. vieta sacensībās",
        "Regulāri Latvijas reitingu un kausa finālisti",
        "53 kāpumi uz goda pjedestāla"
      ],
      photo: "/images/competitions/lrr-dancers.jpg"
    },
    {
      name: "Roberts & Emīlija",
      classLevel: "Bērni & Juniori",
      ageGroup: "Bērni II / Juniori I",
      duration: "Stabils sacensību pāris",
      compsCount: 48,
      firstPlaces: 17,
      podiums: 29,
      summary: "Pārliecinošs sniegums 48 sacensībās — 17 uzvaras un 29 godalgotas vietas Rīgas, Jelgavas, Siguldas un Valmieras turnīros.",
      highlights: [
        "17 pirmās vietas un zelta diplomi",
        "Spēcīgs sniegums Latvijas Kausa posmos",
        "29 godalgotas vietas kopvērtējumā"
      ],
      photo: "/images/gallery/ballroom-couple-1.jpg"
    },
    {
      name: "Haralds & Amanda",
      classLevel: "Juniori I • Meistarība",
      ageGroup: "Juniori I",
      duration: "Aktīvi sacensību dejotāji",
      compsCount: 39,
      firstPlaces: 9,
      podiums: 20,
      summary: "Mērķtiecīgs junioru pāris ar 39 startiem, daudzkārtējiem fināliem un regulāru pārstāvniecību Latvijas reitinga posmos.",
      highlights: [
        "9 izcīnītas 1. vietas sacensībās",
        "20 reizes uz goda pjedestāla",
        "Augsti rezultāti Standartdejās un Latīņā"
      ],
      photo: "/images/gallery/ballroom-waltz.jpg"
    },
    {
      name: "Jānis & Lote",
      classLevel: "Bērni II / Juniori I",
      ageGroup: "Bērni II • Iesācēji & E klase",
      duration: "Regulāri zelta diplomu ieguvēji",
      compsCount: 27,
      firstPlaces: 18,
      podiums: 25,
      summary: "Izcila efektivitāte — 18 uzvaras 27 sacensībās un 25 pjedestāli! Regulāri saņem augstāko tiesnešu atzinību un zelta pakāpi.",
      highlights: [
        "18 uzvaras no 27 sacensībām (67% uzvaru koeficients)",
        "25 kāpumi uz goda pjedestāla",
        "1. vietas Rīgā, Siguldā un Jelgavā"
      ],
      photo: "/images/gallery/dance-kids.jpg"
    },
    {
      name: "Roberts & Alise",
      classLevel: "Bērni I & II",
      ageGroup: "Bērni I / Bērni II",
      duration: "Jaunā kluba paaudze",
      compsCount: 25,
      firstPlaces: 11,
      podiums: 17,
      summary: "Viens no perspektīvākajiem bērnu pāriem ar 11 zelta godalgām un stabilu progresu deju klasēs.",
      highlights: [
        "11 pirmās vietas un zelta diplomi",
        "17 godalgas bērnu sacensībās",
        "Uzvaras Mālpils, Siguldas un Rīgas posmos"
      ],
      photo: "/images/gallery/dance-shoes.jpg"
    },
    {
      name: "Georgs & Olīvija",
      classLevel: "Bērni I & II • Iesācēji",
      ageGroup: "Bērni I / Bērni II",
      duration: "Regulāri godalgu ieguvēji",
      compsCount: 21,
      firstPlaces: 5,
      podiums: 18,
      summary: "Pārliecinoši 18 pjedestāli 21 sacensībā — stabila tehnika, elegance un augsts tiesnešu vērtējums.",
      highlights: [
        "18 godalgas 21 sacensībā",
        "5 pirmās vietas reitingos un festivālos",
        "Regulāra iekļūšana finālos"
      ],
      photo: "/images/competitions/rigas-ritmi-2026.jpg"
    },
    {
      name: "Paulis & Katrīne",
      classLevel: "Bērni II / Juniori I",
      ageGroup: "Bērni II / Juniori I",
      duration: "Augstas meistarības pāris",
      compsCount: 18,
      firstPlaces: 9,
      podiums: 18,
      summary: "100% pjedestāla rādītājs — 18 godalgas 18 sacensībās, tostarp 9 zelta medaļas un kausi.",
      highlights: [
        "100% godalgotu vietu bilance visos startos",
        "9 izcīnītas 1. vietas",
        "Teicami starti Latvijas Čempionāta posmos"
      ],
      photo: "/images/gallery/ballroom-couple-1.jpg"
    },
    {
      name: "Emīls & Dārta",
      classLevel: "Bērni I & II",
      ageGroup: "Bērni I / Bērni II",
      duration: "Zelta diplomu meistari",
      compsCount: 17,
      firstPlaces: 13,
      podiums: 17,
      summary: "13 pirmās vietas 17 sacensībās un neviena starta ārpus goda pjedestāla — izcils talants un aizrautība.",
      highlights: [
        "13 uzvaras 17 sacensībās",
        "100% pjedestālu rezultāts",
        "Zelta diplomi Rīgā, Valmierā un Siguldā"
      ],
      photo: "/images/gallery/dance-kids.jpg"
    },
    {
      name: "Martins & Ieva",
      classLevel: "Bērni I • Iesācēji",
      ageGroup: "Bērni I • 1.-2. līmenis",
      duration: "Aktīvi 2026. gada sacensībās",
      compsCount: 7,
      firstPlaces: 5,
      podiums: 7,
      summary: "Spilgts 2026. gada starts — 5 pirmās vietas un 100% pjedestālu rādītājs jaunākajā bērnu grupā.",
      highlights: [
        "1. vieta sacensībās līdz 2026. gada rudenim",
        "5 pirmās vietas Jelgavā, Rīgā un Olainē",
        "100% godalgu bilance"
      ],
      photo: "/images/gallery/ballroom-waltz.jpg"
    },
    {
      name: "Jēkabs & Nora",
      classLevel: "Bērni I & II",
      ageGroup: "Bērni I / II",
      duration: "Regulāri laureāti",
      compsCount: 8,
      firstPlaces: 6,
      podiums: 8,
      summary: "6 uzvaras 8 sacensībās ar pārliecinošu tehnisko sniegumu Standartdeju un Latīņamerikas pamatos.",
      highlights: [
        "6 pirmās vietas no 8 startiem",
        "Zelta godalgas Rīgas un reģionu posmos",
        "100% pjedestāla sasniegums"
      ],
      photo: "/images/gallery/ballroom-couple-1.jpg"
    },
    {
      name: "Georgs & Katrīne",
      classLevel: "Juniori I • E4 / E6",
      ageGroup: "Juniori I",
      duration: "Aktīvi 2026. gada čempioni",
      compsCount: 3,
      firstPlaces: 1,
      podiums: 1,
      summary: "Spilgta uzvara sacensībās 'Rīgas Ritmi 2026' Juniori I E4 grupā un pusfināls Latvijas Kausa izcīņā.",
      highlights: [
        "1. vieta sacensībās Rīgas Ritmi 2026",
        "Pusfināls Jelgavas Domes Kausa posmā",
        "Augsts punktu skaits reitinga tabulā"
      ],
      photo: "/images/competitions/rigas-ritmi-2026.jpg"
    },
    {
      name: "Gustavs & Dārta",
      classLevel: "Bērni I • Jaunā paaudze",
      ageGroup: "Bērni I",
      duration: "2026. gada rudens debija",
      compsCount: 1,
      firstPlaces: 1,
      podiums: 1,
      summary: "Pārliecinoša debija ar 1. vietu 2026. gada rudens sacensībās un zelta diplomu kluba kontā.",
      highlights: [
        "1. vieta debijas sacensībās 2026",
        "Augstākais tiesnešu vērtējums programmā",
        "Kluba jaunās paaudzes cerība"
      ],
      photo: "/images/gallery/dance-kids.jpg"
    }
  ];

  // Papildu aktīvie pāri sarakstam
  const otherActiveCouples = [
    { name: "Martins & Karlīna", compsCount: 8, firstPlaces: 5, podiums: 8, ageGroup: "Bērni I / II" },
    { name: "Artūrs & Amēlija", compsCount: 5, firstPlaces: 5, podiums: 5, ageGroup: "Bērni I" },
    { name: "Adrians & Felicita", compsCount: 4, firstPlaces: 2, podiums: 4, ageGroup: "Bērni I" },
    { name: "Matvejs & Paula", compsCount: 3, firstPlaces: 3, podiums: 3, ageGroup: "Bērni I" },
    { name: "Ņikita & Alise", compsCount: 8, firstPlaces: 1, podiums: 2, ageGroup: "Bērni II" },
    { name: "Viktors & Enija", compsCount: 2, firstPlaces: 2, podiums: 2, ageGroup: "Bērni I" },
    { name: "Zuters & Emīlija", compsCount: 1, firstPlaces: 0, podiums: 0, ageGroup: "Juniori I" },
  ];

  // ==========================================
  // 2. AKTĪVĀS SOLO MEITENES (Rezultāti līdz šodienai)
  // ==========================================
  const activeSoloGirls = [
    {
      name: "Rūta",
      discipline: "Solo Bērni I & II",
      ageGroup: "Bērni I / II (2014.–2016. dz.g.)",
      titles: "1. vieta Rīgas Ritmos 2026 & 17 godalgas",
      compsCount: 18,
      firstPlaces: 8,
      podiums: 17,
      summary: "Viena no aktīvākajām kluba solo zvaigznēm ar 18 startiem, 8 uzvarām un 17 pjedestāliem, tostarp zelta triumfu 'Rīgas Ritmi 2026'.",
      highlights: [
        "1. vieta sacensībās Rīgas Ritmi 2026",
        "2. vieta Latvijas Čempionātā LA Valmierā",
        "17 reizes godalgotajās vietās no 18 startiem"
      ]
    },
    {
      name: "Ramona",
      discipline: "Solo Bērni I",
      ageGroup: "Bērni I (2018./2019. dz.g.)",
      titles: "100% zelta rādītājs • Valmiera & Sigulda",
      compsCount: 4,
      firstPlaces: 4,
      podiums: 4,
      summary: "Absolūta 100% uzvaru bilance — 4 zelta medaļas 4 sacensībās, ieskaitot divas 1. vietas Latvijas LA Čempionātā Valmierā.",
      highlights: [
        "Divas 1. vietas Latvijas Čempionātā LA Valmierā",
        "1. vieta Ziemassvētki Siguldā",
        "4 uzvaras 4 sacensību startos"
      ]
    },
    {
      name: "Elizabete",
      discipline: "Solo Bērni II Iesācēji",
      ageGroup: "Bērni II • 1.-2. līmenis",
      titles: "1. vieta Skanstes balvā 2026",
      compsCount: 3,
      firstPlaces: 1,
      podiums: 3,
      summary: "Zelts prestižajā Skanstes balvā Rīgā (Atta Centrs), sudrabs Ludzas Kausā un sudrabs Latvijas Čempionātā Valmierā.",
      highlights: [
        "1. vieta Skanstes Balva 2026 (Atta Centrs, Rīga)",
        "2. vieta Ludzas Kauss 2026",
        "2. vieta Latvijas Čempionātā LA Valmierā"
      ]
    },
    {
      name: "Kristena",
      discipline: "Solo Bērni I",
      ageGroup: "Bērni I (2018. dz.g.)",
      titles: "1. vieta Siguldā & Medaļas Valmierā",
      compsCount: 6,
      firstPlaces: 3,
      podiums: 6,
      summary: "Daudzkārtēja godalgoto vietu ieguvēja ar 6 pjedestāliem 6 sacensībās — 1. vieta Siguldā un medaļas Valmieras valsts turnīrā.",
      highlights: [
        "1. vieta Ziemassvētki Siguldā",
        "2. vieta Latvijas Čempionāts LA",
        "100% godalgu bilance (6 no 6)"
      ]
    },
    {
      name: "Lauma",
      discipline: "Solo Bērni I",
      ageGroup: "Bērni I",
      titles: "2 uzvaras & 6 pjedestāli",
      compsCount: 7,
      firstPlaces: 2,
      podiums: 6,
      summary: "Stabili un izteiksmīgi starti solo programmā ar 2 zelta godalgām un 6 kāpumiem uz goda pjedestāla.",
      highlights: [
        "2 pirmās vietas reitinga turnīros",
        "6 pjedestāli 7 sacensībās",
        "Teicama ritma un kustību plastika"
      ]
    },
    {
      name: "Maija",
      discipline: "Solo Bērni I",
      ageGroup: "Bērni I (2019.g. un jaunākas)",
      titles: "Sudrabs Valmierā & Jelgavā",
      compsCount: 1,
      firstPlaces: 0,
      podiums: 1,
      summary: "Mūsu jaunākās paaudzes solo talants — sudraba godalga Latvijas Čempionātā Valmierā un augsts tiesnešu novērtējums.",
      highlights: [
        "2. vieta Latvijas Čempionātā Valmierā",
        "Teicams sniegums pirmajās valsts sacensībās",
        "Kluba jaunākās paaudzes cerība"
      ]
    },
    {
      name: "Ieva",
      discipline: "Solo Bērni I",
      ageGroup: "Bērni I",
      titles: "2 pirmās vietas",
      compsCount: 2,
      firstPlaces: 2,
      podiums: 2,
      summary: "Divi starti un divas pārliecinošas 1. vietas ar zelta diplomiem sacensībās.",
      highlights: [
        "100% zelta rezultāts",
        "2 uzvaras bērnu solo iesācēju grupā",
        "Augstākās pakāpes diplomi"
      ]
    }
  ];

  // ==========================================
  // 3. KLUBA VĒSTURES PĀRI (History Section)
  // ==========================================
  const historyCouples = [
    {
      name: "Marks & Evelīna",
      era: "2014.–2019.",
      classLevel: "Jaunieši • A Klase",
      duration: "Kopā no 2014. gada vasaras",
      compsCount: 112,
      firstPlaces: 10,
      podiums: 42,
      summary: "Kluba meistarības flagmanis — aizvadījuši 112 sacensības, sasnieguši Jauniešu A klasi un godam pārstāvējuši klubu Latvijas Čempionātos un starptautiskajās arēnās.",
      highlights: [
        "112 aizvadītas oficiālās sacensības",
        "A klases meistarība Standartdejās un Latīņamerikā",
        "Daudzkārtēji valsts čempionātu un starptautisko turnīru finālisti"
      ],
      photo: "/images/dancers/marks-evelina.jpg"
    },
    {
      name: "Edvards & Tifānija",
      era: "2013.–2020.",
      classLevel: "Juniori I • E6 & D Klase",
      duration: "7 gadi kluba krāsās",
      compsCount: 109,
      firstPlaces: 20,
      podiums: 38,
      summary: "Leģendārs pāris ar 109 aizvadītām sacensībām, 20 uzvarām un 38 pjedestāliem. No pirmajiem soļiem Iesācējos līdz Junioru fināliem.",
      highlights: [
        "109 sacensības un 20 zelta triumfi",
        "Regulāri Latvijas Kausa un reitingu finālisti",
        "1. vietas Jaunmārupē, Siguldā un Rīgā"
      ],
      photo: "/images/dancers/edvards-tifanija.jpg"
    },
    {
      name: "Kristers & Amanda",
      era: "2013.–2018.",
      classLevel: "Juniori I • C Klase (ST & LA)",
      duration: "7 gadi partnerībā no 1. klases",
      compsCount: 94,
      firstPlaces: 10,
      podiums: 37,
      summary: "No Bērni I E4 pirmajiem soļiem līdz stabilam Juniori I C klases fināla līmenim. Pāris kopā aizvadījis 94 sacensības un 37 reizes kāpis uz goda pjedestāla.",
      highlights: [
        "94 sacensību starti un 37 pjedestāli",
        "Juniori I C klases meistarība abās programmās",
        "Uzvaras Rīgas, Jelgavas un Siguldas turnīros"
      ],
      photo: "/images/dancers/kristers-amanda.jpg"
    },
    {
      name: "Anrijs & Patrīcija",
      era: "2013.–2017.",
      classLevel: "Juniori I • E6 Klase",
      duration: "4 intensīvas sezonas",
      compsCount: 62,
      firstPlaces: 13,
      podiums: 24,
      summary: "Spēcīgs junioru pāris ar 62 startiem un 13 uzvarām, kas regulāri pārstāvēja SDK “Zīle” Latvijas Kausa posmos.",
      highlights: [
        "13 uzvaras un 24 godalgas",
        "62 aizvadīti turnīri",
        "Stabila vieta Latvijas junioru reitinga pirmajā desmitniekā"
      ],
      photo: "/images/gallery/ballroom-couple-1.jpg"
    },
    {
      name: "Daniels & Elīna",
      era: "2014.–2017.",
      classLevel: "Bērni I & II • Zelta Diplomi",
      duration: "Bērnu grupu meistarība",
      compsCount: 45,
      firstPlaces: 17,
      podiums: 28,
      summary: "Daudzkārtēji 1. vietas un 1. pakāpes zelta diplomu ieguvēji bērnu grupās sacensībās “Ziema”, “Rudens Kauss” un “Siguldas pavasaris”.",
      highlights: [
        "17 pirmās vietas 45 sacensībās",
        "28 kāpumi uz goda pjedestāla",
        "Augstākais tiesnešu vērtējums 3 un 4 deju programmās"
      ],
      photo: "/images/gallery/dance-kids.jpg"
    },
    {
      name: "Robins & Sintija",
      era: "2019.–2023.",
      classLevel: "Juniori & Iesācēji",
      duration: "4 gadi sacensību apritē",
      compsCount: 41,
      firstPlaces: 12,
      podiums: 24,
      summary: "41 sacensība un 12 pirmās vietas — aktīvs un enerģisks pāris, kas ar panākumiem startēja Siguldas, Rīgas un Valmieras turnīros.",
      highlights: [
        "12 uzvaras un 24 pjedestāli",
        "Stabila iekļūšana finālos",
        "Teicami starti reitinga sacensībās"
      ],
      photo: "/images/gallery/ballroom-waltz.jpg"
    },
    {
      name: "Ņikita & Ieva",
      era: "2019.–2023.",
      classLevel: "Bērni & Juniori",
      duration: "4 aktīvas sezonas",
      compsCount: 38,
      firstPlaces: 12,
      podiums: 21,
      summary: "38 sacensību starti un 12 zelta uzvaras — viena no redzamākajām kluba partnerībām savā vecuma grupā.",
      highlights: [
        "12 pirmās vietas",
        "21 godalgota vieta",
        "Uzvaras reģionu un galvaspilsētas turnīros"
      ],
      photo: "/images/competitions/rigas-ritmi-2026.jpg"
    },
    {
      name: "Hugo & Ieva",
      era: "2013.–2016.",
      classLevel: "Bērni & Iesācēji",
      duration: "Pirmie kluba soļi",
      compsCount: 28,
      firstPlaces: 1,
      podiums: 7,
      summary: "Aizvadīja 28 sacensības kluba pirmsākumu posmā, ieliekot stabilus pamatus kluba tradīcijām.",
      highlights: [
        "28 aizvadīti turnīri",
        "Dalība lielākajos Latvijas festivālos",
        "Kluba vēstures zelta fonds"
      ],
      photo: "/images/gallery/dance-shoes.jpg"
    },
    {
      name: "Reinis & Aleksandra",
      era: "2017.–2020.",
      classLevel: "Iesācēji & Bērni",
      duration: "Kopā no 2016. gada rudens",
      compsCount: 25,
      firstPlaces: 12,
      podiums: 21,
      summary: "Gandrīz 50% uzvaru rādītājs — 12 pirmās vietas 25 sacensībās un 21 godalga!",
      highlights: [
        "12 uzvaras 25 turnīros",
        "21 pjedestāls",
        "Augstākais vērtējums Bērnu sacensībās"
      ],
      photo: "/images/gallery/ballroom-couple-1.jpg"
    },
    {
      name: "Emīls & Beāte",
      era: "2014.–2015.",
      classLevel: "Bērni I & II",
      duration: "Spilgti starti",
      compsCount: 22,
      firstPlaces: 8,
      podiums: 14,
      summary: "22 sacensības, 8 pirmās vietas un 14 pjedestāli īsā, bet ļoti spilgtā sacensību posmā.",
      highlights: [
        "8 uzvaras un 14 pjedestāli",
        "Mālpils un Siguldas čempionātu laureāti",
        "Zelta diplomi bērnu programmā"
      ],
      photo: "/images/gallery/dance-kids.jpg"
    },
    {
      name: "Mārtiņš & Jekaterina",
      era: "2018.–2020.",
      classLevel: "Bērni I & II",
      duration: "2 aktīvas sezonas",
      compsCount: 19,
      firstPlaces: 8,
      podiums: 9,
      summary: "19 sacensības un 8 zelta uzvaras — stabils bērnu pāris ar regulārām godalgām.",
      highlights: [
        "8 pirmās vietas",
        "9 godalgas",
        "1. pakāpes diplomi reitinga posmos"
      ],
      photo: "/images/gallery/ballroom-waltz.jpg"
    },
    {
      name: "Krišjānis & Patrīcija",
      era: "2017.–2018.",
      classLevel: "Juniori I • E6 Klase",
      duration: "Kopā no 2017. gada vasaras",
      compsCount: 18,
      firstPlaces: 4,
      podiums: 7,
      summary: "Aktīvi sacensību dejotāji, kuri pārstāvēja klubu reitingos un Latvijas Čempionātā 10 dejās.",
      highlights: [
        "Dalība Latvijas Čempionātā 10 dejās",
        "Goda pjedestāli reitinga posmos",
        "4 uzvaras junioru konkurencē"
      ],
      photo: "/images/dancers/krisjanis-patricija.jpg"
    }
  ];

  // Papildu vēsturiskie pāri meklēšanai un arhīvam
  const additionalHistoryCouples = [
    { name: "Ernests & Beāte", era: "2014.–2016.", count: 33, wins: 1, podiums: 8 },
    { name: "Everts & Krista", era: "2014.–2016.", count: 24, wins: 4, podiums: 11 },
    { name: "Krišjānis & Estere", era: "2015.–2017.", count: 22, wins: 7, podiums: 12 },
    { name: "Aleksis & Julianna", era: "2020.–2023.", count: 15, wins: 3, podiums: 6 },
    { name: "Marats & Paula", era: "2016.–2018.", count: 15, wins: 8, podiums: 13 },
    { name: "Marks & Signe", era: "2013.–2014.", count: 15, wins: 3, podiums: 6 },
    { name: "Kristiāns & Melānija", era: "2018.–2020.", count: 13, wins: 10, podiums: 13 },
    { name: "Roberts & Viktorija", era: "2014.–2015.", count: 13, wins: 9, podiums: 12 },
    { name: "Krišjānis & Beatrise", era: "2019.–2023.", count: 10, wins: 2, podiums: 3 },
    { name: "Markuss & Alise", era: "2015.–2016.", count: 10, wins: 3, podiums: 7 },
  ];

  const filteredAdditionalHistory = useMemo(() => {
    if (!historySearchQuery) return additionalHistoryCouples;
    const q = historySearchQuery.toLowerCase();
    return additionalHistoryCouples.filter(c => 
      c.name.toLowerCase().includes(q) || c.era.toLowerCase().includes(q)
    );
  }, [historySearchQuery]);

  return (
    <section id="dejotaji" className="py-24 bg-[#090F1E] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5 text-brand-gold" />
            <span>SDK “Zīle” Pāri & Dejotāji</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Kluba Dejotāji & Lepnums
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Kluba 30 gadu vēsturi veido mūsu sportisti — aktīvie deju pāri un solo dejotājas, kas startē šodien, 
            kā arī leģendārie vēstures pāri, kuru sasniegumi veidojuši SDK “Zīle” slavu Latvijā un pasaulē.
          </p>

          {/* Segmented Section Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm">
            <button
              onClick={() => setSelectedSection('all')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedSection === 'all'
                  ? 'bg-brand-gold text-brand-dark shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Visi Dejotāji</span>
            </button>

            <button
              onClick={() => setSelectedSection('active')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedSection === 'active'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>Aktīvie (Šodiena)</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                {activeCouples.length + activeSoloGirls.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedSection('history')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedSection === 'history'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <History className="w-4 h-4 text-amber-300" />
              <span>Kluba Vēsture</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-700/50">
                1995–2023
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: AKTĪVIE DEJO TĀJI & PĀRI (Rezultāti līdz šodienai) */}
        {/* ========================================================= */}
        {(selectedSection === 'all' || selectedSection === 'active') && (
          <div className="mb-24 pt-6">
            
            {/* Active Header & Sub-filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-emerald-500/20">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Aktīvā sezona • Rezultāti līdz šodienai</span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white flex items-center gap-3">
                  <span>Aktīvie Pāri & Solo Meitenes</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-sans font-semibold">
                    Šodiena • 2024–2026
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Kluba sportisti ar aktīviem sacensību rezultātiem līdz pat 2026. gada sezonai Mālpilī un Siguldā.
                </p>
              </div>

              {/* Sub-tab: All / Only Couples / Only Solo */}
              <div className="flex items-center gap-2 shrink-0 p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setActiveSubTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeSubTab === 'all'
                      ? 'bg-slate-800 text-emerald-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Visi ({activeCouples.length + activeSoloGirls.length})
                </button>
                <button
                  onClick={() => setActiveSubTab('couples')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeSubTab === 'couples'
                      ? 'bg-slate-800 text-emerald-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Pāri ({activeCouples.length})
                </button>
                <button
                  onClick={() => setActiveSubTab('solo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeSubTab === 'solo'
                      ? 'bg-slate-800 text-pink-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Solo Meitenes ({activeSoloGirls.length})
                </button>
              </div>
            </div>

            {/* --- AKTĪVIE PĀRI GRID --- */}
            {(activeSubTab === 'all' || activeSubTab === 'couples') && (
              <div className="mb-14">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-serif font-bold text-xl text-white">
                    Aktīvie Deju Pāri
                  </h4>
                  <span className="text-xs text-slate-400">
                    ({activeCouples.length} pāri ar jaunākajiem rezultātiem)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeCouples.map((couple, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0F172A] rounded-2xl border border-slate-800 hover:border-emerald-500/50 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>

                      <div>
                        {/* Badges */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                            {couple.classLevel}
                          </span>
                          <span className="text-[10px] text-emerald-400/80 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            <span>{couple.duration}</span>
                          </span>
                        </div>

                        {/* Couple Name */}
                        <h4 className="font-serif font-bold text-xl text-white group-hover:text-emerald-300 transition-colors mb-1">
                          {couple.name}
                        </h4>
                        <div className="text-xs text-slate-400 mb-3">
                          Vecuma grupa: <span className="text-slate-300 font-semibold">{couple.ageGroup}</span>
                        </div>

                        {/* Stat counters */}
                        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-4 text-center">
                          <div>
                            <div className="text-[10px] text-slate-400 uppercase font-medium">Starti</div>
                            <div className="text-sm font-bold text-white">{couple.compsCount}</div>
                          </div>
                          <div className="border-x border-slate-800">
                            <div className="text-[10px] text-emerald-400 uppercase font-medium">1. vietas</div>
                            <div className="text-sm font-bold text-emerald-400">{couple.firstPlaces}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-amber-400 uppercase font-medium">Pjedestāli</div>
                            <div className="text-sm font-bold text-amber-400">{couple.podiums}</div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {couple.summary}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-1.5 pt-3 border-t border-slate-800/80 mb-6">
                          {couple.highlights.map((ach, aIdx) => (
                            <div key={aIdx} className="text-[11px] text-slate-300 flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">&bull;</span>
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800">
                        <button
                          onClick={() => onSearchCouple(couple.name.split(' ')[0])}
                          className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-950/60 text-xs font-semibold text-slate-200 hover:text-emerald-300 transition-colors flex items-center justify-center gap-1.5 border border-slate-700/60 hover:border-emerald-700/40"
                        >
                          <span>Skatīt {couple.name} rezultātus</span>
                          <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Active Couples Compact Strip */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold text-slate-400">Citi aktīvie pāri:</span>
                  {otherActiveCouples.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => onSearchCouple(c.name.split(' ')[0])}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-950/40 text-xs text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-700/50 transition-all flex items-center gap-2"
                    >
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">({c.compsCount} starti)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* --- AKTĪVĀS SOLO MEITENES GRID --- */}
            {(activeSubTab === 'all' || activeSubTab === 'solo') && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <h4 className="font-serif font-bold text-xl text-white">
                    Aktīvās Solo Meitenes
                  </h4>
                  <span className="text-xs text-pink-300/80">
                    ({activeSoloGirls.length} solo čempiones ar rezultātiem līdz šodienai)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeSoloGirls.map((solo, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0F172A] rounded-2xl border border-pink-900/30 hover:border-pink-500/50 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition-colors"></div>

                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-pink-300 px-2.5 py-1 rounded-md bg-pink-500/10 border border-pink-500/30">
                            {solo.discipline}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-pink-500/20 text-pink-300 font-sans font-semibold border border-pink-500/30">
                            Solo Disciplīna
                          </span>
                        </div>

                        {/* Solo Dancer Name */}
                        <h4 className="font-serif font-bold text-xl text-white group-hover:text-pink-300 transition-colors mb-1">
                          {solo.name}
                        </h4>
                        <div className="text-xs text-pink-300/70 mb-3 italic">
                          {solo.titles}
                        </div>

                        {/* Stat counters */}
                        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-4 text-center">
                          <div>
                            <div className="text-[10px] text-slate-400 uppercase font-medium">Starti</div>
                            <div className="text-sm font-bold text-white">{solo.compsCount}</div>
                          </div>
                          <div className="border-x border-slate-800">
                            <div className="text-[10px] text-pink-400 uppercase font-medium">1. vietas</div>
                            <div className="text-sm font-bold text-pink-400">{solo.firstPlaces}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-amber-400 uppercase font-medium">Pjedestāli</div>
                            <div className="text-sm font-bold text-amber-400">{solo.podiums}</div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {solo.summary}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-1.5 pt-3 border-t border-slate-800/80 mb-6">
                          {solo.highlights.map((ach, aIdx) => (
                            <div key={aIdx} className="text-[11px] text-slate-300 flex items-start gap-2">
                              <span className="text-pink-400 font-bold">&bull;</span>
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800">
                        <button
                          onClick={() => onSearchCouple(solo.name)}
                          className="w-full py-2.5 rounded-xl bg-pink-950/40 hover:bg-pink-900/60 text-xs font-semibold text-pink-200 hover:text-white transition-colors flex items-center justify-center gap-1.5 border border-pink-800/40"
                        >
                          <span>Skatīt {solo.name} rezultātus</span>
                          <ChevronRight className="w-3.5 h-3.5 text-pink-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 2: KLUBA VĒSTURES PĀRI (History Section)         */}
        {/* ========================================================= */}
        {(selectedSection === 'all' || selectedSection === 'history') && (
          <div className="pt-6">
            
            {/* History Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-amber-500/20">
              <div>
                <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider mb-1">
                  <History className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Kluba Vēsture & Zelta Fonds • 1995–2023</span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white flex items-center gap-3">
                  <span>Kluba Vēstures Pāri & Leģendas</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-sans font-semibold">
                    Vēstures Arhīvs
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  Neaizmirstamās partnerības, kas gadiem ilgi nesa kluba vārdu Latvijas un starptautiskajos čempionātos, 
                  izcīnot augstākās klases meistarību un iedvesmojot nākamos dejotājus.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-400">
                  {historyCouples.length + additionalHistoryCouples.length} leģendāri pāri arhīvā
                </span>
              </div>
            </div>

            {/* Featured History Couples Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {historyCouples.map((couple, idx) => (
                <div
                  key={idx}
                  className="bg-[#0F172A] rounded-2xl border border-slate-800 hover:border-brand-gold/50 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>

                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold px-2.5 py-1 rounded-md bg-brand-gold/10 border border-brand-gold/20">
                        {couple.classLevel}
                      </span>
                      <span className="text-[10px] text-amber-300/80 font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {couple.era}
                      </span>
                    </div>

                    {/* Name */}
                    <h4 className="font-serif font-bold text-xl text-white group-hover:text-brand-gold transition-colors mb-1">
                      {couple.name}
                    </h4>
                    <div className="text-xs text-slate-400 mb-3 italic">
                      {couple.duration}
                    </div>

                    {/* Stat counters */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-4 text-center">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-medium">Starti</div>
                        <div className="text-sm font-bold text-white">{couple.compsCount}</div>
                      </div>
                      <div className="border-x border-slate-800">
                        <div className="text-[10px] text-brand-gold uppercase font-medium">1. vietas</div>
                        <div className="text-sm font-bold text-brand-gold">{couple.firstPlaces}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-amber-400 uppercase font-medium">Pjedestāli</div>
                        <div className="text-sm font-bold text-amber-400">{couple.podiums}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {couple.summary}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-800/80 mb-6">
                      {couple.highlights.map((ach, aIdx) => (
                        <div key={aIdx} className="text-[11px] text-slate-300 flex items-start gap-2">
                          <span className="text-brand-gold font-bold">&bull;</span>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800">
                    <button
                      onClick={() => onSearchCouple(couple.name.split(' ')[0])}
                      className="w-full py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-brand-gold transition-colors flex items-center justify-center gap-1.5 border border-slate-700/60"
                    >
                      <span>Skatīt {couple.name} rezultātus</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-gold" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* History Search & Expandable Archive Strip */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 mb-16">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-brand-gold" />
                  <h4 className="font-serif font-bold text-lg text-white">
                    Citi Vēsturiskie Pāri Kluba Arhīvā
                  </h4>
                </div>

                <div className="relative max-w-xs w-full">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Meklēt vēstures pāri..."
                    value={historySearchQuery}
                    onChange={(e) => setHistorySearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {filteredAdditionalHistory.map((c, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSearchCouple(c.name.split(' ')[0])}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 hover:border-brand-gold/40 cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-[10px] text-amber-400/80 font-medium mb-0.5">{c.era}</div>
                      <div className="text-xs font-bold text-white group-hover:text-brand-gold transition-colors">{c.name}</div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{c.count} starti</span>
                      <span className="text-brand-gold font-bold">{c.podiums} pjed.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================= */}
            {/* TĀDI BIJĀM & TĀDI ESAM SHOWCASE                          */}
            {/* ========================================================= */}
            <div className="rounded-3xl bg-[#0F172A] border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tradīcijas & Kluba Vēstures Retrospekcija</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                    Tādi bijām... un tādi esam! 🙂
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                    Gadu gaitā klubs ir bijis otrās mājas desmitiem bērnu un jauniešu. Regulārie salidojumi, 
                    vasaras nometnes un deju vakari pulcē visas paaudzes kopā — no pirmajiem soļiem bērnībā līdz pat šodienai.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href="#galerija"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-brand-gold border border-slate-700 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Vēstures foto arhīvs</span>
                  </a>
                  <button
                    onClick={() => onSearchCouple("")}
                    className="px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-amber-400 text-xs font-bold text-brand-dark transition-all flex items-center gap-1.5 shadow-md shadow-brand-gold/20"
                  >
                    <span>Pārlūkot visus rezultātus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Side-by-side Large Visual Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {historyMoments.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveHistoryIndex(idx)}
                    className="history-photo-card group relative bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-800 hover:border-brand-gold/60 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between"
                  >
                    <div className="history-photo-frame relative aspect-[16/11] w-full overflow-hidden bg-slate-900/60 flex items-center justify-center p-2.5 sm:p-3.5 border-b border-slate-800">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-contain rounded-xl shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                      />

                      <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-bold text-brand-gold shadow-md">
                        {item.badge}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/35 backdrop-blur-[2px] rounded-xl m-2.5 sm:m-3.5">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/85 text-white text-xs font-semibold border border-white/20 shadow-xl">
                          <ZoomIn className="w-4 h-4 text-brand-gold" />
                          <span>Atvērt pilnā izmērā</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                          {item.subtitle}
                        </div>
                        <h4 className="font-serif font-bold text-xl text-white group-hover:text-brand-gold transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-5 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-gold">
                        <span className="inline-flex items-center gap-1.5 group-hover:underline">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Klikšķiniet, lai palielinātu</span>
                        </span>
                        <span className="text-slate-400 group-hover:text-brand-gold transition-colors font-bold">&rarr;</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* FULLSCREEN MODAL FOR "TĀDI BIJĀM" & "TĀDI ESAM"            */}
        {/* ========================================================= */}
        {activeHistoryIndex !== null && (
          <div 
            onClick={() => setActiveHistoryIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          >
            <button
              onClick={() => setActiveHistoryIndex(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-lg"
              title="Aizvērt (Esc)"
              aria-label="Aizvērt"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveHistoryIndex(prev => (prev === 0 ? 1 : 0));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-white border border-white/10 transition-all shadow-xl"
              title="Pārslēgt fotogrāfiju (Kreisā bultiņa)"
              aria-label="Iepriekšējais"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveHistoryIndex(prev => (prev === 0 ? 1 : 0));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-white border border-white/10 transition-all shadow-xl"
              title="Pārslēgt fotogrāfiju (Labā bultiņa)"
              aria-label="Nākamais"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              onClick={(e) => e.stopPropagation()} 
              className="max-w-5xl w-full flex flex-col items-center justify-center my-auto"
            >
              <div className="relative max-h-[76vh] w-full flex items-center justify-center">
                <img
                  src={historyMoments[activeHistoryIndex].src}
                  alt={historyMoments[activeHistoryIndex].title}
                  className="max-h-[76vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
                />
              </div>

              <div className="mt-4 text-center max-w-2xl px-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
                  <span>{historyMoments[activeHistoryIndex].badge}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {historyMoments[activeHistoryIndex].title} — {historyMoments[activeHistoryIndex].subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
                  {historyMoments[activeHistoryIndex].description}
                </p>

                <div className="mt-4 flex items-center justify-center gap-3">
                  {historyMoments.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveHistoryIndex(idx)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        activeHistoryIndex === idx
                          ? 'bg-brand-gold text-brand-dark shadow-md font-bold'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                  <a
                    href={historyMoments[activeHistoryIndex].src}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-brand-gold hover:text-brand-dark text-white transition-all border border-white/15"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Oriģinālā izšķirtspēja</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
