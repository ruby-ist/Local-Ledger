<template>
  <div id="layout">
    <PageTitle :title="title" />
    <div>
      <NuxtPage class="mr-96" @set-title="setTitle" />
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
</style>
