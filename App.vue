<template>
  <div class="h-100vh hidden-overflow">
    <PageTitle :title="title" />
    <div class="relative">
      <NuxtPage class="page mr-96px auto-overflow--y no-scroll-bar" @set-title="setTitle" />
      <VerticalNavBar />
      <AddLogModal />
    </div>
  </div>
</template>

<script lang="ts">
import { gsap } from 'gsap';

export default defineNuxtComponent({
  data: () => ({
    title: '',
  }),

  methods: {
    setTitle(title: string) {
      this.title = title;
    },
  },

  mounted() {
    gsap.set('#new_log_modal', { height: 0, display: 'none' });
  },
});
</script>

<style>
:root {
  background: black;
  color: white;
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
