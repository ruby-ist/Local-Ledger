import type { Tag } from '~/db';
import { db } from '~/db';

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [] as Tag[],
    showModal: false,
    currentTag: null as (null | Tag),
  }),
  actions: {
    removeTag(id: number) {
      this.tags = this.tags.filter(tag => (tag.id !== id));
    },

    async updateTags() {
      this.tags = await db.tags.toArray();
    },
  },
});
