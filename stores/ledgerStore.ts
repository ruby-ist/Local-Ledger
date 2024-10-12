export const useLedgerStore = defineStore('ledger', {
  state: () => ({
    logs: [] as LogWithTag[],
    showModal: false,
    currentLog: null as (null | LogWithTag),
  }),
  actions: {
    removeLog(id: number) {
      this.logs = this.logs.filter(log => (log.id !== id));
    },

    async updateLogs() {
      const logs = await db.logs.orderBy('createdAt').reverse().toArray();
      const tagIds = logs.map(log => log.tagId);
      const tags = await db.tags.where('id').anyOf(tagIds).toArray();

      this.logs = logs.map((log: Log): LogWithTag => ({
        id: log.id,
        description: log.description,
        amount: log.amount,
        createdAt: log.createdAt,
        tag: tags.find(tag => tag.id === log.tagId) as Tag,
      }));
    },
  },
});
