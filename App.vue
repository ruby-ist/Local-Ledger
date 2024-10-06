<template>
  <Head>
    <Title>Nuxt PWA</Title>
    <Meta name="description" content="Expense tracker app" />
    <Meta name="theme-color" content="#000" />
    <Link rel="icon" href="favicon.ico" />
    <Link rel="apple-touch-icon" href="apple-touch-icon-180x180.png" />
    <Link rel="mask-icon" href="maskable-icon-512x512.png" />
  </Head>
  <NuxtPwaAssets />

  <div class="h-100vh hidden-overflow">
    <PageTitle :title="title" />
    <div class="relative">
      <NuxtPage class="page mr-96px auto-overflow--y no-scroll-bar" @set-title="setTitle" />
      <VerticalNavBar />
      <AddLogModal />
      <TagModal v-if="showTagModal" ref="tagModal" />
    </div>
  </div>
</template>

<script lang="ts">
import { gsap } from 'gsap';
import { mapState } from 'pinia';
import { useTagsStore } from '~/stores/tagsStore';

export default defineNuxtComponent({
  data: () => ({
    title: '',
  }),

  computed: {
    ...mapState(useTagsStore, { showTagModal: 'showModal' }),
  },

  methods: {
    setTitle(title: string) {
      this.title = title;
    },
  },

  mounted() {
    gsap.set('#new_log_modal', { height: 0, display: 'none' });
  },

  updated() {
    if (this.showTagModal) {
      gsap.to('#tag-modal', { height: '100%', display: 'flex', duration: 0.5 });
    }
  },
});
</script>

<style>
:root {
  background: var(--black);
  color: var(--white);
  font-family: system-ui, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

a {
  text-decoration: none;
}

body {
  margin: 0;
  overflow: hidden;
}

.page {
  height: calc(100vh - 120px);
}
</style>
