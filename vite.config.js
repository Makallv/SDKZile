import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/main.jsx',
      ],
      refresh: true,
      valetTls: 'sdk_zile.test',
    }),
    react(),
    {
      name: 'serve-wp-uploads',
      configureServer(server) {
        const uploadsPath = path.resolve(__dirname, 'web_volumes/volumes/wp_zile_uploads/_data');
        server.middlewares.use('/wp-content/uploads', (req, res, next) => {
          try {
            const cleanUrl = decodeURIComponent(req.url.split('?')[0]);
            const filePath = path.join(uploadsPath, cleanUrl);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              res.setHeader('Cache-Control', 'public, max-age=31536000');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch (e) {
            // pass to next
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});
