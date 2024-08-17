<template>
  <div class="tags">
    <span class="name">{{ name }}</span>
    <div class="icons">
      <TagColor class="color" :color="color" />
      <EditIcon />
      <TrashIcon />
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
  padding: 20px 0 20px 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .icons {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    svg {
      cursor: pointer;
      height: 22px;
    }
  }

  .name {
    font-size: 1.3em;
    font-weight: 500;
  }

  .color {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}
</style>
