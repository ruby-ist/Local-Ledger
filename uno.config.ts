import { defineConfig, presetAttributify, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [presetWebFonts, presetAttributify],
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    [/^p-(\d+)$/, (match) => ({ padding: `${match[1] / 4}rem` })],
  ],
});
