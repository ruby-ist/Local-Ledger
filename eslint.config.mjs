// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 4,
        },
        multiline: {
          max: 1,
        },
      },
    ],
  },
}).append({ ignores: ['src-tauri'] });
