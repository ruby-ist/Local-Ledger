<template>
  <div ref="badge" class="h-12 w-12 inline-block border-rad-15p bg-gradient-135deg-tag-color--shade" />
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    shade: {
      type: Number,
      required: true,
    },
  },

  methods: {
    setGradientColor() {
      const color = getComputedStyle(this.$el).getPropertyValue('--tag-color');
      this.$el.style.setProperty('--shade', this.darkShade(color, this.shade));
    },

    ...mapActions(useColorStore, ['darkShade']),
  },

  mounted() {
    this.setGradientColor();
  },

  updated() {
    this.setGradientColor();
  },
});
</script>
