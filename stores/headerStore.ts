export const useHeaderStore = defineStore('header', {
  state: () => ({
    title: 'Groups',
    headerButton: null as null | string,
    headerButtonCallBack: () => {},
  }),
});
