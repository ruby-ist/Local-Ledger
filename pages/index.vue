<template>
  <div class="groups-container">
    <Group key="1" name="Food" :amount="1650" color="5272F2" />
    <Group key="2" name="Rent" :amount="3250" color="64CCC5" />
    <Group key="3" name="Food" :amount="1650" color="9370db" />
    <Group key="4" name="Rent" :amount="3250" color="f4a460" />
    <Group key="5" name="Rent" :amount="3250" color="fee12b" />
  </div>
</template>

<style lang="scss">
.groups-container {
  display: flex;
  flex-flow: column;
  padding: 20px 0 20px 8%;
  height: calc(100vh - 120px);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
