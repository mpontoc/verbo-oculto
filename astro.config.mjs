import { defineConfig } from 'astro/config';
import rss from '@astrojs/rss';

export default defineConfig({
  site: 'https://mpontoc.github.io',
  base: '/verbo-oculto/',
  integrations: [],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
  vite: {
    resolve: {
      alias: { '@': '/src' },
    },
  },
});
