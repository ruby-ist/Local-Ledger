import type { ModuleOptions } from '@vite-pwa/nuxt';

const config: Partial<ModuleOptions> = {
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg}'],
  },
  manifest: {
    name: "Local Ledger",
    short_name: "Ledger",
    start_url: "/groups",
    description:
      "Local-Ledger is a mobile-first Progressive Web App designed for offline expense tracking. Organize transactions with tags, narrow results with filters, and visualize spending through interactive graph. Easily import and export your transaction data via CSV. Clean, minimal, and built to offer a secure and engaging way to manage personal finances — right from your mobile device",
    theme_color: "#000",
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
