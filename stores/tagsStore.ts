export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [] as Tag[],
    showModal: false,
    currentTag: null as (null | Tag),
  }),
  actions: {
    async deleteTag(id: number) {
      const index = this.tags.findIndex(tag => (tag.id === id));
      await db.tags.delete(id);
      this.tags.splice(index, 1);
    },

    async fetchTags() {
      this.tags = await db.tags.toArray();
    },

    async updateTag(tag: Tag) {
      const index = this.tags.findIndex(item => (item.id === tag.id));
      await db.tags.put(tag);
      this.tags.splice(index, 1, tag);
    },

    async addTag(name: string, color: string) {
      const id = await db.tags.add({ name: name, color: color });
      this.tags.push({ id: id, name: name, color: color });
    },
  },
});
