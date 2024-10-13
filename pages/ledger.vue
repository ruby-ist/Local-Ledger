<template>
  <div class="p-10-0-10-26 clip-overflow--x">
    <Log v-for="log in logs" :key="log.id" :log="log" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
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
});
</script>
