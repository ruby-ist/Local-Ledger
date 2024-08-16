<template>
  <div class="tag-color"></div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    color: String,
  },
  mounted() {
    this.$el.style.setProperty("--tag-color", `#${this.color}`);
  },
});
</script>

<style lang="scss">
.tag-color {
  --tag-color: #fff;

  width: 12px;
  height: 12px;
  background-color: var(--tag-color);
  display: inline-block;
  border-radius: 15%;
}
</style>
