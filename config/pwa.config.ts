import type { ModuleOptions } from '@vite-pwa/nuxt';

const config: Partial<ModuleOptions> = {
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg}'],
  },
  manifest: {
    name: 'Expense Tracker',
    short_name: 'Expa',
    description: 'My Awesome App description',
    theme_color: '#000',
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
};

export default config;
