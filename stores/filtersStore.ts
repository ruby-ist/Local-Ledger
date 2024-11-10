export type Filters = {
  amountMax: number | null;
  amountMin: number | null;
  startTime: number;
  endTime: number;
  tagIds: number[];
};

const now = new Date();
const startTime = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
const endTime = new Date(now.getFullYear(), now.getMonth() + 1, 0).setHours(23, 59, 59, 999);
const tags = await db.tags.toArray();

export const DefaultFilters: Filters = {
  amountMax: null as number | null,
  amountMin: null as number | null,
  tagIds: tags.map(tag => tag.id!),
  startTime, endTime,
};

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    filters: DefaultFilters,
    graphMonth: currentMonth,
  }),
});
