<template>
  <div class="flex align-center justify--space-around w-100p">
    <button class="no-bg no-border no-outline pointer" @click="swiper.slidePrev()">
      <PrevIcon class="w-22" />
    </button>
    <swiper-container id="log-swiper" ref="swiper" class="h-120 w-120 m-20-0" effect="cards">
      <swiper-slide v-for="(tag, index) in tags"
                    :key="index" border="rad-18" class="bg-gradient-color--gradient centered-grid"
                    font="w-500 s-1.15rem" :data-id="tag.id"
                    :style="`--color: ${tag.color}; --gradient: ${darkShade(tag.color, 60)}`">
        {{ tag.name }}
      </swiper-slide>
    </swiper-container>
    <button class="no-bg no-border no-outline pointer" @click="swiper.slideNext()">
      <NextIcon class="w-22" />
    </button>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    swiper: {} as Swiper,
  }),

  computed: {
    tagsLength(): number {
      return this.tags.length;
    },
    ...mapState(useTagsStore, ['tags']),
    ...mapWritableState(useLedgerStore, ['currentLog', 'showModal', 'selectedTag']),
  },

  methods: {
    currentTag(): Tag | null {
      if (this.currentLog) return (this.currentLog as LogWithTag).tag;
      if (this.selectedTag) return this.selectedTag;
      return null;
    },

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
    this.swiper = swiperEl.swiper;
    swiperEl.swiper.slideToLoop(Math.round(this.tagsLength / 2));
  },

  watch: {
    showModal(value) {
      const currentTag = this.currentTag();
      if (value && currentTag) {
        setTimeout(() => this.swiper.update, 1000);
        const index = this.tags.findIndex(tag => (tag.id === currentTag.id));
        this.swiper.slideToLoop(index);
      }
    },
  },
});
</script>
