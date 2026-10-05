import React, { useState, useEffect, useMemo } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Search, Download, ExternalLink, Filter, Folder, Sparkles, Loader2 } from 'lucide-react';
import { initialPhotos, photoCategories, photoAlbums, totalPhotosCount } from '../data/photosFallback';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState(initialPhotos || []);
  const [totalCount, setTotalCount] = useState(totalPhotosCount || 2660);
  const [currentTotal, setCurrentTotal] = useState(totalPhotosCount || 2660);
  const [albumsList, setAlbumsList] = useState(photoAlbums || []);
  const [displayCount, setDisplayCount] = useState(36);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch albums metadata on mount
  useEffect(() => {
    async function loadStats() {
      try {
        const statsRes = await fetch('/api/photos/stats').catch(() => fetch('http://localhost:3001/api/photos/stats'));
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData.albums) setAlbumsList(statsData.albums);
          if (statsData.total) setTotalCount(statsData.total);
        }
      } catch (e) {
        console.info('Using pre-bundled photo archive fallback');
      }
    }
    loadStats();
  }, []);

  // Fetch photos whenever category, album, search, or displayCount changes
  useEffect(() => {
    let isCancelled = false;
    async function fetchPhotos() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        if (selectedAlbum !== 'all') params.append('album', selectedAlbum);
        if (searchQuery.trim()) params.append('search', searchQuery.trim());
        params.append('limit', String(displayCount));

        const res = await fetch(`/api/photos?${params.toString()}`).catch(() => 
          fetch(`http://localhost:3001/api/photos?${params.toString()}`)
        );
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled) {
            setPhotos(data.photos || []);
            setCurrentTotal(data.total || 0);
          }
        }
      } catch (e) {
        // Fallback to client-side filtering of initialPhotos
        if (!isCancelled) {
          const filtered = (initialPhotos || []).filter(p => {
            if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
            if (selectedAlbum !== 'all' && p.albumTitle?.toLowerCase() !== selectedAlbum.toLowerCase()) return false;
            if (searchQuery.trim()) {
              const q = searchQuery.toLowerCase().trim();
              const text = `${p.title || ''} ${p.albumTitle || ''} ${p.categoryLabel || ''}`.toLowerCase();
              if (!text.includes(q)) return false;
            }
            return true;
          });
          setPhotos(filtered.slice(0, displayCount));
          setCurrentTotal(filtered.length);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    const timer = setTimeout(fetchPhotos, 150);
    return () => { isCancelled = true; clearTimeout(timer); };
  }, [selectedCategory, selectedAlbum, searchQuery, displayCount]);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
      } else if (e.key === 'Escape') {
        setActiveImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, photos.length]);

  const activePhoto = activeImageIndex !== null ? photos[activeImageIndex] : null;

  // Filter available albums based on category
  const filteredAlbums = useMemo(() => {
    if (selectedCategory === 'all') return albumsList;
    return albumsList.filter(a => a.category === selectedCategory);
  }, [albumsList, selectedCategory]);

  return (
    <section id="galerija" className="py-24 bg-[#080E1C] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>Autentiskais SDK “Zīle” Foto Arhīvs</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Fotogalerija & Atmiņas
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl">
              Kopš kluba pirmsākumiem apkopotas <strong className="text-brand-gold">{totalCount.toLocaleString('lv-LV')} fotogrāfijas</strong> — 
              sacensību mirkļi, Latvijas Kausu fināli, vasaras nometnes Vecbebros, kluba salidojumi un audzēkņu izaugsme.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{totalCount.toLocaleString('lv-LV')} oriģinālie kadri</span>
            </span>
          </div>
        </div>

        {/* Filters and Search Toolbar */}
        <div className="bg-[#0F172A] p-4 sm:p-5 rounded-2xl border border-slate-800 mb-8 space-y-4 shadow-xl">
          
          {/* Main Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {photoCategories.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setSelectedAlbum('all');
                  setDisplayCount(36);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-brand-gold text-brand-dark font-bold shadow-md shadow-brand-gold/20'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sub-toolbar: Search & Specific Album Filter */}
          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="sm:col-span-7 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Meklēt albumu, notikumu, pāri (piem., Marks & Evelīna, Vecbebri, Sigulda)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDisplayCount(36);
                }}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-gold transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Album Dropdown */}
            <div className="sm:col-span-5 relative">
              <select
                value={selectedAlbum}
                onChange={(e) => {
                  setSelectedAlbum(e.target.value);
                  setDisplayCount(36);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-gold transition-colors truncate"
              >
                <option value="all">
                  {selectedCategory === 'all' ? `Visi albumi (${albumsList.length || 26})` : `Atlasīt albumu (${filteredAlbums.length})`}
                </option>
                {filteredAlbums.map((a, idx) => (
                  <option key={idx} value={a.title}>
                    {a.title} ({a.count} foto)
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>
              Atrastas <strong className="text-white">{currentTotal.toLocaleString('lv-LV')}</strong> fotogrāfijas
              {selectedAlbum !== 'all' && <span> albumā <strong className="text-brand-gold">"{selectedAlbum}"</strong></span>}
            </span>
            <div className="flex items-center gap-2">
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold" />}
              <span>Rāda {photos.length} no {currentTotal.toLocaleString('lv-LV')}</span>
            </div>
          </div>

        </div>

        {/* Gallery Grid */}
        {photos.length === 0 && !isLoading ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800">
            <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <div className="text-white font-serif text-lg font-bold">Fotogrāfijas netika atrastas</div>
            <p className="text-xs text-slate-400 mt-1">
              Mēģiniet izvēlēties citu kategoriju vai notīrīt meklēšanas frāzi.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedAlbum('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-slate-800 text-xs font-semibold text-brand-gold rounded-xl hover:bg-slate-700"
            >
              Atiestatīt filtrus
            </button>
          </div>
        ) : (
          <div id="gallery-grid" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {photos.map((item, idx) => (
              <div
                key={item.url || idx}
                data-testid="gallery-photo-card"
                onClick={() => setActiveImageIndex(idx)}
                className="gallery-card group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-brand-gold/50 transition-all duration-300 shadow-lg bg-slate-900/60"
              >
                <img
                  src={item.url || item.thumb}
                  alt={item.title || item.albumTitle || "SDK Zīle Fotogrāfija"}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                    {item.albumTitle || item.categoryLabel || 'SDK Zīle'}
                  </span>
                  {item.title && item.title !== item.id && (
                    <h4 className="font-serif font-bold text-white text-xs sm:text-sm mt-0.5 line-clamp-2">
                      {item.title}
                    </h4>
                  )}
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-300">
                    <Eye className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Skatīt pilnā izmērā</span>
                  </div>
                </div>

                {/* Corner Badge */}
                {item.albumTitle && (
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-300 border border-white/10 group-hover:opacity-0 transition-opacity">
                    {item.albumTitle}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {photos.length < currentTotal && (
          <div className="text-center mt-12">
            <button
              onClick={() => setDisplayCount(prev => prev + 36)}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-brand-gold text-white font-medium text-xs sm:text-sm shadow-xl transition-all hover:bg-slate-800 disabled:opacity-50"
            >
              <span>Ielādēt vēl fotogrāfijas ({currentTotal - photos.length} atlikušas)</span>
              <ChevronRight className="w-4 h-4 text-brand-gold" />
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          
          {/* Close button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Aizvērt"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={() => setActiveImageIndex((prev) => (prev - 1 + photos.length) % photos.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-white border border-white/10 transition-all"
            aria-label="Iepriekšējais"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={() => setActiveImageIndex((prev) => (prev + 1) % photos.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-white border border-white/10 transition-all"
            aria-label="Nākamais"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main photo container */}
          <div className="max-w-5xl w-full flex flex-col items-center justify-center">
            <div className="relative max-h-[75vh] w-full flex items-center justify-center">
              <img
                src={activePhoto.url}
                alt={activePhoto.title || activePhoto.albumTitle || "SDK Zīle Foto"}
                className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
              />
            </div>

            {/* Photo Caption & Metadata */}
            <div className="mt-4 text-center max-w-2xl px-4">
              <div className="text-xs text-brand-gold uppercase tracking-widest font-semibold">
                {activePhoto.albumTitle || activePhoto.categoryLabel || 'SDK Zīle Arhīvs'}
              </div>
              {activePhoto.title && activePhoto.title !== activePhoto.id && (
                <h3 className="font-serif text-base sm:text-lg font-bold text-white mt-1">
                  {activePhoto.title}
                </h3>
              )}
              {activePhoto.date && (
                <div className="text-xs text-slate-400 mt-0.5">
                  {activePhoto.date}
                </div>
              )}
              <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-center gap-4">
                <span>Fotogrāfija {activeImageIndex + 1} no {photos.length}</span>
                <a
                  href={activePhoto.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-brand-gold hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Atvērt pilnā izšķirtspējā</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
