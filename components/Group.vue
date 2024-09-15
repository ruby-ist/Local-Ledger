<template>
  <div ref="group" class="m-12-0 p-20-25-22 w-188 relative border-rad-16
                          bg-gradient-background-color--background-shade">
    <h3 class="m-0-0-42-0" font="s-1.35em w-700">
      <span>₹</span>&nbsp;{{ amount }}
    </h3>
    <div font="s-0.9em w-500">
      {{ name }}
    </div>
    <button class="p-8 pointer centered-grid absolute b-14 r-14
                   bg-color-background-shade color-background-color"
            border="none rad-50p">
      <AddButtonIcon :color="color" class="w-16" />
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
