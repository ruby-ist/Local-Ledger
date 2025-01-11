<template>
  <header class="flex row justify--space-between w-100p align-center">
    <h1 class="p-28-0-28-36 m-0 relative z-11 max-content" font="w-800">
      {{ title }}
    </h1>
    <div v-if="filterApplied" class="absolute r-82 color-grey" font="s-1.25rem w-600">Total:&ensp;{{ currency }}{{ total }}</div>
    <button v-if="headerButton" class="no-border no-bg no-outline mr-30 pointer" @click="headerButtonCallBack">
      <FilterIcon v-if="headerButton === 'Filter'" class="w-24" />
      <PlusIcon v-if="headerButton === 'Add'" class="w-20" />
      <CloseIcon v-if="headerButton === 'Close'" class="w-20 mt-4" />
    </button>
  </header>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    total: 0,
  }),
  computed: {
    ...mapState(useHeaderStore, ['title', 'headerButton', 'headerButtonCallBack']),
    ...mapState(useLedgerStore, ['logs']),
    ...mapState(useSettingsStore, ['currency']),
    ...mapState(useFiltersStore, ['filterApplied']),
  },
  watch: {
    logs(value) {
      if (this.filterApplied && this.headerButton === 'Filter') {
        this.total = value.reduce((acc: number, log: Log) => acc + log.amount, 0);
      }
    },
  },
});
</script>
