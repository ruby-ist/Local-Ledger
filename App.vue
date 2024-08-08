<template>
  <div id="main">
    <PageTitle />
    <NuxtPage class="mr-80" />
    <VerticalNavBar />
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

  #main {
    overflow: hidden;
    height: 100vh;
  }
}
</style>
