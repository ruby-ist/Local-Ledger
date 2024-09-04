<template>
  <div class="ml-36">
    <h1 class="fw-800 p-28-0 m-0">
      {{ title }}
    </h1>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    title: String,
  },
});
</script>
