export const useHeaderStore = defineStore('header', {
  state: () => ({
    title: '',
    headerButton: null as null | string,
    headerButtonCallBack: () => {},
  }),
});
