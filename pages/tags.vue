<template>
  <div>
    <span class="absolute -t-70 r-30" font="s-2.5em" @click="openTagModal">+</span>
    <Tag v-for="tag in tags" :key="tag.id" :tag="tag" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    tags(): Tag[] {
      return this.tagsList.filter(tag => tag.id !== 1);
    },
    ...mapWritableState(useTagsStore, { tagsList: 'tags', showModal: 'showModal' }),
  },

  emits: {
    setTitle(payload: string) {
      return payload.length > 0;
    },
  },

  methods: {
    openTagModal() {
      this.showModal = true;
    },
    ...mapActions(useTagsStore, ['fetchTags']),
  },

  async mounted() {
    this.$emit('setTitle', 'Tags');
    await this.fetchTags();
  },
});
</script>
