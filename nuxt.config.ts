export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: [
    { path: '~/components/icons', pathPrefix: false },
    '~/components',
  ],
  css: ['~/assets/css/colors.css'],
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        semi: true,
      },
    },
  },
  devServer: { host: '0.0.0.0' },
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  pwa: {
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
  },
  ssr: false,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag.startsWith('swiper-');
      },
    },
  },
});
