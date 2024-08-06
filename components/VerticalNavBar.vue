<template>
  <nav class="navbar pl-20">
    <MenuIcon name="Graph"><GraphIcon /></MenuIcon>
    <MenuIcon name="Filters" active><FilterIcon /></MenuIcon>
    <MenuIcon name="Ledger"><LedgerIcon /></MenuIcon>
    <MenuIcon name="Tags"><TagIcon /></MenuIcon>
    <MenuIcon name="Settings"><SettingsIcon /></MenuIcon>
    <MenuIcon name="Add"><AddIcon /></MenuIcon>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  flex-flow: column wrap;
  background: #121212;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  position: fixed;
  right: 0;
  bottom: 50%;
  transform: translateY(50%);
  justify-content: space-around;
  padding: 22px 10px 22px 18px;
}
</style>
