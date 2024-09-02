<template>
  <div ref="group" class="group m-12-0 p-20-25-22">
    <h3 class="m-0-0-42-0">
      <span>₹</span>&nbsp;{{ amount }}
    </h3>
    <div class="fw-500">
      {{ name }}
    </div>
    <button class="p-8">
      <AddButtonIcon :color="color" />
    </button>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import { useColorStore } from '~/stores/colorStore';

export default defineNuxtComponent({
  props: {
    name: String,
    amount: Number,
    color: String,
  },

  methods: { ...mapActions(useColorStore, ['darkShade']) },

  mounted() {
    const component: HTMLDivElement = this.$refs.group as HTMLDivElement;

    if (component && this.color) {
      component.style.setProperty('--background-color', `#${this.color}`);
      component.style.setProperty(
        '--background-shade',
        `#${this.darkShade(this.color, 70)}`,
      );
    }
  },
});
</script>

<style lang="scss">
.group {
  border-radius: 16px;
  position: relative;
  width: 188px;
  background: linear-gradient(var(--background-color), var(--background-shade));

  h3 {
    font-size: 1.35em;
    font-weight: 700;
  }

  div {
    font-size: 0.9em;
  }

  button {
    border: none;
    position: absolute;
    bottom: 14px;
    right: 14px;
    background: var(--background-shade);
    border-radius: 50%;
    color: var(--background-color);
    display: grid;
    place-items: center;
    cursor: pointer;

    svg {
      width: 16px;
    }
  }
}
</style>
