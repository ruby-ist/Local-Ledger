<template>
  <div class="tags p-20-0-20-36 flex row align-center justify--space-between">
    <span font="s-1.3em w-500">{{ name }}</span>
    <div class="w-50p flex row align-center justify--space-around">
      <TagColor class="mr-10 h-20 w-20 pointer" :color="color" />
      <EditIcon class="h-22 pointer" />
      <TrashIcon class="h-22 pointer" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    color: String,
    name: String,
  },
});
</script>
