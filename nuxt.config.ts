// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devServer: { host: "0.0.0.0" },
  devtools: { enabled: true },
  modules: ["@unocss/nuxt"],
  ssr: false,
  vite: {
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      strictPort: true,
      hmr: mobile
        ? {
            protocol: "ws",
            host: "0.0.0.0",
            port: 5183,
          }
        : undefined,
      watch: {
        ignored: ["**/src-tauri/**"],
      },
    },
  },
});
