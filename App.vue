<template>
  <div id="layout">
    <PageTitle />
    <div>
      <NuxtPage class="mr-96" />
      <VerticalNavBar />
    </div>
  </div>
</template>

<style>
:root {
  background: black;
  color: white;
  font-family: system-ui, sans-serif;
  -webkit-tap-highlight-color: transparent;
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
