<template>
  <div id="new_log_modal"
       class="h-100p w-100p absolute b-0 l-0 flex column bg-color-black
              align-center justify--start clip-overflow--x">
    <h2 class="mt-64">
      Tag
    </h2>
    <!-- <ColorsCarousel /> -->
    <div class="flex align-center" font="s-1.5em">
      <span>₹ </span>
      <input v-model="amount" :style="{ width: inputWidth }" autocomplete="off"
             maxlength="6" class="no-bg focus:no-outline color-white" border="none" type="text" placeholder="0"
             font="s-1.5em fam-monospace" @input="updateWidth" @keypress="checkNumeric"
             @paste="checkContentValue">
    </div>
    <textarea v-model="description" class="m-30-0 p-15-20 h-20 min-h-20 max-h-40 no-resize
                                          color-white center-text bg-color-secondary-black focus:no-outline"
              wrap="hard" maxlength="30" placeholder="description" autocomplete="off" spellcheck="false"
              border="none rad-10" font="fam-monospace" @input="adjustHeight" />
    <button class="p-8-16 pointer bg-color-white" border="none rad-8" font="s-1em">
      Add
    </button>
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

  methods: {
    updateWidth(e: Event) {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      const length = value.length > 0 ? value.length : 1;
      const width = length.toString() + 'ch';
      this.inputWidth = width;
    },

    checkNumeric(e: KeyboardEvent) {
      const charCode = e.charCode;
      if (charCode < 48 || charCode > 57 || this.amount.startsWith('0')) {
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

    closeModal() {
      // ToDo: move the close button to header componenet
      gsap.to('#new_log_modal', { height: 0, display: 'none', duration: 0.5 });
    },
  },
});
</script>
