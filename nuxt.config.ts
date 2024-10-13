import pwaConfig from './config/pwa.config';
import vueConfig from './config/vue.config';
import unoConfig from './config/uno.config';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: [
    {
      path: '~/components/icons',
      pathPrefix: false,
    }, '~/components',
  ],
  css: ['~/assets/css/colors.css'],
  eslint: { config: { stylistic: true } },
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
  unocss: unoConfig,
  vue: vueConfig,
});
