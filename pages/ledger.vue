<template>
  <div class="p-10-0-10-26 clip-overflow--x">
    <Log
      key="1"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Breakfast"
      tag="Food"
      :amount="100"
      tag-color="5272f2"
    />
    <Log
      key="3"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="June Rent"
      tag="Rent"
      :amount="3250"
      tag-color="64CCC5"
    />
    <Log
      key="4"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Lunch"
      tag="Food"
      :amount="90"
      tag-color="9370db"
    />
    <Log
      key="5"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Snacks"
      tag="Food"
      :amount="50"
      tag-color="fee12b"
    />
    <Log
      key="6"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Stationary"
      tag="Food"
      :amount="300"
      tag-color="f4a460"
    />
    <Log
      key="7"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Others"
      tag="Food"
      :amount="40"
      tag-color="9370db"
    />
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
    this.$emit('setTitle', 'Ledger');
  },
});
</script>
