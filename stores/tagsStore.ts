import type { Tag } from '~/db';

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [] as Tag[],
  }),
  actions: {
    removeTag(id: number) {
      this.tags = this.tags.filter(tag => (tag.id !== id));
    },
  },
});
