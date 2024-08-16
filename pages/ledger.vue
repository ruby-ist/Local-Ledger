<template>
  <div class="ledgers">
    <Log
      key="1"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Breakfast"
      tag="Food"
      :amount="100"
      tagColor="5272f2"
    />
    <Log
      key="3"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="June Rent"
      tag="Rent"
      :amount="3250"
      tagColor="64CCC5"
    />
    <Log
      key="4"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Lunch"
      tag="Food"
      :amount="90"
      tagColor="9370db"
    />
    <Log
      key="5"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Snacks"
      tag="Food"
      :amount="50"
      tagColor="fee12b"
    />
    <Log
      key="6"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Stationary"
      tag="Food"
      :amount="300"
      tagColor="f4a460"
    />
    <Log
      key="7"
      timestamp="16-Aug-2024 : 9:47 AM"
      description="Others"
      tag="Food"
      :amount="40"
      tagColor="9370db"
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
    this.$emit("setTitle", "Ledger");
  },
});
</script>

<style lang="scss" scoped>
.ledgers {
  padding: 10px 0px 10px 26px;
  overflow: auto;
}
</style>
