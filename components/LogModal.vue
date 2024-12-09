<template>
  <div id="log-modal"
       class="h-0 w-100p absolute b-0 l-0 no-display column bg-color-black
              align-center justify--start clip-overflow--x z-1">
    <h2 class="mt-48">
      Tag
    </h2>
    <TagsCarousel />
    <div class="flex align-center" font="s-1.5em">
      <span>{{ currencySymbol }}</span>
      <input ref="amountField" v-model="amount" :style="{ width: inputWidth }" autocomplete="off"
             maxlength="5" class="no-bg focus:no-outline color-white" border="none" type="text"
             placeholder="0" font="s-1.5em fam-monospace" required="true" inputmode="numeric" pattern="\d+"
             @input="updateWidth" @keypress="checkNumeric" @paste="checkContentValue">
    </div>
    <textarea ref="descriptionField" v-model="description"
              class="m-30-0 p-15-20 h-20 min-h-20 max-h-40 no-resize w-150
                     color-white center-text bg-color-secondary-black focus:no-outline"
              wrap="hard" maxlength="30" placeholder="description" autocomplete="off"
              spellcheck="false" border="none rad-10" font="s-1rem" required="true"
              @input="adjustHeight" />
    <input ref="dateTimePicker" v-model="createdAt" type="datetime-local" font="s-1em"
           class="mb-60 color-white bg-color-black no-border no-outline max-content" step="1">
    <button v-if="currentLog" class="p-8-16 pointer bg-color-white" border="none rad-8"
            font="s-1em" @click="updateLog">Update</button>
    <button v-else class="p-8-16 pointer bg-color-white" border="none rad-8"
            font="s-1em" @click="createLog">Add</button>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    amount: '',
    inputWidth: '1ch',
    description: '',
    createdAt: '',
    prevHeaderFunctionalities: {
      title: '',
      headerButton: null as null | string,
      headerButtonCallBack: () => {},
    },
  }),

  computed: {
    ...mapState(useSettingsStore, { currencySymbol: 'currency' }),
    ...mapWritableState(useLedgerStore, ['showModal', 'currentLog', 'selectedTag']),
    ...mapWritableState(useHeaderStore, ['title', 'headerButton', 'headerButtonCallBack']),
  },

  methods: {
    tagId(): number {
      const activeSlide = document.querySelector('#log-modal .swiper-slide-active') as HTMLElement;
      return parseInt(activeSlide.dataset.id as string);
    },

    updateWidth() {
      const length = this.amount.length > 0 ? this.amount.length : 1;
      const width = length.toString() + 'ch';
      this.inputWidth = width;
    },

    checkNumeric(e: KeyboardEvent) {
      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
    },

    checkContentValue(e: ClipboardEvent) {
      const clipboardData = e.clipboardData;
      const pastedData = clipboardData?.getData('text');
      if (isNaN(Number(pastedData))) {
        e.preventDefault();
      }
      // ToDo: strip prefix zero from pasted data
    },

    adjustHeight(e: Event) {
      const target = e.target as HTMLTextAreaElement;
      target.style.height = target.style.minHeight;
      // 30 is top and bottom padding
      target.style.height = (target.scrollHeight - 30) + 'px';
    },

    validFields(): boolean {
      return (
        (this.$refs.amountField as HTMLInputElement).reportValidity()
        && (this.$refs.descriptionField as HTMLTextAreaElement).reportValidity()
      );
    },

    async createLog() {
      if (!this.validFields()) return;

      const newLog: LogWithTagId = {
        description: this.description,
        amount: parseInt(this.amount),
        createdAt: convertToEpochTime(this.createdAt),
        tagId: this.tagId(),
      };
      await this.addLog(newLog);
      this.closeModal({ formSubmission: true });
    },

    async updateLog() {
      if (this.currentLog) {
        await this.putLog({
          description: this.description,
          amount: parseInt(this.amount),
          createdAt: convertToEpochTime(this.createdAt),
          tagId: this.tagId(),
          id: this.currentLog.id,
        });
        this.closeModal({ formSubmission: true });
      } else {
        await this.createLog();
      }
    },

    conditionalRedirect() {
      // @ts-expect-error nuxt route
      if (this.$route.name !== 'groups' && this.$route.name !== 'ledger') {
        // @ts-expect-error nuxt router
        this.$router.push('/ledger');
      }
    },

    clearFormValues() {
      this.amount = '';
      this.inputWidth = '1ch';
      this.description = '';
      this.createdAt = '';
    },

    closeModal({ formSubmission } = { formSubmission: false }) {
      if (formSubmission) this.headerButtonCallBack();

      gsap.to('#log-modal', {
        height: 0,
        display: 'none',
        duration: 0.5,
        onComplete: () => {
          this.currentLog = null;
          this.selectedTag = null;
          this.showModal = false;
          this.clearFormValues();
          if (formSubmission) this.conditionalRedirect();
        },
      });
    },

    savePrevHeaderFunctionlities() {
      this.prevHeaderFunctionalities = {
        title: this.title,
        headerButton: this.headerButton,
        headerButtonCallBack: this.headerButtonCallBack,
      };
    },

    setHeaderFunctionalities() {
      this.title = 'Log';
      this.headerButton = 'Close';
      this.headerButtonCallBack = () => {
        const { title, headerButton, headerButtonCallBack } = this.prevHeaderFunctionalities;
        this.title = title;
        this.headerButton = headerButton;
        this.headerButtonCallBack = headerButtonCallBack;
        this.closeModal({ formSubmission: false });
      };
    },
    ...mapActions(useLedgerStore, ['addLog', 'putLog']),
  },

  watch: {
    showModal(value) {
      if (value) {
        let dateTime = new Date();
        if (this.currentLog) {
          this.amount = this.currentLog.amount.toString();
          this.description = this.currentLog.description;
          dateTime = new Date(this.currentLog.createdAt);
          this.updateWidth();
        }
        this.createdAt = formatDateForDatetimePicker(dateTime);
        this.savePrevHeaderFunctionlities();
        this.setHeaderFunctionalities();
      }
    },
  },
});
</script>
