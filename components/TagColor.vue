<template>
  <div class="tag-color h-12 w-12" />
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    color: String,
  },
  mounted() {
    this.$el.style.setProperty('--tag-color', `#${this.color}`);
  },
});
</script>

<style lang="scss">
.tag-color {
  --tag-color: #fff;

  background-color: var(--tag-color);
  display: inline-block;
  border-radius: 15%;
}
</style>
