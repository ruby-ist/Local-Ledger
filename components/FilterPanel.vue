<template>
  <div>
    <div class="w-100vw h-100vh absolute -t-94 l-0 z-9 bg-color-black opacity-0.8" @click="close" />
    <div ref="panel" class="w-55vw h-100vh absolute -t-94 l-0 z-10
                            bg-color-secondary-black p-125-30-30-40">
      <div class="mb-20">
        <label class="inline-block mb-14" font="w-600">Month</label>
        <input type="month" placeholder="Nov 2024"
               class="block w-70p p-5-10 color-white bg-color-grey no-outline"
               border="0.5 solid color-black rad-5" font="s-1em">
      </div>
      <div class="mb-20">
        <label class="block mb-14" font="w-600">Range</label>
        <input type="text" placeholder="From"
               class="w-35p inline-block mr-5p p-5-10 color-white bg-color-grey no-outline"
               border="0.5 solid color-black rad-5" font="s-1em"
               inputmode="numeric" pattern="\d+">
        <input type="text" placeholder="To"
               class="w-35p inline-block p-5-10 color-white bg-color-grey no-outline"
               border="0.5 solid color-black rad-5" font="s-1em"
               inputmode="numeric" pattern="\d+">
      </div>
      <div class="mb-20">
        <label class="block mb-14" font="w-600">Tags</label>
        <div v-for="tag in tags" :key="tag.id" class="mb-15" font="s-1em">
          <input type="checkbox" :value="tag.id" checked class="mr-10 inline-block no-border">
          <label>{{ tag.name }}</label>
        </div>
      </div>
      <div class="right-text">
        <button class="bg-color-white color-black no-border no-outline p-6-10 pointer"
                border="rad-4" font="w-500" @click="close">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    tags: [
      { id: 1, name: 'Food' },
      { id: 2, name: 'Snacks' },
      { id: 3, name: 'Rent' },
      { id: 4, name: 'Grocery' },
      { id: 5, name: 'Pending' },
    ],
  }),

  emits: ['closePanel'],

  methods: {
    close() {
      gsap.to(this.$refs.panel as HTMLDivElement, {
        x: '-100%',
        duration: 0.3,
        onComplete: () => { this.$emit('closePanel'); },
      });
    },
  },

  mounted() {
    gsap.from(this.$refs.panel as HTMLDivElement, {
      x: '-100%',
      duration: 0.5,
    });
  },
});
</script>
