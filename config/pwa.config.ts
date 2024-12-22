import type { ModuleOptions } from '@vite-pwa/nuxt';

const config: Partial<ModuleOptions> = {
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg}'],
  },
  manifest: {
    name: 'Local Ledger',
    short_name: 'Ledger',
    start_url: '/groups',
    description: 'Local Ledger is a minimal Progressive Web App (PWA) that helps you track expenses effortlessly. It works completely offline, with features like filters for organizing transactions, interactive graphs for visualizing spending, and import/export options for easy data management. With a clean, simple interface, it offers a secure and hassle-free way to manage your finances on your mobile.',
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
