<template>
  <div>
    <div class="w-100vw h-100vh absolute -t-94 l-0 z-9 bg-color-black opacity-0.8" @click="close" />
    <div id="filter_panel" ref="panel" class="w-55vw h-100vh absolute -t-94 l-0 z-10
                            bg-color-secondary-black pr-30 pl-40">
      <div class="mt-80 auto-overflow--y no-scroll-bar" style="height: calc(100% - 80px);">
        <div class="mb-60">
          <div class="right-text mb-20">
            <button class="bg-color-black color-white no-border no-outline p-6-10 pointer"
                    border="rad-4" font="w-500" @click="clearFilters">
              Clear
            </button>&ensp;
            <button class="bg-color-white color-black no-border no-outline p-6-10 pointer"
                    border="rad-4" font="w-500" @click="applyFilter">
              Apply
            </button>
          </div>
          <div class="mb-20">
            <label class="inline-block mb-14" font="w-600">Search</label><br>
            <input v-model="keyword"
                   type="text" placeholder="Description"
                   class="w-60p inline-block p-5-10 color-white bg-color-grey no-outline"
                   border="0.5 solid color-black rad-5" font="s-1em">
          </div>
          <div class="mb-20">
            <label class="block mb-14" font="w-600">Range</label>
            <input ref="amountMinInput" v-model="amountMinimum" type="text" placeholder="From"
                   class="w-35p inline-block mr-5p p-5-10 color-white bg-color-grey no-outline"
                   border="0.5 solid color-black rad-5" font="s-1em"
                   inputmode="numeric" pattern="\d*" data-error-message="Please enter a postive numeric value"
                   @invalid="setErrorMessage" @input="clearErrorMessage" @keydown.enter="removeFocus">
            <input ref="amountMaxInput" v-model="amountMaximum" type="text" placeholder="To"
                   class="w-35p inline-block p-5-10 color-white bg-color-grey no-outline"
                   border="0.5 solid color-black rad-5" font="s-1em"
                   inputmode="numeric" pattern="\d*" data-error-message="Please enter a postive numeric value"
                   @invalid="setErrorMessage" @input="clearErrorMessage" @keydown.enter="removeFocus">
          </div>
          <div class="mb-20">
            <label class="inline-block mb-14" font="w-600">Start Date</label>
            <input ref="startDateInput" v-model="startDate"
                   type="date" :max="currentDate"
                   :min="miniminDate" pattern="\d{4}-\d{2}-\d{2}"
                   class="block max-content p-7-10-5-10 color-white no-outline"
                   border="0.5 solid color-black rad-5" font="s-1em" required="true"
                   data-error-message="Please enter a valid date in YYYY-MM-DD format"
                   @invalid="setErrorMessage" @input="clearErrorMessage">
          </div>
          <div class="mb-20">
            <label class="inline-block mb-14" font="w-600">End Date</label>
            <input ref="endDateInput" v-model="endDate"
                   type="date" :max="currentDate"
                   :min="2022-12-12" pattern="\d{4}-\d{2}-\d{2}"
                   class="block max-content p-7-10-5-10 color-white no-outline"
                   border="0.5 solid color-black rad-5" font="s-1em" required="true"
                   data-error-message="Please enter a valid date in YYYY-MM-DD format"
                   @invalid="setErrorMessage" @input="clearErrorMessage">
          </div>
          <div>
            <label class="inline-block mb-14" font="w-600">Tags</label>
            <div v-for="tag in tags" :key="tag.id" class="mb-15" font="s-1em">
              <input ref="checkbox" type="checkbox"
                     class="mr-10 inline-block no-border"
                     :data-id="tag.id!"
                     checked @click="toggleTagId(tag.id!)">
              <label>{{ tag.name }}</label>
            </div>
          </div>
          <div class="pointer color-grey mb-24">
            <a class="inline-block mb-10" @click="unCheckAllTags">Unselect All</a>
            <span class="m-0-10">|</span>
            <a class="inline-block mb-10" @click="checkAllTags">Select All</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    keyword: '' as string | null,
    startDate: currentMonthStartDate,
    endDate: currentDate,
    amountMinimum: '' as string | null,
    amountMaximum: '' as string | null,
    tagIds: Array.from(DEFAULT_FILTERS.tagIds),
  }),

  emits: ['closePanel'],

  computed: {
    ...mapState(useTagsStore, ['tags']),
    ...mapWritableState(useFiltersStore, ['filters']),
  },

  methods: {
    async applyFilter() {
      if (!this.validFields()) return;

      const startTime = new Date(this.startDate).getTime();
      const endTime = new Date(this.endDate).setHours(23, 59, 59, 999);
      const amountMax = this.amountMaximum ? parseInt(this.amountMaximum) : null;
      const amountMin = this.amountMinimum ? parseInt(this.amountMinimum) : null;
      // escape special characters
      const keyword = this.keyword ? this.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : null;
      const tagIds = Array.from(this.tagIds);
      this.filters = { startTime, endTime, amountMax, amountMin, tagIds, keyword };
      await this.fetchLogs(this.filters);
      setTimeout(this.close, 375);
    },

    checkAllTags() {
      this.tagIds = this.tags.map((tag: Tag) => tag.id!);
      (this.$refs.checkbox as HTMLInputElement[]).forEach(checkBox => checkBox.checked = true);
    },

    async clearFilters() {
      this.filters = structuredClone(DEFAULT_FILTERS);
      this.startDate = currentMonthStartDate;
      this.endDate = currentDate;
      this.amountMaximum = null;
      this.amountMinimum = null;
      this.keyword = null;
      this.checkAllTags();
      await this.fetchLogs();
    },

    close() {
      gsap.to(this.$refs.panel as HTMLDivElement, {
        x: '-100%',
        duration: 0.3,
        onComplete: () => { this.$emit('closePanel'); },
      });
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

    validFields() {
      const { startDateInput, endDateInput, amountMinInput, amountMaxInput } = this.$refs as {
        startDateInput: HTMLInputElement;
        endDateInput: HTMLInputElement;
        amountMinInput: HTMLInputElement;
        amountMaxInput: HTMLInputElement;
      };
      return startDateInput.reportValidity()
        && endDateInput.reportValidity()
        && amountMinInput.reportValidity()
        && amountMaxInput.reportValidity();
    },

    ...mapActions(useLedgerStore, ['fetchLogs']),
  },

  async mounted() {
    gsap.set(this.$refs.panel as HTMLDivElement, { x: '-100%' });
    window.addEventListener('popstate', this.close);
  },

  beforeUnmount() {
    this.clearFilters();
    window.removeEventListener('popstate', this.close);
  },
});
</script>

<style scoped>
input[type="date"] {
  background: var(--grey);
}

@supports not (-moz-appearance: none) {
  input[type="date"] {
    appearance: none;
    background: var(--grey) url('~/assets/images/calendar-white.svg');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 24px 16px;
  }
}

input[type='text']::placeholder {
  color: var(--white);
}
</style>
