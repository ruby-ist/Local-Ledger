<template>
  <div class="settings pl-36 pr-20">
    <div>
      <div class="option">
        <div class="name">
          Currency Symbol
        </div>
        <div class="value">
          ₹
        </div>
      </div>
      <div class="option">
        <div class="name">
          Duration
        </div>
        <div class="value">
          Per month
        </div>
      </div>
      <div class="option">
        <div class="name">
          Target
        </div>
        <div class="value">
          12000
        </div>
      </div>
    </div>

    <div class="h-50 flex column align-flex-end justify--space-around">
      <EditIcon class="w-22" />
      <span font="s-0.8em">Edit</span>
    </div>
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
    this.$emit('setTitle', 'Settings');
  },
});
</script>

<style lang="scss" scoped>
.settings {
  .option {
    // ToDo: make it Uno class
    margin: 24px 0;

    .name {
      // ToDo: make it Uno class
      margin-bottom: 8px;
      font-size: 0.8em;
    }

    .value {
      // ToDo: make it Uno class
      font-size: 1.3em;
      font-weight: 500;
    }
  }
}
</style>
