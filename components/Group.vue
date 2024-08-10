<template>
  <div ref="group" class="group">
    <h3><span>₹</span>&nbsp;{{ amount }}</h3>
    <div class="fw-500">{{ name }}</div>
    <button><AddButtonIcon :color="color" /></button>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    name: String,
    amount: Number,
    color: String,
  },

  methods: {
    darkenHexColor(percentage: number): string {
      let hex = this.color || "";
      if (hex.length !== 6) {
        throw new Error("Invalid hex color.");
      }

      // Convert hex to RGB
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);

      // Darken each component by the percentage
      r = Math.floor(r * (1 - percentage / 100));
      g = Math.floor(g * (1 - percentage / 100));
      b = Math.floor(b * (1 - percentage / 100));

      // Ensure values are within valid range
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));

      return `${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    },
  },

  mounted() {
    const component: HTMLDivElement = this.$refs.group as HTMLDivElement;

    if (component) {
      component.style.setProperty("--background-color", `#${this.color}`);
      component.style.setProperty(
        "--background-shade",
        `#${this.darkenHexColor(70)}`,
      );
    }
  },
});
</script>

<style lang="scss">
.group {
  margin: 12px 0;
  border-radius: 16px;
  padding: 20px 25px 22px;
  position: relative;
  width: 188px;
  background: linear-gradient(var(--background-color), var(--background-shade));

  h3 {
    margin: 0 0 42px 0;
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
    padding: 8px;
    cursor: pointer;

    svg {
      width: 16px;
    }
  }
}
</style>
