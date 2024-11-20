<template>
  <div class="p-24-0-24-36 flex row align-center justify--space-between">
    <span font="s-1.3em w-500" class="w-48p hidden-overflow--x text-ellipsis">
      {{ tag.name }}
    </span>
    <div class="w-50p flex row align-center justify--space-around">
      <Badge ref="box" class="mr-10 h-20 w-20 pointer" :shade="50"
             :style="`--tag-color: ${tag.color}`" />
      <button class="no-bg no-outline no-border" @click="editTag">
        <EditIcon class="h-22 pointer" />
      </button>
      <button class="no-bg no-outline no-border" data-confirm="Are You Sure?" @click="destroyTag">
        <TrashIcon class="h-22 pointer" data-confirm="Are you sure?" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
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
    async destroyTag() {
      if (confirm('Are you sure?') && this.tag.id) await this.deleteTag(this.tag.id);
    },

    editTag() {
      this.currentTag = this.tag;
      this.showModal = true;
    },

    ...mapActions(useTagsStore, ['deleteTag']),
  },
});
</script>
