<template>
  <div class="p-20-0-20-8p flex column">
    <Group v-for="group in groups" :key="group.id" :group="group" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    groups: [] as Group[],
  }),

  computed: {
    ...mapState(useLedgerStore, ['logs']),
    ...mapWritableState(useHeaderStore, ['title']),
  },

  methods: {
    ...mapActions(useLedgerStore, ['fetchGroups', 'fetchLogs']),
  },

  async mounted() {
    this.title = 'Groups';
    await this.fetchLogs();
  },

  watch: {
    logs: {
      async handler() {
        this.groups = await this.fetchGroups();
      },
      deep: true,
    },
  },
});
</script>
