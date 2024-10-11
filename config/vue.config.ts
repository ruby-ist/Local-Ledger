export default {
  compilerOptions: {
    isCustomElement: (tag: string) => {
      return tag.startsWith('swiper-');
    },
  },
};
