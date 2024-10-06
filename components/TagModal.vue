<template>
  <div id="tag-modal"
       class="h-0 w-100p absolute b-0 l-0 no-display column bg-color-black
              align-center justify--start clip-overflow--x">
    <h2 class="mt-64">Pick a color</h2>
    <ColorsCarousel />
    <input v-model="name" class="m-30-0 p-15-20 h-20 w-100 min-h-20 max-h-40 no-resize
                                 color-white center-text bg-color-secondary-black focus:no-outline"
           maxlength="30" placeholder="Name" autocomplete="off" spellcheck="false"
           border="none rad-10" font="s-1rem" required="true">
    <button class="p-8-16 pointer bg-color-white" border="none rad-8"
            font="s-1em" @click="addTag">Add</button>
    <a class="pointer absolute -t-64 r-32 z-2 color-white bg-color-black p-2"
       font="s-2.5em fam-monospace" @click="closeModal">x</a>
  </div>
</template>

<script lang="ts">
import { gsap } from 'gsap';
import { mapWritableState, mapActions } from 'pinia';
import { useTagsStore } from '~/stores/tagsStore';
import { db } from '~/db';

export default defineNuxtComponent({
  data: () => ({
    name: '',
  }),

  computed: {
    ...mapWritableState(useTagsStore, ['tags', 'showModal']),
  },

  methods: {
    closeModal() {
      gsap.to('#tag-modal', {
        height: '0',
        display: 'none',
        duration: 0.5,
        onComplete: () => { this.showModal = false; },
      });
    },

    async addTag() {
      const activeSlide = document.querySelector('#tag-modal .swiper-slide-active') as Element;
      const styles = getComputedStyle(activeSlide);
      await db.tags.add({ name: this.name, color: styles.getPropertyValue('--color') });
      await this.updateTags();
      this.closeModal();
    },

    ...mapActions(useTagsStore, ['updateTags']),
  },
});
</script>
