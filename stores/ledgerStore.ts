export const useLedgerStore = defineStore('ledger', {
  state: () => ({
    logs: [] as Log[],
    showModal: false,
    currentLog: null as (null | Log),
  }),
  actions: {
    async addLog(description: string, amount: number, tagId: number) {
      const createdAt = Date.now();
      const newLog: Log = { description: description, amount: amount,
                            tagId: tagId, createdAt: createdAt };
      const id = await db.logs.add(newLog);
      const tag = await db.tags.get(tagId) as Tag;
      this.logs.unshift({ description: description, amount: amount,
                          createdAt: createdAt, tag: tag, id: id });
    },

    async deleteLog(id: number) {
      const index = this.logs.findIndex(log => (log.id === id));
      await db.logs.delete(id);
      this.logs.splice(index, 1);
    },

    async fetchLogs() {
      const logs = await db.logs.orderBy('createdAt').reverse().toArray();
      const tagIds = logs.map(log => (log as LogWithTagId).tagId);
      const tags = await db.tags.where('id').anyOf(tagIds).toArray();

      this.logs = logs.map((log: Log): Log => ({
        description: log.description,
        amount: log.amount,
        createdAt: log.createdAt,
        tag: tags.find(tag => tag.id === (log as LogWithTagId).tagId) as Tag,
        id: log.id as number,
      }));
    },

    async putLog(log: Log) {
      const index = this.logs.findIndex(item => (item.id === log.id));
      await db.logs.put(log);
      const { description, amount, createdAt, id } = log;
      const tag = await db.tags.get((log as LogWithTagId).tagId) as Tag;
      this.logs.splice(index, 1, { description: description, amount: amount,
                                   createdAt: createdAt, tag: tag, id: id });
    },

    async fetchGroups(): Promise<Group[]> {
      const tally = this.logs.reduce((tally: Map<number, Group>, log: Log) => {
        log = log as LogWithTag;
        const tagId = log.tag.id as number;

        if (tally.has(tagId)) {
          (tally.get(tagId) as Group).amount += log.amount;
        } else {
          tally.set(tagId, { id: tagId, amount: log.amount,
                             name: log.tag.name, color: log.tag.color });
        }
        return tally;
      }, new Map<number, Group>());
      return Array.from(tally.values());
    },
  },
});
