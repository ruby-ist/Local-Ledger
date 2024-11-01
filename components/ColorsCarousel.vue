<template>
  <swiper-container ref="swiper" class="h-120 w-120 m-20-0" effect="cards">
    <swiper-slide v-for="(color, index) in colors"
                  :key="index" border="rad-18" class="bg-gradient-color--gradient"
                  :style="`--color: ${color}; --gradient: ${darkShade(color, 60)}`" />
  </swiper-container>
</template>

<script>
export default defineNuxtComponent({
  props: ['currentColor'],

  computed: {
    ...mapState(useColorStore, ['colors']),
  },

  methods: {
    ...mapActions(useColorStore, ['darkShade']),
  },

  mounted() {
    const swiperEl = this.$refs.swiper;
    const swiperParams = {
      cardsEffect: {
        perSlideRotate: 5,
        perSlideOffset: 10,
      },
      centeredSlides: true,
      grabCursor: true,
      loop: true,
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();

    if (this.currentColor) {
      const index = this.colors.findIndex(color => (color === this.currentColor));
      // timeout because swiper might not function properly when slides are not enough
      setTimeout(() => swiperEl.swiper.slideToLoop(index), 250);
    } else {
      swiperEl.swiper.slideToLoop(5);
    }
  },
});
</script>
