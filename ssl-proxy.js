import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import httpProxy from 'http-proxy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const certPath = path.join(__dirname, 'ssl', 'cert.pem');
const keyPath = path.join(__dirname, 'ssl', 'key.pem');

if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
  console.error('[HTTPS Proxy] Error: SSL certificate or key not found in ./ssl');
  process.exit(1);
}

const sslOptions = {
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
};

const laravelProxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:8000',
  ws: true,
  changeOrigin: false,
  xfwd: true,
});

const viteProxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:5173',
  ws: true,
  changeOrigin: false,
  xfwd: true,
});

const handleProxyError = (targetName) => (err, req, res) => {
  if (err.code === 'ECONNRESET' || err.code === 'EPIPE' || err.code === 'ECANCELED') return;
  console.error(`[HTTPS Proxy Error -> ${targetName}]`, err.message);
  if (res && res.writeHead && !res.headersSent) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end(`Bad Gateway: Unable to reach ${targetName}`);
  }
};

laravelProxy.on('error', handleProxyError('Laravel (:8000)'));
viteProxy.on('error', handleProxyError('Vite (:5173)'));

function isVitePath(url) {
  const clean = url.split('?')[0];
  return (
    url.startsWith('/@') ||
    clean.startsWith('/resources/') ||
    clean.startsWith('/src/') ||
    clean.startsWith('/node_modules/') ||
    clean.startsWith('/__vite_ping') ||
    clean.endsWith('.jsx') ||
    clean.endsWith('.tsx') ||
    clean.endsWith('.vue') ||
    url.includes('?import') ||
    url.includes('&import')
  );
}

const server = https.createServer(sslOptions, (req, res) => {
  req.headers['x-forwarded-proto'] = 'https';
  req.headers['x-forwarded-port'] = '8443';
  if (!req.headers['x-forwarded-host']) {
    req.headers['x-forwarded-host'] = req.headers.host;
  }

  if (isVitePath(req.url)) {
    viteProxy.web(req, res);
  } else {
    laravelProxy.web(req, res);
  }
});

server.on('upgrade', (req, socket, head) => {
  // Vite HMR web socket upgrade
  viteProxy.ws(req, socket, head);
});

const PORT = process.env.HTTPS_PORT || 8443;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  \x1b[32m\x1b[1m➜  Unified HTTPS Proxy running on:\x1b[0m \x1b[36mhttps://0.0.0.0:${PORT}\x1b[0m`);
  console.log(`  \x1b[32m➜  Local:\x1b[0m   \x1b[36mhttps://localhost:${PORT}/\x1b[0m`);
  console.log(`  \x1b[32m➜  Network:\x1b[0m \x1b[36mhttps://10.90.0.50:${PORT}/\x1b[0m\n`);
});
