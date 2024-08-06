<template>
  <div class="menu-icon" :class="{ active: active }">
    <slot />
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    name: String,
    active: Boolean,
  },
});
</script>

<style lang="scss">
.menu-icon {
  --color: #585858;

  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  margin: 15px 0;

  svg path {
    fill: var(--color);
  }

  span {
    color: var(--color);
    font-size: 0.65em;
    font-weight: 600;
    margin: 5px 0;
  }

  &.active {
    --color: white;
  }
}
</style>
