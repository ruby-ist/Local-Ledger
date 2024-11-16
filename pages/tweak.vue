<template>
  <div class="settings pl-36">
    <Settings />
    <DataTransferOptions />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    ...mapWritableState(useHeaderStore, ['title']),
  },

  mounted() {
    this.title = 'Tweak';
  },
});
</script>
