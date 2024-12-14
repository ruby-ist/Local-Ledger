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
        <input ref="currencyInput" v-model="settings.currency" font="s-1.1em"
               class="no-outline no-bg color-white no-border w-60p pb-8"
               type="text" maxlength="1" border-bottom="solid 1px fff" required="true"
               @input="clearErrorMessage" @keydown.enter="removeFocus">
      </div>
      <div class="min-h-60">
        <div class="mb-8" font="s-0.8em">
          Monthly Target
        </div>
        <div>
          <input ref="targetInput" v-model="settings.target" font="s-1.1em"
                 class="no-outline no-bg color-white no-border w-60p pb-8" required="true"
                 type="text" maxlength="8" border-bottom="solid 1px fff" autofocus="true"
                 pattern="\d+" data-error-message="Please enter a postive numeric value"
                 enter-key-hint="done" @input="clearErrorMessage" @invalid="setErrorMessage"
                 @keydown.enter="removeFocus">
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
    ...mapWritableState(useSettingsStore, ['currency', 'target']),
  },

  methods: {
    editSettings() {
      this.edit = true;
    },

    isCurrencySymbol(char: string) {
      let valid = false;
      const code = char.charCodeAt(0);

      // Basic currency symbols
      if (code === 0x24 || (code >= 0xA2 && code <= 0xA5)) valid = true;
      // Basic currency blocks
      if (code >= 0x20A0 && code <= 0x20CF) valid = true;

      if (char.length > 1) valid = false;

      if (!valid) {
        const currencyInput = this.$refs.currencyInput as HTMLInputElement;
        currencyInput.setCustomValidity('Please enter a valid currency symbol');
        currencyInput.reportValidity();
      }

      return valid;
    },

    saveSettings() {
      if (!this.validFields()) return;

      this.currency = this.settings.currency;
      this.target = this.settings.target;
      localStorage.setItem('appSettings', JSON.stringify(this.settings));
      this.edit = false;
    },

    validFields(): boolean {
      const currencyInput = this.$refs.currencyInput as HTMLInputElement;
      const targetInput = this.$refs.targetInput as HTMLInputElement;
      if (targetInput.value === '0')
        targetInput.setCustomValidity('Please enter a positive numeric value');

      return this.isCurrencySymbol(currencyInput.value) && targetInput.reportValidity();
    },
  },

  mounted() {
    this.settings = JSON.parse(localStorage.getItem('appSettings') as string);
  },
});
</script>
