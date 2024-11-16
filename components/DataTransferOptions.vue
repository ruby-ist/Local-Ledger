<template>
  <div>
    <h2 class="mt-50" font="w-600">Data</h2>
    <div class="mb-40">
      <input id="import-option" v-model="mode" :checked="mode === 'Import'"
             type="radio" value="Import" class="m-0">
      <label for="import-option" class="m-0-20-0-8">Import</label>

      <input id="export-option" v-model="mode" :checked="mode === 'Export'"
             type="radio" value="Export" class="m-0">
      <label for="export-option" class="m-0-20-0-8">Export</label>
    </div>
    <ImportDataOption v-if="mode === 'Import'" />
    <ExportDataOption v-if="mode === 'Export'" />

  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    mode: 'Import',
  }),
});
</script>
