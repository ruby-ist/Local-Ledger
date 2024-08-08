<template>
  <div class="groups-container">
    <Group name="Food" :amount="1650" color="5272F2" />
    <Group name="Rent" :amount="3250" color="64CCC5" />
    <Group name="Food" :amount="1650" color="b22222" />
    <Group name="Rent" :amount="3250" color="ff4500" />
    <Group name="Food" :amount="1650" color="9370db" />
    <Group name="Rent" :amount="3250" color="90ee90" />
    <Group name="Food" :amount="1650" color="f5f5f5" />
    <Group name="Rent" :amount="3250" color="f4a460" />
  </div>
</template>

<style lang="scss">
.groups-container {
  display: flex;
  flex-flow: column;
  padding: 20px;
  height: calc(100vh - 120px);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
