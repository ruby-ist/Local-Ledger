<template>
  <div id="layout">
    <PageTitle :title="title" />
    <div>
      <NuxtPage class="page" @set-title="setTitle" />
      <VerticalNavBar />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    title: "",
  }),

  methods: {
    setTitle(title: string) {
      this.title = title;
    },
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
