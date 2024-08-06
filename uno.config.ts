import { defineConfig, presetAttributify, presetWebFonts } from "unocss";

const sides = { t: "top", l: "left", b: "bottom", r: "right" };
const spaces = { p: "padding", m: "margin" };

export default defineConfig({
  presets: [presetWebFonts, presetAttributify],
  rules: [
    [/^fw-(\d{3})$/, ([, w]) => ({ "font-weight": w })],
    [
      /^([p|m])([t|l|b|r])-(\d+)$/, //@ts-ignore
      ([, p, s, m]) => JSON.parse(`{ "${spaces[p]}-${sides[s]}": "${m}px" }`),
    ],
    [
      /^([p|m])-(\d+)$/, //@ts-ignore
      ([, p, m]) => JSON.parse(`{ "${spaces[p]}": "${m}px" }`),
    ],
  ],
});
