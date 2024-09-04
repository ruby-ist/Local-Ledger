<template>
  <div id="layout h-100vh">
    <PageTitle :title="title" />
    <div style="position: relative;">
      <NuxtPage class="page mr-96px" @set-title="setTitle" />
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

  #layout {
    overflow: hidden;
  }
}

.page {
  height: calc(100vh - 120px);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
