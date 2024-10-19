<template>
  <nav class="navbar p-22-12-22-20 flex column wrap
              justify--space-around fixed r-0 bg-color-secondary-black"
       border="rad-25-0-0-25">
    <NuxtLink to="graph">
      <MenuIcon name="Graph">
        <GraphIcon />
      </MenuIcon>
    </NuxtLink>
    <NuxtLink to="groups">
      <MenuIcon name="Groups" active>
        <GroupIcon />
      </MenuIcon>
    </NuxtLink>
    <NuxtLink to="ledger">
      <MenuIcon name="Ledger">
        <LedgerIcon />
      </MenuIcon>
    </NuxtLink>
    <NuxtLink to="tags">
      <MenuIcon name="Tags">
        <TagIcon />
      </MenuIcon>
    </NuxtLink>
    <NuxtLink to="settings">
      <MenuIcon name="Tweak">
        <SettingsIcon />
      </MenuIcon>
    </NuxtLink>
    <MenuIcon name="Add" @click="openLogModal">
      <AddIcon />
    </MenuIcon>
  </nav>
</template>

<script lang="ts">
export default defineComponent({
  computed: {
    ...mapWritableState(useLedgerStore, ['showModal']),
  },

  methods: {
    openLogModal() {
      this.showModal = true;
    },
  },
});
</script>

<style scoped lang="scss">
nav {
  bottom: calc(50% - 94px);
  transform: translateY(calc(50% - 47px));
}
</style>
