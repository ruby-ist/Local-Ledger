<template>
  <div>
    <div class="m-24-12-28-0 h-40 flex row align-center">
      <input v-model="fileName" class="no-border no-outline no-bg color-white w-80p pb-5 mr-10"
             border-bottom="1px solid color-white">
      <span>.csv</span>
    </div>
    <a class="p-8-12 inline-block no-border bg-color-white color-black pointer"
       border="rad-5" @click="exportLogsToCSV">
      Export
    </a>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => {
    const now = new Date();

    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11, so add 1
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const timestamp = `${year}-${month}-${day}_${hours}-${minutes}`;

    return {
      fileName: `Backup_${timestamp}`,
    };
  },
  methods: {
    downloadFile(content: string) {
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.fileName;
      a.click();
      URL.revokeObjectURL(url);
    },

    async exportLogsToCSV() {
      try {
        const logs = await db.logs.toArray();
        const tags = await db.tags.toArray();

        const tagMap = new Map<number, string>();
        tags.forEach(tag => tagMap.set(tag.id!, tag.name));

        const csvRows: string[][] = [];

        logs.forEach((log) => {
          const tagName = tagMap.get((log as LogWithTagId).tagId) || 'Unknown';
          csvRows.push([
            log.description,
            new Date(log.createdAt).toISOString(),
            log.amount.toString(),
            tagName,
          ]);
        });

        const csvContent = csvRows.map(row => row.join('|')).join('\n');
        this.downloadFile(csvContent);
      } catch (error) {
        console.error('Error exporting logs to CSV:', error);
      }
    },
  },
});
</script>
