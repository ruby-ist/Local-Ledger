<template>
  <div class="groups">
    <Group key="1" name="Food" :amount="1650" color="5272F2" />
    <Group key="2" name="Rent" :amount="3250" color="64CCC5" />
    <Group key="3" name="Food" :amount="1650" color="9370db" />
    <Group key="4" name="Rent" :amount="3250" color="f4a460" />
    <Group key="5" name="Rent" :amount="3250" color="fee12b" />
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
    this.$emit("setTitle", "Groups");
  },
});
</script>

<style lang="scss">
.groups {
  display: flex;
  flex-flow: column;
  padding: 20px 0 20px 8%;
}
</style>
