<template>
  <div class="p-10-0-10-26 clip-overflow--x">
    <FilterPanel v-show="openFilter" @close-panel="openFilter = false" />
    <Log v-for="log in logs" :key="log.id" :log="log" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    openFilter: false,
  }),

  computed: {
    ...mapWritableState(useLedgerStore, ['logs', 'showModal']),
    ...mapWritableState(useHeaderStore, ['title', 'headerButton', 'headerButtonCallBack']),
    ...mapState(useFiltersStore, ['filters']),
  },

  methods: {
    ...mapActions(useLedgerStore, ['fetchLogs']),
  },

  async mounted() {
    this.title = 'Ledger';
    this.headerButton = 'Filter';
    this.headerButtonCallBack = () => {
      this.openFilter = true;
    };
    await this.fetchLogs(this.filters);
  },

  beforeUnmount() {
    this.headerButton = null;
    this.headerButtonCallBack = () => {};
  },

  watch: {
    openFilter(value) {
      if (value) {
        gsap.to('#filter_panel', {
          x: 0,
          duration: 0.5,
        });
        this.title = 'Filters';
      } else {
        this.title = 'Ledger';
      }
    },
  },
});
</script>
