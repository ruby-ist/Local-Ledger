<template>
  <div class="menu-icon m-16-0 flex column align-center justify--space-around pointer"
       :class="{ active: name === title }">
    <slot />
    <span class="m-5-0 color-color" font="s-0.8em w-600">{{ name }}</span>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    name: String,
  },
  computed: {
    ...mapState(useHeaderStore, ['title']),
  },
});
</script>

<style>
.menu-icon {
  --color: var(--grey);

  path {
    fill: var(--color);
  }

  &.active, &:hover {
    --color: white;
  }
}
</style>
