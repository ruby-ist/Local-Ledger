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

    <div class="edit-settings">
      <EditIcon />
      <span>Edit</span>
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
      font-size: 0.8em;
      // ToDo: make it Uno class
      margin-bottom: 8px;
    }

    .value {
      font-size: 1.3em;
      font-weight: 500;
    }
  }

  .edit-settings {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: space-around;
    height: 50px;

    svg {
      width: 22px;
    }

    span {
      font-size: 0.8em;
    }
  }
}
</style>
