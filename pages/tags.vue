<template>
  <div>
    <span>ToDo: Create Tags Component</span>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  emits: {
    setTitle(payload: string) {
      return payload.length > 0;
    },
  },

  mounted() {
    this.$emit("setTitle", "Tags");
  },
});
</script>
