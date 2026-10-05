import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecentCompetitions from './components/RecentCompetitions';
import AboutSection from './components/AboutSection';
import ProgramsSection from './components/ProgramsSection';
import WeddingDanceSection from './components/WeddingDanceSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import CompetitionDetailModal from './components/CompetitionDetailModal';
import CompetitionDetailPage from './components/CompetitionDetailPage';
import CompetitionsView from './components/CompetitionsView';
import DancersSection from './components/DancersSection';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { initialCompetitions } from './data/staticFallback';
import { cleanText } from './lib/textUtils';

const STORAGE_KEY = 'sdk_zile_competitions_v12';

function sanitizeCompetition(c) {
  if (!c) return c;
  return {
    ...c,
    coverImage: c.coverImage || c.cover_image,
    title: cleanText(c.title),
    summary: cleanText(c.summary),
    description: cleanText(c.description),
    location: cleanText(c.location),
    results: Array.isArray(c.results)
      ? c.results.map(r => {
          const age = cleanText(r.age_group || r.ageGroup || r.group || r.category || '');
          return {
            ...r,
            couple: cleanText(r.couple),
            placement: cleanText(r.placement),
            age_group: age,
            ageGroup: age,
            group: age,
            category: age,
            discipline: cleanText(r.discipline)
          };
        })
      : []
  };
}

function parseStoredCompetitions(raw) {
  if (!raw) return null;
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(sanitizeCompetition);
    }
  } catch (e) {
    console.warn('Could not parse stored competitions:', e);
  }
  return null;
}

export default function App() {
  const [competitions, setCompetitions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = parseStoredCompetitions(saved);
      if (parsed) return parsed;
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    return Array.isArray(initialCompetitions) ? initialCompetitions.map(sanitizeCompetition) : [];
  });

  const [currentView, setCurrentView] = useState('home'); // 'home' or 'competitions'
  const [competitionsSearchQuery, setCompetitionsSearchQuery] = useState('');
  const [selectedCompForDetail, setSelectedCompForDetail] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show temporary toast notification
  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  // Handle URL hash changes for discrete competition pages and archive
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/sacensibas/')) {
        const id = hash.replace('#/sacensibas/', '');
        const found = competitions.find(c => c.id === id || c.id === `comp-${id}`);
        if (found) {
          setSelectedCompForDetail(found);
          setCurrentView('competition-detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#/sacensibas') {
        setCurrentView('competitions');
        setSelectedCompForDetail(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/' || hash === '' || hash === '#sakums') {
        if (currentView === 'competitions' || currentView === 'competition-detail') {
          setCurrentView('home');
          setSelectedCompForDetail(null);
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, [competitions]);

  const handleSelectCompetition = (comp) => {
    setSelectedCompForDetail(comp);
    setCurrentView('competition-detail');
    window.location.hash = `#/sacensibas/${comp.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCompetitions = () => {
    setSelectedCompForDetail(null);
    setCurrentView('competitions');
    window.location.hash = '#/sacensibas';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAdjacentCompetition = (adjacentComp) => {
    setSelectedCompForDetail(adjacentComp);
    window.location.hash = `#/sacensibas/${adjacentComp.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch competitions from API if server is running
  useEffect(() => {
    fetch('/api/competitions')
      .catch(() => fetch('http://localhost:3001/api/competitions'))
      .then((res) => {
        if (!res.ok) throw new Error('API status: ' + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const sanitized = data.map(sanitizeCompetition);
          setCompetitions(sanitized);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
          } catch (e) {
            console.warn('Failed saving to localStorage:', e);
          }
        }
      })
      .catch((err) => {
        console.log('Using static/fallback competitions store:', err.message);
      });
  }, []);

  // Save to localStorage whenever competitions change
  const syncCompetitionsState = (updatedList) => {
    const safeList = Array.isArray(updatedList) ? updatedList : [];
    setCompetitions(safeList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeList));
    } catch (e) {
      console.warn('Failed persisting competitions:', e);
    }
  };

  // Handle Add Competition (from Admin)
  const handleAddCompetition = async (newComp) => {
    const compWithId = {
      ...newComp,
      id: `comp-${Date.now()}`
    };

    // Optimistic update
    const updated = [compWithId, ...competitions];
    syncCompetitionsState(updated);
    showToast(`Sacensības "${newComp.title}" veiksmīgi publicētas! 🎉`);

    // Try posting to API
    try {
      await fetch('/api/competitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComp)
      });
    } catch (e) {
      console.warn('API post failed, persisted locally in storage:', e);
    }
  };

  // Handle Update Competition
  const handleUpdateCompetition = async (updatedComp) => {
    const updatedList = competitions.map((c) =>
      c.id === updatedComp.id ? updatedComp : c
    );
    syncCompetitionsState(updatedList);
    showToast(`Izmaiņas sacensībām "${updatedComp.title}" saglabātas!`);

    try {
      await fetch(`/api/competitions/${updatedComp.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedComp)
      });
    } catch (e) {
      console.warn('API update failed, persisted locally:', e);
    }
  };

  // Handle Delete Competition
  const handleDeleteCompetition = async (id) => {
    const updatedList = competitions.filter((c) => c.id !== id);
    syncCompetitionsState(updatedList);
    showToast('Sacensību ieraksts dzēsts.');

    try {
      await fetch(`/api/competitions/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.warn('API delete failed, persisted locally:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col justify-between selection:bg-brand-gold selection:text-brand-dark">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-gold text-brand-dark font-bold text-xs px-5 py-3 rounded-xl shadow-2xl animate-in slide-in-from-bottom duration-300 flex items-center gap-2">
          <span>{notification}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCompetitions={() => {
          setCompetitionsSearchQuery('');
          setCurrentView('competitions');
          window.location.hash = '#/sacensibas';
        }}
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          if (view === 'competitions') window.location.hash = '#/sacensibas';
          else if (view === 'home') window.location.hash = '';
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'competition-detail' && selectedCompForDetail ? (
          <CompetitionDetailPage
            competition={selectedCompForDetail}
            competitions={competitions}
            onBack={handleBackToCompetitions}
            onNavigateToCompetition={handleNavigateAdjacentCompetition}
          />
        ) : currentView === 'competitions' ? (
          <CompetitionsView
            competitions={competitions}
            initialSearch={competitionsSearchQuery}
            onSelectCompetition={handleSelectCompetition}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onBackToHome={() => {
              setCurrentView('home');
              window.location.hash = '';
            }}
          />
        ) : (
          <>
            <Hero
              onOpenCompetitions={() => {
                setCompetitionsSearchQuery('');
                setCurrentView('competitions');
                window.location.hash = '#/sacensibas';
              }}
            />

            <RecentCompetitions
              competitions={competitions}
              onSelectCompetition={handleSelectCompetition}
              onViewAll={() => {
                setCompetitionsSearchQuery('');
                setCurrentView('competitions');
                window.location.hash = '#/sacensibas';
              }}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />

            <AboutSection />

            <DancersSection
              onSearchCouple={(query) => {
                setCompetitionsSearchQuery(query);
                setCurrentView('competitions');
                window.location.hash = '#/sacensibas';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <ProgramsSection />

            <WeddingDanceSection />

            <GallerySection />

            <ContactSection />
          </>
        )}
      </main>

      {/* Competition Details Modal (if opened outside discrete page) */}
      {currentView !== 'competition-detail' && selectedCompForDetail && (
        <CompetitionDetailModal
          competition={selectedCompForDetail}
          onClose={() => setSelectedCompForDetail(null)}
        />
      )}

      {/* Admin Panel Modal / Screen */}
      {isAdminOpen && (
        <AdminPanel
          competitions={competitions}
          onAddCompetition={handleAddCompetition}
          onUpdateCompetition={handleUpdateCompetition}
          onDeleteCompetition={handleDeleteCompetition}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
}
