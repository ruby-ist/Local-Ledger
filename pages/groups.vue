<template>
  <div class="p-20-0-20-8p flex column">
    <Group v-for="group in groups"
           :key="group.id" :name="group.name"
           :amount="group.amount" :color="group.color" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    groups: [] as Group[],
  }),

  emits: {
    setTitle(payload: string) {
      return payload.length > 0;
    },
  },

  computed: {
    ...mapState(useLedgerStore, ['logs']),
  },

  methods: {
    ...mapActions(useLedgerStore, ['fetchGroups', 'updateLogs']),
  },

  async mounted() {
    this.$emit('setTitle', 'Groups');
    await this.updateLogs();
  },

  watch: {
    async logs() {
      this.groups = await this.fetchGroups();
    },
  },
});
</script>
