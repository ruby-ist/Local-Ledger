<template>
  <div class="h-12 w-12 inline-block border-rad-15p bg-color-tag-color" />
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    color: String,
  },
  mounted() {
    this.$el.style.setProperty('--tag-color', this.color);
  },
});
</script>
