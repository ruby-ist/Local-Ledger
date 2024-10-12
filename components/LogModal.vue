<template>
  <div id="log-modal"
       class="h-0 w-100p absolute b-0 l-0 no-display column bg-color-black
              align-center justify--start clip-overflow--x z-1">
    <h2 class="mt-64">
      Tag
    </h2>
    <LogsCarousel :current-tag="currentLog?.tag" />
    <div class="flex align-center" font="s-1.5em">
      <span>₹ </span>
      <input ref="amountField" v-model="amount" :style="{ width: inputWidth }" autocomplete="off"
             maxlength="6" class="no-bg focus:no-outline color-white" border="none" type="text"
             placeholder="0" font="s-1.5em fam-monospace" required="true" inputmode="numeric" pattern="\d+"
             @input="updateWidth" @keypress="checkNumeric" @paste="checkContentValue">
    </div>
    <textarea ref="descriptionField" v-model="description"
              class="m-30-0 p-15-20 h-20 min-h-20 max-h-40 no-resize w-150
                     color-white center-text bg-color-secondary-black focus:no-outline"
              wrap="hard" maxlength="30" placeholder="description" autocomplete="off"
              spellcheck="false" border="none rad-10" font="s-1rem" required="true"
              @input="adjustHeight" />
    <button v-if="currentLog" class="p-8-16 pointer bg-color-white" border="none rad-8"
            font="s-1em" @click="updateLog">Update</button>
    <button v-else class="p-8-16 pointer bg-color-white" border="none rad-8"
            font="s-1em" @click="createLog">Add</button>
    <a class="pointer absolute -t-63 r-36 z-2 color-white" font="s-2em fam-monospace" @click="closeModal">
      x
    </a>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    amount: '',
    inputWidth: '1ch',
    description: '',
  }),

  computed: {
    tagId(): number {
      const activeSlide = document.querySelector('#log-modal .swiper-slide-active') as HTMLElement;
      return parseInt(activeSlide.dataset.id as string);
    },
    ...mapWritableState(useLedgerStore, ['showModal', 'currentLog']),
  },

  mounted() {
    if (this.currentLog) {
      this.amount = this.currentLog.amount.toString();
      this.description = this.currentLog.description;
      this.updateWidth();
    }
  },

  methods: {
    updateWidth() {
      const length = this.amount.length > 0 ? this.amount.length : 1;
      const width = length.toString() + 'ch';
      this.inputWidth = width;
    },

    checkNumeric(e: KeyboardEvent) {
      const code = e.code;
      if (!code.startsWith('Digit') || this.amount.startsWith('0')) {
        e.preventDefault();
      }
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
      await db.logs.add({
        description: this.description,
        amount: parseInt(this.amount),
        createdAt: Date.now(),
        tagId: this.tagId,
      });
      await this.updateLogs();
      this.closeModal();
    },

    async updateLog() {
      if (this.currentLog) {
        await db.logs.put({
          description: this.description,
          amount: parseInt(this.amount),
          createdAt: this.currentLog.createdAt,
          tagId: this.tagId,
        });
        await this.updateLogs();
        this.closeModal();
      } else {
        await this.createLog();
      }
    },

    optionalRedirect() {
      // @ts-expect-error nuxt route
      if (this.$route.name !== 'groups' && this.$route.name !== 'ledger') {
        // @ts-expect-error nuxt router
        this.$router.push('/ledger');
      }
    },

    closeModal() {
      // ToDo: move the close button to header componenet
      gsap.to('#log-modal', {
        height: 0,
        display: 'none',
        duration: 0.5,
        onComplete: () => {
          this.currentLog = null;
          this.showModal = false;
          this.optionalRedirect();
        },
      });
    },
    ...mapActions(useLedgerStore, ['updateLogs']),
  },
});
</script>
