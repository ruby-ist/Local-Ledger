<template>
  <div class="legend m-12-10 flex align-center">
    <Badge v-if="enabled" class="w-15 h-15 mr-10 pointer" :shade="45" border="rad-3"
           :style="`--tag-color: ${tag.color}`" @click="toggleCurrentLegend" />
    <div v-else class="w-15 h-15 bg-color-grey inline-block mr-10 pointer" border="rad-3"
         @click="toggleCurrentLegend" />
    <span :class="{ 'color-grey': !enabled }" class="max-content ws-nowrap hidden-overflow--x text-ellipsis">
      {{ tag.name }}
    </span>
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

<style scoped>
.legend {
  width: calc(50% - 20px);
}
</style>
