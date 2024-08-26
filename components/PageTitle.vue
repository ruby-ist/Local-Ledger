<template>
  <div class="ml-36">
    <h1 class="fw-800 pt-28 pb-28 m-0">
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
