<template>
  <div class="tags p-20-0-20-36 flex row align-center justify--space-between">
    <span font="s-1.3em w-500">{{ tag.name }}</span>
    <div class="w-50p flex row align-center justify--space-around">
      <TagColor ref="box" class="mr-10 h-20 w-20 pointer"
                :style="`--tag-color: ${tag.color}`"
                :color="tag.color" />
      <button class="no-bg no-outline no-border" @click="editTag">
        <EditIcon class="h-22 pointer" />
      </button>
      <button class="no-bg no-outline no-border" data-confirm="Are You Sure?" @click="deleteTag">
        <TrashIcon class="h-22 pointer" data-confirm="Are you sure?" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapWritableState } from 'pinia';
import type { Tag } from '~/db';
import { db } from '~/db';
import { useTagsStore } from '~/stores/tagsStore';

export default defineNuxtComponent({
  props: {
    tag: {
      type: Object as PropType<Tag>,
      required: true,
    },
  },

  computed: {
    ...mapWritableState(useTagsStore, ['showModal', 'currentTag']),
  },

  methods: {
    deleteTag() {
      if (confirm('Are you sure?') && this.tag) {
        db.tags.delete(this.tag.id);
        this.removeTag(this.tag.id);
      }
    },

    editTag() {
      this.currentTag = this.tag;
      this.showModal = true;
    },

    ...mapActions(useTagsStore, ['removeTag']),
  },
});
</script>
