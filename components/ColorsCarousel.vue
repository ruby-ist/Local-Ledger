<template>
  <swiper-container id="tag-swiper" ref="swiper" class="h-120 w-120 m-20-0" effect="cards">
    <swiper-slide v-for="(color, index) in colors"
                  :key="index" border="rad-18" class="bg-gradient-color--gradient"
                  :style="`--color: ${color}; --gradient: ${darkShade(color, 60)}`" />
  </swiper-container>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    swiper: {} as Swiper,
  }),

  computed: {
    ...mapState(useColorsStore, ['colors']),
    ...mapState(useTagsStore, ['showModal', 'currentTag']),
  },

  methods: {
    ...mapActions(useColorsStore, ['darkShade']),
  },

  mounted() {
    const swiperEl = this.$refs.swiper as SwiperElement;
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
    this.swiper = swiperEl.swiper;
    swiperEl.swiper.slideToLoop(Math.round(this.colors.length / 2));
  },

  watch: {
    showModal(value) {
      if (value && this.currentTag) {
        const index = this.colors.findIndex(color => (color === this.currentTag!.color));
        this.swiper.slideToLoop(index);
      }
    },
  },
});
</script>
