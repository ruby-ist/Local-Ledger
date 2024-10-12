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

    async fetchGroups(): Promise<Group[]> {
      const tally = this.logs.reduce((tally: Map<number, Group>, log: LogWithTag) => {
        if (tally.has(log.tag.id)) {
          (tally.get(log.tag.id) as Group).amount += log.amount;
        } else {
          tally.set(log.tag.id, { id: log.tag.id, amount: log.amount,
            name: log.tag.name, color: log.tag.color });
        }
        return tally;
      }, new Map<number, Group>());
      return Array.from(tally.values());
    },
  },
});
