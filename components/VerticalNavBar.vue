<template>
  <nav class="navbar p-22-12-22-20">
    <MenuIcon name="Graph">
      <GraphIcon />
    </MenuIcon>
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
import { gsap } from 'gsap';

export default defineComponent({
  methods: {
    openLogModal() {
      gsap.to('#new_log_modal', { height: '100%', display: 'flex', duration: 0.5 });
    },
  },
});
</script>

<style scoped lang="scss">
nav {
  display: flex;
  flex-flow: column wrap;
  background: #121212;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  position: fixed;
  right: 0;
  bottom: calc(50% - 94px);
  transform: translateY(calc(50% - 47px));
  justify-content: space-around;
}
</style>
