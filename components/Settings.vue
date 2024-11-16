<template>
  <div>
    <div class="flex row justify--space-between align-center mt-10">
      <h2 font="w-600">Settings</h2>
      <button v-if="edit" font="s-0.8em" border="rad-5"
              class="flex column align-center justify--space-around p-10-15
                    bg-color-secondary-black color-white no-border no-outline"
              @click="saveSettings">
        Done
      </button>
      <button v-else font="s-0.8em" border="rad-5"
              class="flex column align-center justify--space-around p-10-15
                    bg-color-secondary-black color-white no-border no-outline"
              @click="editSettings">
        Edit
      </button>
    </div>
    <div v-if="edit">
      <div class="m-24-0 min-h-60">
        <div class="mb-8" font="s-0.8em">
          Currency Symbol
        </div>
        <input v-model="settings.currency" font="s-1.1em"
               class="no-outline no-bg color-white no-border w-60p pb-8"
               type="text" max="1" border-bottom="solid 1px fff">
      </div>
      <div class="min-h-60">
        <div class="mb-8" font="s-0.8em">
          Monthly Target
        </div>
        <div>
          <input v-model="settings.target" font="s-1.1em"
                 class="no-outline no-bg color-white no-border w-60p pb-8"
                 type="text" max="6" border-bottom="solid 1px fff" autofocus="true">
        </div>
      </div>
    </div>

    <div v-else>
      <div class="m-24-0 min-h-60">
        <div class="mb-8" font="s-0.8em">
          Currency Symbol
        </div>
        <div class="value pb-8" font="s-1.3em w-500">{{ settings.currency }}</div>
      </div>
      <div class="min-h-60">
        <div class="mb-8" font="s-0.8em">
          Monthly Target
        </div>
        <div class="value pb-8" font="s-1.3em w-500">{{ settings.target }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    edit: false,
    settings: DEFAULT_SETTINGS as AppSettings,
  }),

  computed: {
    ...mapWritableState(useSettingsStore, ['currency']),
  },

  methods: {
    editSettings() {
      this.edit = true;
    },

    saveSettings() {
      this.currency = this.settings.currency;
      localStorage.setItem('appSettings', JSON.stringify(this.settings));
      this.edit = false;
    },
  },

  mounted() {
    this.settings = JSON.parse(localStorage.getItem('appSettings') as string);
  },
});
</script>
