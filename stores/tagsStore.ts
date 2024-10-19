export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [] as Tag[],
    showModal: false,
    currentTag: null as (null | Tag),
  }),
  actions: {
    async addTag(name: string, color: string) {
      const id = await db.tags.add({ name: name, color: color });
      this.tags.push({ name: name, color: color, id: id });
    },

    async fetchTags() {
      this.tags = await db.tags.toArray();
    },

    async putTag(tag: Tag) {
      const index = this.tags.findIndex(item => (item.id === tag.id));
      await db.tags.put(tag);
      this.tags.splice(index, 1, tag);
    },

    async deleteTag(id: number) {
      const index = this.tags.findIndex(tag => (tag.id === id));
      // @ts-expect-error dexie type mismatch
      await db.logs.where('tagId').equals(id).modify({ tagId: 1 });
      await db.tags.delete(id);
      this.tags.splice(index, 1);
    },
  },
});
