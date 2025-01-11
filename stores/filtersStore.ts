export type Filters = {
  amountMax: number | null;
  amountMin: number | null;
  keyword: string | null;
  startTime: number;
  endTime: number;
  tagIds: number[];
};

const now = new Date();
const startTime = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
const endTime = new Date(now.getFullYear(), now.getMonth() + 1, 0).setHours(23, 59, 59, 999);
const tags = await db.tags.toArray();

export const DEFAULT_FILTERS: Filters = {
  amountMax: null as number | null,
  amountMin: null as number | null,
  keyword: null as string | null,
  tagIds: tags.map(tag => tag.id!),
  startTime, endTime,
};

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    filters: structuredClone(DEFAULT_FILTERS),
  }),
  getters: {
    filterApplied() {
      /* Another reason to hate javascript ^_^ */
      if (this.filters.amountMax) return true;
      else if (this.filters.amountMin) return true;
      else if (this.filters.startTime !== DEFAULT_FILTERS.startTime) return true;
      else if (this.filters.endTime !== DEFAULT_FILTERS.endTime) return true;
      else if (!DEFAULT_FILTERS.tagIds.every(id => this.filters.tagIds.includes(id))) return true;
      else if (this.filters.keyword) return true;
      else return false;
    },
  },
});
