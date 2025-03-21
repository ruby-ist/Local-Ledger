export const useColorsStore = defineStore('colors', {
  state: () => ({
    colors: [
      '#03346E',
      '#921A40',
      '#EF9798',
      '#64CCC5',
      '#AB886D',
      '#85A98F',
      '#DDA0DD',
      '#77CDFF',
      '#5272F2',
      '#54C392',
      '#9370DB',
      '#FF99E6',
      '#EA4040',
      '#6AC066',
      '#FFFF66',
      '#FF751A',
      '#FF71CD',
      '#3072CF',
    ],
  }),

  actions: {
    darkShade(color: string, percentage: number): string {
      const hex = color.substring(1);
      if (hex.length !== 6) {
        throw new Error('Invalid hex color.');
      }

      // Convert hex to RGB
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);

      // Darken each component by the percentage
      r = Math.floor(r * (1 - percentage / 100));
      g = Math.floor(g * (1 - percentage / 100));
      b = Math.floor(b * (1 - percentage / 100));

      // Ensure values are within valid range
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));

      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    },
  },
});
