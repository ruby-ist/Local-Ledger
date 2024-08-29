<template>
  <div id="layout">
    <PageTitle :title="title" />
    <div style="position: relative;">
      <NuxtPage class="page" @set-title="setTitle" />
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
    height: 100vh;
  }
}

.page {
  height: calc(100vh - 120px);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-right: 96px;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
