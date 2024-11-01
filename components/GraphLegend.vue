<template>
  <div class="m-15-10 w-90 flex align-center">
    <Badge v-if="enabled" class="w-20 h-20 mr-10 pointer" :shade="50" border="rad-3"
           :style="`--tag-color: ${tag.color}`" @click="toggleCurrentLegend" />
    <div v-else class="w-20 h-20 bg-color-grey inline-block mr-10 pointer" border="rad-3"
         @click="toggleCurrentLegend" />
    <span :class="{ 'color-grey': !enabled }">{{ tag.name }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    tag: {
      type: Object as PropType<Tag>,
      required: true,
    },
  },
  emits: {
    toggleLegend(payload: string) {
      return payload.length > 0;
    },
  },
  data: () => ({
    enabled: true,
  }),
  methods: {
    toggleCurrentLegend() {
      this.enabled = !this.enabled;
      this.$emit('toggleLegend', this.tag.name);
    },
  },
};
</script>
