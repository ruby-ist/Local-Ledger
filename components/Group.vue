<template>
  <div ref="group" class="m-12-0 p-20-25-22 w-188 relative border-rad-16
                          bg-gradient-background-color--background-shade">
    <h3 class="m-0-0-42-0" font="s-1.35em w-700">
      <span>{{ currencySymbol }}</span>&nbsp;{{ group.amount }}
    </h3>
    <a font="s-0.9em w-500 block color-white pointer" @click="applyFilter">
      {{ group.name }}
    </a>
    <button class="p-8 pointer centered-grid absolute b-14 r-14
                   bg-color-background-shade color-background-color"
            border="none rad-50p" @click="openLogModal">
      <AddButtonIcon :color="group.color" class="w-16" />
    </button>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    group: {
      type: Object as PropType<Group>,
      required: true,
    },
  },

  computed: {
    ...mapState(useSettingsStore, { currencySymbol: 'currency' }),
    ...mapWritableState(useLedgerStore, ['showModal', 'selectedTag']),
    ...mapWritableState(useFiltersStore, ['filters']),
  },

  methods: {
    openLogModal() {
      const { name, color, id } = this.group;
      this.selectedTag = { name, color, id };
      this.showModal = true;
    },

    applyFilter() {
      this.filters = structuredClone(DEFAULT_FILTERS);
      this.filters.tagIds = [this.group.id];
      // @ts-expect-error nuxt type checking is broken
      this.$router.push('/ledger');
    },
    ...mapActions(useColorsStore, ['darkShade']),
  },

  mounted() {
    const component: HTMLDivElement = this.$refs.group as HTMLDivElement;
    component.style.setProperty('--background-color', this.group.color);
    component.style.setProperty('--background-shade', this.darkShade(this.group.color, 60));
  },
});
</script>
