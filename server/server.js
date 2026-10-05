import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'competitions.json');

app.use(cors());
app.use(express.json());

// Serve local WordPress uploads directly from web_volumes
const UPLOADS_DIR = path.join(__dirname, '..', 'web_volumes', 'volumes', 'wp_zile_uploads', '_data');
if (fs.existsSync(UPLOADS_DIR)) {
  app.use('/wp-content/uploads', express.static(UPLOADS_DIR));
  app.use('/uploads', express.static(UPLOADS_DIR));
  console.log('Serving local uploads from:', UPLOADS_DIR);
}

// Helper to read competitions
function readCompetitions() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading competitions file:', err);
    return [];
  }
}

// Helper to write competitions
function writeCompetitions(competitions) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(competitions, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing competitions file:', err);
    return false;
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SDK Zīle API' });
});

// GET all competitions
app.get('/api/competitions', (req, res) => {
  const competitions = readCompetitions();
  const { category, year, search } = req.query;

  let filtered = [...competitions];

  if (category && category !== 'all') {
    filtered = filtered.filter(c => c.category?.toLowerCase() === category.toLowerCase());
  }

  if (year && year !== 'all') {
    filtered = filtered.filter(c => c.date?.startsWith(year));
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(c =>
      c.title?.toLowerCase().includes(q) ||
      c.location?.toLowerCase().includes(q) ||
      c.summary?.toLowerCase().includes(q)
    );
  }

  // Sort by date descending (newest first)
  filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  res.json(filtered);
});

// GET single competition
app.get('/api/competitions/:id', (req, res) => {
  const competitions = readCompetitions();
  const comp = competitions.find(c => c.id === req.params.id);
  if (!comp) {
    return res.status(404).json({ error: 'Sacensības netika atrastas' });
  }
  res.json(comp);
});

// POST new competition (Admin)
app.post('/api/competitions', (req, res) => {
  const { title, date, location, category, coverImage, summary, description, results, gallery } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: 'Nosaukums un datums ir obligāti lauki.' });
  }

  const competitions = readCompetitions();
  const id = `comp-${Date.now()}`;

  const newCompetition = {
    id,
    title: title.trim(),
    date,
    location: location?.trim() || '',
    category: category || 'Reitings',
    coverImage: coverImage?.trim() || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
    summary: summary?.trim() || '',
    description: description?.trim() || summary?.trim() || '',
    status: 'published',
    results: Array.isArray(results) ? results : [],
    gallery: Array.isArray(gallery) ? gallery : [],
    createdAt: new Date().toISOString()
  };

  competitions.unshift(newCompetition);
  writeCompetitions(competitions);

  res.status(201).json(newCompetition);
});

// PUT update competition (Admin)
app.put('/api/competitions/:id', (req, res) => {
  const competitions = readCompetitions();
  const index = competitions.findIndex(c => c.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Sacensības netika atrastas.' });
  }

  const updated = {
    ...competitions[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  competitions[index] = updated;
  writeCompetitions(competitions);

  res.json(updated);
});

// DELETE competition (Admin)
app.delete('/api/competitions/:id', (req, res) => {
  const competitions = readCompetitions();
  const filtered = competitions.filter(c => c.id !== req.params.id);

  if (filtered.length === competitions.length) {
    return res.status(404).json({ error: 'Sacensības netika atrastas.' });
  }

  writeCompetitions(filtered);
  res.json({ success: true, message: 'Sacensību ieraksts dzēsts.' });
});

// Simple Admin Login check
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  // Default club admin passcode: zile2026 (or custom env)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'zile2026';

  if (password === ADMIN_PASSWORD) {
    res.json({
      success: true,
      token: 'admin-session-' + Date.now(),
      user: { role: 'admin', name: 'SDK Zīle Administrācija' }
    });
  } else {
    res.status(401).json({ success: false, error: 'Nepareiza kluba administratora parole.' });
  }
});

// Contact / inquiry submission
app.post('/api/inquiries', (req, res) => {
  const { name, phone, email, type, message } = req.body;
  console.log('New inquiry received:', { name, phone, email, type, message });
  res.json({ success: true, message: 'Paldies! Jūsu pieteikums ir veiksmīgi saņemts. Mēs drīzumā ar Jums sazināsimies.' });
});

// Photo Archive Endpoints (4,896 photos from sdk-zile.lv)
const PHOTOS_FILE = path.join(__dirname, 'data', 'all_photos.json');
let cachedPhotosData = null;

function readPhotosData() {
  if (cachedPhotosData) return cachedPhotosData;
  try {
    if (fs.existsSync(PHOTOS_FILE)) {
      const raw = fs.readFileSync(PHOTOS_FILE, 'utf8');
      cachedPhotosData = JSON.parse(raw);
      return cachedPhotosData;
    }
  } catch (err) {
    console.error('Error reading all_photos.json:', err);
  }
  return { total: 0, photos: [] };
}

// GET photos with filtering, search and pagination
app.get('/api/photos', (req, res) => {
  const data = readPhotosData();
  const { category, search, page = 1, limit = 48, album } = req.query;

  let filtered = data.photos || [];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (album) {
    filtered = filtered.filter(p => p.albumTitle?.toLowerCase().includes(album.toLowerCase()) || p.albumId === album);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.albumTitle?.toLowerCase().includes(q) ||
      p.categoryLabel?.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  const numLimit = parseInt(limit, 10) || 48;
  const numPage = parseInt(page, 10) || 1;
  const total = filtered.length;
  const totalPages = Math.ceil(total / numLimit);
  const startIndex = (numPage - 1) * numLimit;
  const items = filtered.slice(startIndex, startIndex + numLimit);

  res.json({
    total,
    page: numPage,
    limit: numLimit,
    totalPages,
    photos: items
  });
});

// GET photo stats & albums list
app.get('/api/photos/stats', (req, res) => {
  const data = readPhotosData();
  const categoryCounts = {};
  const albumsMap = {};

  (data.photos || []).forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    if (p.albumTitle) {
      if (!albumsMap[p.albumTitle]) {
        albumsMap[p.albumTitle] = {
          title: p.albumTitle,
          category: p.category,
          categoryLabel: p.categoryLabel,
          count: 0,
          sample: p.thumb || p.url
        };
      }
      albumsMap[p.albumTitle].count++;
    }
  });

  res.json({
    total: (data.photos || []).length,
    byCategory: categoryCounts,
    albums: Object.values(albumsMap).sort((a, b) => b.count - a.count)
  });
});

app.listen(PORT, () => {
  console.log(`SDK Zīle API Server running on port ${PORT}`);
});
