// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

// @ts-ignore
export default defineNuxtConfig({
  // (optional) Enable the Nuxt devtools
  devtools: { enabled: true },
  // Enable SSG
  ssr: false,
  // Enables the development server to be discoverable by other devices for mobile development
  devServer: { host: "0.0.0.0" },
  vite: {
    // Better support for Tauri CLI output
    clearScreen: false,
    // Enable environment variables
    // Additional environment variables can be found at
    // https://tauri.app/2/reference/environment-variables/
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      // Tauri requires a consistent port
      strictPort: true,
      hmr: mobile
        ? {
            protocol: "ws",
            host: "0.0.0.0",
            port: 5183,
          }
        : undefined,
      watch: {
        // Tell vite to ignore watching `src-tauri`
        ignored: ["**/src-tauri/**"],
      },
    },
  },

  compatibilityDate: "2024-04-03",
});
