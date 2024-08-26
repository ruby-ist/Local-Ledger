<template>
  <div class="menu-icon" :class="{ active: active }" @click="markAsActive">
    <slot />
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    name: String,
    active: Boolean,
  },
  methods: {
    markAsActive(event: MouseEvent) {
      document.querySelector('.menu-icon.active')?.classList.remove('active');
      (event.currentTarget as HTMLDivElement).classList.add('active');
    },
  },
});
</script>

<style lang="scss">
.menu-icon {
  --color: #535353;

  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  margin: 16px 0;

  svg {
    width: 22px;

    path {
      fill: var(--color);
    }
  }

  span {
    color: var(--color);
    font-size: 0.8em;
    font-weight: 600;
    margin: 5px 0;
  }

  &.active,
  &:hover {
    --color: white;
  }
}
</style>
