<template>
  <div class="settings pl-36 pr-20">
    <div v-if="edit" class="h-250">
      <div class="m-24-0 min-h-60">
        <div class="mb-8" font="s-0.8em">
          Currency Symbol
        </div>
        <input v-model="settings.currency" font="s-1.1em"
               class="no-outline no-bg color-white no-border w-60p pb-8"
               type="text" max="1" border-bottom="solid 1px fff">
      </div>
      <div class="m-24-0 min-h-60">
        <div class="mb-8" font="s-0.8em">
          Target
        </div>
        <div>
          <input v-model="settings.target" font="s-1.1em"
                 class="no-outline no-bg color-white no-border w-60p pb-8"
                 type="text" max="6" border-bottom="solid 1px fff" autofocus="true">
        </div>
      </div>
      <div class="m-24-0 min-h-60">
        <div class="mb-8" font="s-0.8em">
          Duration
        </div>
        <select v-model="settings.duration" border="rad-10" style="transform: translateX(-5px);"
                class="bg-color-secondary-black color-white p-8-10 no-border w-60p">
          <option disabled value="">Please select one</option>
          <option>Per week</option>
          <option>Per month</option>
        </select>
      </div>
    </div>

    <div v-else class="h-250">
      <div class="m-24-0 min-h-60">
        <div class="mb-8" font="s-0.8em">
          Currency Symbol
        </div>
        <div class="value pb-8" font="s-1.3em w-500">{{ settings.currency }}</div>
      </div>
      <div class="m-24-0 min-h-60">
        <div class="mb-8" font="s-0.8em">
          Target
        </div>
        <div class="value pb-8" font="s-1.3em w-500">{{ settings.target }}</div>
      </div>
      <div class="m-24-0 min-h-60">
        <div class="mb-8" font="s-0.8em">
          Duration
        </div>
        <div class="value" font="s-1.3em w-500">{{ settings.duration }}</div>
      </div>
    </div>

    <div v-if="edit" class="flex row justify--end">
      <div class="h-50 flex column align-center justify--space-around" @click="saveSettings">
        <TickIcon class="w-24" />
        <span font="s-0.8em">Done</span>
      </div>
    </div>
    <div v-else class="flex row justify--end">
      <div class="h-50 flex column align-center justify--space-around" @click="editSettings">
        <EditIcon class="w-20" />
        <span font="s-0.8em">Edit</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    edit: false,
    settings: defaultSettings as AppSettings,
  }),

  emits: {
    setTitle(payload: string) {
      return payload.length > 0;
    },
  },

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
    this.$emit('setTitle', 'Settings');
    this.settings = JSON.parse(localStorage.getItem('appSettings') as string);
  },
});
</script>
