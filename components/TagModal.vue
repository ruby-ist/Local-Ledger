<template>
  <div id="tag-modal"
       class="h-0 w-100p absolute b-0 l-0 no-display column bg-color-black
              align-center justify--start clip-overflow--x z-1">
    <h2 class="mt-48">Pick a color</h2>
    <ColorsCarousel />
    <input ref="nameField" v-model="name"
           class="m-30-0 p-15-20 h-20 w-100 min-h-20 max-h-40 no-resize
                  color-white center-text bg-color-secondary-black focus:no-outline"
           maxlength="30" placeholder="Name" autocomplete="off"
           spellcheck="false" border="none rad-10" font="s-1rem" required="true">
    <button v-if="currentTag" class="p-8-16 pointer bg-color-white"
            border="none rad-8" font="s-1em" @click="updateTag">Update</button>
    <button v-else class="p-8-16 pointer bg-color-white" border="none rad-8"
            font="s-1em" @click="createTag">Add</button>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    name: '',
    prevHeaderFunctionalities: {
      headerButton: null as null | string,
      headerButtonCallBack: () => { },
    },
  }),

  computed: {
    ...mapWritableState(useTagsStore, ['tags', 'showModal', 'currentTag']),
    ...mapWritableState(useHeaderStore, ['headerButton', 'headerButtonCallBack']),
  },

  methods: {
    color() {
      const activeSlide = document.querySelector('#tag-modal .swiper-slide-active') as Element;
      const styles = getComputedStyle(activeSlide);
      return styles.getPropertyValue('--color');
    },

    closeModal({ formSubmission } = { formSubmission: false }) {
      if (formSubmission) this.headerButtonCallBack();

      gsap.to('#tag-modal', {
        height: '0',
        display: 'none',
        duration: 0.5,
        onComplete: () => {
          this.currentTag = null;
          this.name = '';
          this.showModal = false;
        },
      });
    },

    validFields(): boolean {
      return (this.$refs.nameField as HTMLInputElement).reportValidity();
    },

    async createTag() {
      if (!this.validFields()) return;

      await this.addTag(this.name, this.color());
      this.closeModal({ formSubmission: true });
    },

    async updateTag() {
      if (this.currentTag) {
        await this.putTag({
          name: this.name,
          color: this.color(),
          id: this.currentTag.id,
        });
        this.closeModal({ formSubmission: true });
      } else {
        await this.createTag();
      }
    },

    savePrevHeaderFunctionalities() {
      this.prevHeaderFunctionalities = {
        headerButton: this.headerButton,
        headerButtonCallBack: this.headerButtonCallBack,
      };
    },

    setHeaderFunctionalities() {
      this.headerButton = 'Close';
      this.headerButtonCallBack = () => {
        const { headerButton, headerButtonCallBack } = this.prevHeaderFunctionalities;
        this.headerButton = headerButton;
        this.headerButtonCallBack = headerButtonCallBack;
        this.closeModal();
      };
    },

    ...mapActions(useTagsStore, ['addTag', 'putTag']),
  },

  watch: {
    showModal(value) {
      if (value) {
        if (this.currentTag) this.name = this.currentTag.name;
        this.savePrevHeaderFunctionalities();
        this.setHeaderFunctionalities();
      }
    },
  },
});
</script>
