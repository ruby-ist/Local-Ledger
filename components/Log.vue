<template>
  <div class="log">
    <div class="col-1">
      <div class="timestamp">{{ timestamp }}</div>
      <h3 class="description">{{ description }}</h3>
      <div class="tag"><TagColor :color="tagColor" />&ensp;{{ tag }}</div>
    </div>
    <div class="col-2">
      <ThreeDotsIcon height="20px" />
      <div class="amount"><span>₹</span>&ensp;{{ amount }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    description: String,
    tag: String,
    amount: Number,
    timestamp: String,
    tagColor: String,
  },
});
</script>

<style lang="scss" scoped>
.log {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid #535353;

  .col-2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }

  .timestamp {
    font-size: 0.6em;
  }

  .description {
    margin: 15px 0 30px;
    font-weight: 600;
  }

  .tag {
    font-size: 0.8em;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
  }

  .amount {
    font-weight: 700;
  }
}
</style>
