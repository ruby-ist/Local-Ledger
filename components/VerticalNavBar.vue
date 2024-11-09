<template>
  <nav class="navbar p-22-12-22-20 flex column wrap
              justify--space-around fixed r-0 bg-color-secondary-black"
       border="rad-25-0-0-25">
    <NuxtLink to="graph">
      <MenuIcon name="Graph">
        <GraphIcon class="w-22" />
      </MenuIcon>
    </NuxtLink>
    <NuxtLink to="groups">
      <MenuIcon name="Groups">
        <GroupIcon class="w-22" />
      </MenuIcon>
    </NuxtLink>
    <NuxtLink to="ledger">
      <MenuIcon name="Ledger">
        <LedgerIcon class="w-22" />
      </MenuIcon>
    </NuxtLink>
    <NuxtLink to="tags">
      <MenuIcon name="Tags">
        <TagIcon class="w-22" />
      </MenuIcon>
    </NuxtLink>
    <NuxtLink to="settings">
      <MenuIcon name="Tweak">
        <SettingsIcon class="w-22" />
      </MenuIcon>
    </NuxtLink>
    <MenuIcon name="Add" @click="showModal = true">
      <AddIcon class="w-22" />
    </MenuIcon>
  </nav>
</template>

<script lang="ts">
export default defineComponent({
  computed: {
    ...mapWritableState(useLedgerStore, ['showModal']),
  },
});
</script>

<style scoped>
nav {
  bottom: calc(50% - 94px);
  transform: translateY(calc(50% - 47px));
}
</style>
