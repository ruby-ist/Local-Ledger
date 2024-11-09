<template>
  <div>
    <Tag v-for="tag in tags" :key="tag.id" :tag="tag" />
    <TagModal v-show="showModal" ref="modal" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    tags(): Tag[] {
      return this.tagsList.filter(tag => tag.id !== 1);
    },
    ...mapWritableState(useTagsStore, { tagsList: 'tags', showModal: 'showModal' }),
    ...mapWritableState(useHeaderStore, ['title', 'headerButton', 'headerButtonCallBack']),
  },

  methods: {
    setHeaderFunctionalities() {
      this.headerButton = 'Add';
      this.headerButtonCallBack = () => {
        this.showModal = true;
      };
    },
    ...mapActions(useTagsStore, ['fetchTags']),
  },

  async mounted() {
    this.title = 'Tags';
    this.setHeaderFunctionalities();
    await this.fetchTags();
  },

  beforeUnmount() {
    this.headerButton = null;
    this.headerButtonCallBack = () => {};
  },

  watch: {
    showModal(value) {
      if (value) {
        gsap.to('#tag-modal', {
          height: '100%',
          display: 'flex',
          duration: 0.5,
          onUpdate: () => {
            const swiperEl = document.querySelector('#tag-swiper') as SwiperElement;
            swiperEl.swiper.update();
          },
        });
      }
    },
  },
});
</script>
