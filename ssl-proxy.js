import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import httpProxy from 'http-proxy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const certPath = path.join(__dirname, 'ssl', 'cert.pem');
const keyPath = path.join(__dirname, 'ssl', 'key.pem');
const hasSsl = fs.existsSync(certPath) && fs.existsSync(keyPath);

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
  console.error(`[Proxy Error -> ${targetName}]`, err.message);
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
    clean.startsWith('/__') ||
    clean.startsWith('/resources/') ||
    clean.startsWith('/src/') ||
    clean.startsWith('/node_modules/') ||
    clean.endsWith('.jsx') ||
    clean.endsWith('.tsx') ||
    clean.endsWith('.vue') ||
    clean.endsWith('.ts') ||
    clean.endsWith('.mjs') ||
    clean.endsWith('.map') ||
    url.includes('?import') ||
    url.includes('&import') ||
    url.includes('?direct') ||
    url.includes('?html-proxy')
  );
}

const createRequestHandler = (proto, port) => (req, res) => {
  req.headers['x-forwarded-proto'] = proto;
  req.headers['x-forwarded-port'] = String(port);
  if (!req.headers['x-forwarded-host']) {
    req.headers['x-forwarded-host'] = req.headers.host;
  }

  if (isVitePath(req.url)) {
    viteProxy.web(req, res);
  } else {
    laravelProxy.web(req, res);
  }
};

function getNetworkAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({ name, address: iface.address });
      }
    }
  }
  return addresses;
}

const HTTP_PORT = parseInt(process.env.HTTP_PORT || '8080', 10);
const HTTPS_PORT = parseInt(process.env.HTTPS_PORT || '8443', 10);

// HTTP Server (port 8080 on 0.0.0.0)
const httpServer = http.createServer(createRequestHandler('http', HTTP_PORT));
httpServer.on('upgrade', (req, socket, head) => {
  viteProxy.ws(req, socket, head);
});

httpServer.listen(HTTP_PORT, '0.0.0.0', () => {
  // If HTTPS also runs, banner will print together
  if (!hasSsl) {
    printBanner();
  }
});

// HTTPS Server (port 8443 on 0.0.0.0)
if (hasSsl) {
  const sslOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
  };

  const httpsServer = https.createServer(sslOptions, createRequestHandler('https', HTTPS_PORT));
  httpsServer.on('upgrade', (req, socket, head) => {
    viteProxy.ws(req, socket, head);
  });

  httpsServer.listen(HTTPS_PORT, '0.0.0.0', () => {
    printBanner();
  });
} else {
  console.warn('[Proxy Warning] SSL certificate or key not found in ./ssl. HTTPS server disabled.');
}

function printBanner() {
  console.log(`\n  \x1b[32m\x1b[1m➜  Unified Dev Proxy running on all network ports:\x1b[0m`);
  console.log(`\n  \x1b[32m➜  Local:\x1b[0m`);
  console.log(`     HTTP:   \x1b[36mhttp://localhost:${HTTP_PORT}/\x1b[0m`);
  if (hasSsl) {
    console.log(`     HTTPS:  \x1b[36mhttps://localhost:${HTTPS_PORT}/\x1b[0m`);
  }

  const networkList = getNetworkAddresses();
  if (networkList.length > 0) {
    console.log(`\n  \x1b[32m➜  Network (all interfaces):\x1b[0m`);
    for (const item of networkList) {
      console.log(`     [${item.name}]`);
      console.log(`       HTTP:   \x1b[36mhttp://${item.address}:${HTTP_PORT}/\x1b[0m`);
      if (hasSsl) {
        console.log(`       HTTPS:  \x1b[36mhttps://${item.address}:${HTTPS_PORT}/\x1b[0m`);
      }
    }
  }

  console.log(`\n  \x1b[33m➜  Direct services: Laravel (:8000), Vite (:5173)\x1b[0m\n`);
}
