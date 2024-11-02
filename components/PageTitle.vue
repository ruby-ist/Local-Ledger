<template>
  <div class="ml-36">
    <h1 class="p-28-0 m-0 relative z-11 max-content" font="w-800">
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
