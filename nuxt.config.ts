const host = process.env.TAURI_DEV_HOST;

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
  modules: ['@unocss/nuxt', '@nuxt/eslint', '@pinia/nuxt'],
  ssr: false,
  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      // @ts-expect-error required for Tauri hot reloading
      port: 3000,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
            protocol: 'ws',
            host,
            port: 5183,
          }
        : undefined,
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag.startsWith('swiper-');
      },
    },
  },
});
