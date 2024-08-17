<template>
  <div>
    <Tag key="1" name="Food" color="5272f2" />
    <Tag key="2" name="Rent" color="64CCC5" />
    <Tag key="3" name="Snacks" color="9370db" />
    <Tag key="4" name="Other" color="fee12b" />
    <Tag key="5" name="Pending" color="f4a460" />
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
