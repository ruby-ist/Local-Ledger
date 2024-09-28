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
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag.startsWith('swiper-');
      },
    },
  },
});
