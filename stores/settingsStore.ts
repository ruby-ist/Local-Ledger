export const useSettingsStore = defineStore('settings', {
  state: (): AppSettings => {
    const settings: AppSettings = JSON.parse(localStorage.getItem('appSettings') as string);
    return settings;
  },
});
