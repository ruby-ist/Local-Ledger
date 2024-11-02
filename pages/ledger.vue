<template>
  <div class="p-10-0-10-26 clip-overflow--x">
    <button class="no-border no-bg no-outlin absolute -t-56 r-28 pointer"
            @click="openFilter = true">
      <FilterIcon class="w-26" />
    </button>
    <Log v-for="log in logs" :key="log.id" :log="log" />
    <FilterPanel v-if="openFilter" @close-panel="openFilter = false" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    openFilter: false,
  }),

  computed: {
    ...mapWritableState(useLedgerStore, ['logs', 'showModal']),
  },

  emits: {
    setTitle(payload: string) {
      return payload.length > 0;
    },
  },

  methods: {
    ...mapActions(useLedgerStore, ['fetchLogs']),
  },

  async mounted() {
    this.$emit('setTitle', 'Ledger');
    await this.fetchLogs();
  },

  watch: {
    openFilter(value) {
      if (value)
        this.$emit('setTitle', 'Filters');
      else
        this.$emit('setTitle', 'Ledger');
    },
  },
});
</script>
