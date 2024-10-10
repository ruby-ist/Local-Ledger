import pwaConfig from './pwa.config';
import stylisticConfig from './stylistic.config';
import vueConfig from './vue.config';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: [
    {
      path: '~/components/icons',
      pathPrefix: false,
    }, '~/components',
  ],
  css: ['~/assets/css/colors.css'],
  eslint: { config: { stylistic: stylisticConfig } },
  devServer: { host: '0.0.0.0' },
  devtools: { enabled: true },
  imports: { dirs: ['stores'] },
  modules: [
    '@unocss/nuxt',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  pwa: pwaConfig,
  ssr: false,
  vue: vueConfig,
});
