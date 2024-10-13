<template>
  <swiper-container ref="swiper" class="h-120 w-120 m-20-0" effect="cards">
    <swiper-slide v-for="(tag, index) in tags"
                  :key="index" border="rad-18" class="bg-gradient-color--gradient centered-grid"
                  font="w-500 s-1.15rem" :data-id="tag.id"
                  :style="`--color: ${tag.color}; --gradient: #${darkShade(tag.color, 60)}`">
      {{ tag.name }}
    </swiper-slide>
  </swiper-container>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: ['currentTag'],

  computed: {
    tagsLength(): number {
      return this.tags.length;
    },
    ...mapState(useTagsStore, ['tags']),
  },

  methods: {
    ...mapActions(useColorStore, ['darkShade']),
    ...mapActions(useTagsStore, ['fetchTags']),
  },

  async mounted() {
    await this.fetchTags();

    const swiperEl = this.$refs.swiper as SwiperElement;
    const swiperParams = {
      cardsEffect: {
        perSlideRotate: 5,
        perSlideOffset: 10,
      },
      centeredSlides: this.tagsLength >= 5,
      grabCursor: true,
      loop: true,
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();

    if (this.currentTag) {
      const index = this.tags.findIndex(tag => (tag.id === this.currentTag.id));
      // timeout because swiper might not function properly when slides are not enough
      setTimeout(() => swiperEl.swiper.slideToLoop(index), 250);
    } else {
      swiperEl.swiper.slideToLoop(Math.floor(this.tagsLength / 2));
    }
  },
});
</script>
