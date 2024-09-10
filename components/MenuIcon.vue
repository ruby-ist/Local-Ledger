<template>
  <div class="menu-icon m-16-0 flex column align-center justify--space-around pointer"
       :class="{ active: active }" @click="markAsActive">
    <slot />
    <span class="m-5-0" font="s-0.8em w-600">{{ name }}</span>
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

  svg {
    width: 22px;

    path {
      fill: var(--color);
    }
  }

  span {
    color: var(--color);
  }

  &.active,
  &:hover {
    --color: white;
  }
}
</style>
