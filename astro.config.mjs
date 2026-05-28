import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ingecon.com.co',
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      customPages: ['https://ingecon.com.co/'],
      serialize(item) {
        if (item.url === 'https://ingecon.com.co/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        }
        if (item.url.endsWith('/politica-de-datos/')) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'always',
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
