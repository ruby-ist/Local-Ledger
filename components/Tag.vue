<template>
  <div class="tags p-20-0-20-36 flex row align-center justify--space-between">
    <span font="s-1.3em w-500">{{ tag.name }}</span>
    <div class="w-50p flex row align-center justify--space-around">
      <TagColor class="mr-10 h-20 w-20 pointer" :color="tag.color" />
      <EditIcon class="h-22 pointer" />
      <TrashIcon class="h-22 pointer" @click="deleteTag" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import type { Tag } from '~/db';
import { db } from '~/db';
import { useTagsStore } from '~/stores/tagsStore';

export default defineNuxtComponent({
  props: {
    tag: Object as PropType<Tag>,
  },

  methods: {
    deleteTag() {
      db.tags.delete(this.tag.id);
      this.removeTag(this.tag.id);
    },
    ...mapActions(useTagsStore, ['removeTag']),
  },
});
</script>
