export const useLedgerStore = defineStore('ledger', {
  state: () => ({
    logs: [] as Log[],
    showModal: false,
    currentLog: null as (null | Log),
    selectedTag: null as (null | Tag),
  }),
  actions: {
    async addLog(newLog: LogWithTagId) {
      const id = await db.logs.add(newLog);
      const tag = await db.tags.get(newLog.tagId) as Tag;
      const { description, amount, createdAt } = newLog;
      this.logs.unshift({ description, amount, createdAt, tag, id });
    },

    async deleteLog(id: number) {
      const index = this.logs.findIndex(log => (log.id === id));
      await db.logs.delete(id);
      this.logs.splice(index, 1);
    },

    applyAmountFilters(query: DexieLogQuery, amountMax: number | null, amountMin: number | null) {
      if (amountMin && amountMax) {
        query.and(log => amountMin <= log.amount && log.amount <= amountMax);
      } else if (amountMin) {
        query.and(log => amountMin <= log.amount);
      } else if (amountMax) {
        query.and(log => log.amount <= amountMax);
      }
    },

    applyTagsFilter(query: DexieLogQuery, tagIds: number[] | null) {
      if (tagIds) {
        query.and(log => tagIds.includes((log as LogWithTagId).tagId));
      }
    },

    async queryData(filters: Filters): Promise<Log[]> {
      const { startTime, endTime, amountMin, amountMax, tagIds } = filters;
      const query = db.logs.where('createdAt').between(startTime, endTime);
      this.applyAmountFilters(query, amountMax, amountMin);
      this.applyTagsFilter(query, tagIds);
      const logs = await query.toArray();
      logs.sort((a, b) => b.createdAt - a.createdAt);

      return logs;
    },

    async fetchLogs(filters: Filters = DefaultFilters) {
      const logs = await this.queryData(filters);
      const tagsStore = useTagsStore();
      await tagsStore.fetchTags();

      this.logs = logs.map((log: Log): Log => {
        const { description, amount, createdAt, id } = log;
        const tag = tagsStore.tags.find(tag => tag.id === (log as LogWithTagId).tagId) as Tag;
        return { description, amount, createdAt, tag, id };
      });
    },

    async putLog(log: Log) {
      const index = this.logs.findIndex(item => (item.id === log.id));
      await db.logs.put(log);
      const { description, amount, createdAt, id } = log;
      const tag = await db.tags.get((log as LogWithTagId).tagId) as Tag;
      this.logs.splice(index, 1, { description, amount, createdAt, tag: tag, id });
      this.logs.sort((a, b) => (b.createdAt - a.createdAt));
    },

    async fetchGroups(): Promise<Group[]> {
      const tally = this.logs.reduce((tally: Map<number, Group>, log: Log) => {
        log = log as LogWithTag;
        const tagId = log.tag.id as number;

        if (tally.has(tagId)) {
          (tally.get(tagId) as Group).amount += log.amount;
        } else {
          const { name, color } = log.tag;
          tally.set(tagId, { id: tagId, name, color, amount: log.amount });
        }
        return tally;
      }, new Map<number, Group>());
      return Array.from(tally.values());
    },
  },
});
