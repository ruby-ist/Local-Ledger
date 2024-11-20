<template>
  <div>
    <div ref="fileNameParent" class="m-24-12-28-0 h-40 flex row justify--space-between align-center">
      <span>
        {{ fileName }}
      </span>
      <label v-show="!fileSelected" class="p-10-15 center-text inline-block
                                        bg-color-secondary-black color-white"
             for="csvFileInput" border="rad-5">
        <input id="csvFileInput" ref="input" type="file" accept=".csv" class="no-display" @change="handleFileSelection">
        Open
      </label>
      <label v-show="fileSelected" class="p-10-14 center-text inline-block
                         bg-color-secondary-black color-white"
             border="rad-4" font="s-0.8em" @click="cancelFileSelection">
        {{ importCompleted ? 'Back' : 'Cancel' }}
      </label>
    </div>
    <div class="flex row align-center">
      <button :class="disabled ? 'opacity-0.5' : 'opacity-1'"
              class="p-8-12 inline-block no-border bg-color-white color-black"
              font="s-1em" border="rad-5" :disabled="disabled" @click="importCSVToDatabase">
        Import
      </button>
      <TickIcon v-show="importCompleted" class="w-28 h-28 ml-10" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    fileSelected: false,
    inputFileName: '',
    file: null as null | File,
    importCompleted: false,
    inProcess: false,
  }),

  computed: {
    fileName() {
      if (!this.fileSelected) return 'Select File';
      const maxLength = Math.round((this.$refs.fileNameParent as HTMLDivElement)
                                        .getBoundingClientRect()
                                        .width / 10) - 5;
      return truncateMiddle(this.inputFileName, maxLength, 7);
    },

    disabled() {
      return !this.fileSelected || this.inProcess;
    },

    ...mapState(useColorStore, ['colors']),
    ...mapWritableState(useFiltersStore, ['filters']),
  },

  methods: {
    handleFileSelection() {
      const inputElement = this.$refs.input as HTMLInputElement;
      const file = inputElement.files![0];
      if (file) {
        this.fileSelected = true;
        this.inputFileName = file.name;
        this.file = file;
      }
    },

    cancelFileSelection() {
      const inputElement = this.$refs.input as HTMLInputElement;
      inputElement.value = '';
      this.fileSelected = false;
      this.inputFileName = '';
      this.importCompleted = false;
    },

    readCSVFile(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          } else {
            reject(new Error('Failed to read the file'));
          }
        };
        reader.onerror = error => reject(error);
        reader.readAsText(file);
      });
    },

    parseCSVContent(csvContent: string): string[][] {
      return csvContent
        .split('\n')
        .filter(row => row.trim() !== '')
        .map(row => row.split('|').map(column => column.trim()));
    },

    async getExistingTagsMap(tagNames: string[]): Promise<Map<string, number>> {
      const tagMap = new Map<string, number>();
      const existingTags = await db.tags.where('name').anyOf(tagNames).toArray();
      existingTags.forEach(tag => tagMap.set(tag.name, tag.id!));
      return tagMap;
    },

    generateNewTags(newTagNames: string[]): { name: string; color: string }[] {
      return newTagNames.map(name => ({
        name,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
      }));
    },

    async getOrCreateTags(tagNames: string[]): Promise<Map<string, number>> {
      const tagMap = await this.getExistingTagsMap(tagNames);
      const newTagNames = tagNames.filter(name => !tagMap.has(name));

      if (newTagNames.length === 0) return tagMap;

      const newTags = this.generateNewTags(newTagNames);
      const insertedIds = await db.tags.bulkAdd(newTags, { allKeys: true });

      insertedIds.forEach((id, index) => {
        tagMap.set(newTagNames[index], id as number);
      });

      return tagMap;
    },

    toTitleCase(str: string): string {
      return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    },

    convertRowsToLogs(rows: string[][], tagMap: Map<string, number>): Log[] {
      return rows.map((row) => {
        if (row.length !== 4) {
          console.error('Invalid row format:', row);
          return null;
        }

        const [description, createdAt, amount, tagName] = row;
        const createdAtTimestamp = new Date(createdAt).getTime();
        const amountValue = parseFloat(amount);
        const tagId = tagMap.get(tagName) || 1; // "Others" Tag

        return {
          description: description,
          createdAt: createdAtTimestamp,
          amount: amountValue,
          tagId,
        };
      }).filter(log => log !== null);
    },

    async importLogsToDatabase(logs: Log[]): Promise<void> {
      try {
        await db.logs.bulkAdd(logs);
      } catch (error) {
        console.error('Error importing logs:', error);
      }
    },

    async afterImportCallback() {
      const tags = await db.tags.toArray();
      DEFAULT_FILTERS.tagIds = tags.map(tag => tag.id!);
      this.filters = structuredClone(DEFAULT_FILTERS);
    },

    async importCSVToDatabase() {
      this.inProcess = true;
      try {
        if (!this.file) return;
        const csvContent = await this.readCSVFile(this.file);
        const rows = this.parseCSVContent(csvContent);
        const tagNames = Array.from(new Set(rows.map(row => row[3]).filter(tagName => this.toTitleCase(tagName))));
        const tagMap = await this.getOrCreateTags(tagNames);
        const logsToImport = this.convertRowsToLogs(rows, tagMap);
        await this.importLogsToDatabase(logsToImport);
        await this.afterImportCallback();
        this.importCompleted = true;
      } catch (error) {
        console.error('Error importing CSV:', error);
      }
      this.inProcess = false;
    },
  },
});
</script>
