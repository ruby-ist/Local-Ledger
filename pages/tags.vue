<template>
  <div>
    <Tag v-for="tag in tags" :key="tag.id" :tag="tag" />
  </div>
</template>

<script lang="ts">
import { mapWritableState } from 'pinia';
import { db } from '~/db';
import { useTagsStore } from '~/stores/tagsStore';

export default defineNuxtComponent({
  computed: {
    ...mapWritableState(useTagsStore, ['tags']),
  },

  emits: {
    setTitle(payload: string) {
      return payload.length > 0;
    },
  },

  async mounted() {
    this.$emit('setTitle', 'Tags');
    this.tags = await db.tags.toArray();
  },
});
</script>
