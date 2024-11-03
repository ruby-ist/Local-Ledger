<template>
  <div>
    <div class="w-100vw h-100vh absolute -t-94 l-0 z-9 bg-color-black opacity-0.8" @click="close" />
    <div ref="panel" class="w-55vw h-100vh absolute -t-94 l-0 z-10
                            bg-color-secondary-black p-125-30-30-40">
      <div class="mb-20">
        <label class="inline-block mb-14" font="w-600">Month</label>
        <input v-model="month" type="month"
               :max="currentMonth" :min="minimumMonth"
               class="block w-70p p-5-10 color-white bg-color-grey no-outline"
               border="0.5 solid color-black rad-5" font="s-1em">
      </div>
      <div class="mb-20">
        <label class="block mb-14" font="w-600">Range</label>
        <input v-model="amountMinimum" type="text" placeholder="From"
               class="w-35p inline-block mr-5p p-5-10 color-white bg-color-grey no-outline"
               border="0.5 solid color-black rad-5" font="s-1em"
               inputmode="numeric" pattern="\d+">
        <input v-model="amountMaximum" type="text" placeholder="To"
               class="w-35p inline-block p-5-10 color-white bg-color-grey no-outline"
               border="0.5 solid color-black rad-5" font="s-1em"
               inputmode="numeric" pattern="\d+">
      </div>
      <div class="mb-20">
        <label class="inline-block mb-14" font="w-600">Tags</label>
        <div v-for="tag in tags" :key="tag.id" class="mb-15" font="s-1em">
          <input ref="checkbox" type="checkbox"
                 class="mr-10 inline-block no-border"
                 @click="toggleTagId(tag.id!)">
          <label>{{ tag.name }}</label>
        </div>
      </div>
      <div class="pointer color-grey mb-24">
        <a class="inline-block mb-10" @click="unCheckAllTags">Unselect All</a>
        <span class="m-0-10">|</span>
        <a class="inline-block mb-10" @click="checkAllTags">Select All</a>
      </div>
      <div class="right-text">
        <button class="bg-color-white color-black no-border no-outline p-6-10 pointer"
                border="rad-4" font="w-500" @click="applyFilter">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    minimumMonth: '',
    month: '',
    amountMinimum: null,
    amountMaximum: null,
    tagIds: [] as number[],
  }),

  emits: ['closePanel'],

  computed: {
    currentMonth() {
      return this.formatDateToMonth(new Date());
    },

    ...mapState(useTagsStore, ['tags']),
  },

  methods: {
    applyFilter() {
      console.log(this.month, this.amountMaximum, this.amountMinimum, this.tagIds);
      // this.close();
    },

    checkAllTags() {
      this.tagIds = this.tags.map((tag: Tag) => tag.id!);
      (this.$refs.checkbox as HTMLInputElement[]).forEach(checkBox => checkBox.checked = true);
    },

    close() {
      gsap.to(this.$refs.panel as HTMLDivElement, {
        x: '-100%',
        duration: 0.3,
        onComplete: () => { this.$emit('closePanel'); },
      });
    },

    async setMinimumValueForMonth() {
      const records = await db.logs.orderBy('createdAt').limit(1).toArray();
      const oldestLog = records[0];
      if (oldestLog)
        this.minimumMonth = this.formatDateToMonth(new Date(oldestLog.createdAt));
      else
        this.minimumMonth = this.currentMonth;
    },

    formatDateToMonth(date: Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}`;
    },

    toggleTagId(id: number) {
      if (this.tagIds.includes(id)) {
        const index = this.tagIds.indexOf(id);
        this.tagIds.splice(index, 1);
      } else {
        this.tagIds.push(id);
      }
    },

    unCheckAllTags() {
      this.tagIds = [];
      (this.$refs.checkbox as HTMLInputElement[]).forEach(checkBox => checkBox.checked = false);
    },
  },

  async mounted() {
    gsap.from(this.$refs.panel as HTMLDivElement, {
      x: '-100%',
      duration: 0.5,
    });
    this.month = this.currentMonth;
    this.checkAllTags();
    await this.setMinimumValueForMonth();
  },
});
</script>
