<template>
  <div class="tags p-20-0-20-36">
    <span class="name">{{ name }}</span>
    <div class="icons w-50per">
      <TagColor class="mr-10 h-20 w-20" :color="color" />
      <EditIcon class="h-22" />
      <TrashIcon class="h-22" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    color: String,
    name: String,
  },
});
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .icons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    svg {
      cursor: pointer;
    }
  }

  .name {
    font-size: 1.3em;
    font-weight: 500;
  }
}
</style>
