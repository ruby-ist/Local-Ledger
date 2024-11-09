<template>
  <header class="flex row justify--space-between w-100p align-center">
    <h1 class="p-28-0-28-36 m-0 relative z-11 max-content" font="w-800">
      {{ title }}
    </h1>
    <button v-if="headerButton" class="no-border no-bg no-outline mr-30 pointer" @click="headerButtonCallBack">
      <FilterIcon v-if="headerButton === 'Filter'" class="w-24" />
      <PlusIcon v-if="headerButton === 'Add'" class="w-20" />
      <CloseIcon v-if="headerButton === 'Close'" class="w-20 mt-4" />
    </button>
  </header>
</template>

<script lang="ts">
export default defineNuxtComponent({
  computed: {
    ...mapState(useHeaderStore, ['title', 'headerButton', 'headerButtonCallBack']),
  },
});
</script>
