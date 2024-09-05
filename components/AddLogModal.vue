<template>
  <div id="new_log_modal" class="h-100per w-100per flex column align-center justify--start">
    <h2 class="mt-64">
      Tag
    </h2>
    <ColorsCarousel />
    <div class="amount flex align-center">
      <span>₹ </span>
      <input v-model="amount" :style="{ width: inputWidth }" autocomplete="off"
             maxlength="6" class="amount-input" type="text" placeholder="0"
             @input="updateWidth" @keypress="checkNumeric" @paste="checkContentValue">
    </div>
    <textarea v-model="description" class="m-30-0 p-15-20 h-20 no-resize" wrap="hard" maxlength="30"
              placeholder="description" autocomplete="off" spellcheck="false" @input="adjustHeight" />
    <button class="p-8-16 pointer">
      Add
    </button>
    <a class="close-button pointer" @click="closeModal">x</a>
  </div>
</template>

<script lang="ts">
import { gsap } from 'gsap';

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
      console.log(target.scrollHeight + 'px');
      target.style.height = (target.scrollHeight - 30) + 'px';
    },

    closeModal() {
      // ToDo: move the close button to header componenet
      gsap.to('#new_log_modal', { height: 0, display: 'none', duration: 0.5 });
    },
  },
});
</script>

<style lang="scss">
#new_log_modal {
  position: absolute;
  bottom: 0;
  left: 0;
  background: black;
  overflow-x: clip;

  .amount {
    font-size: 1.5em;
  }

  .amount-input {
    border: none;
    background: none;
    color: white;
    font-size: 1.5em;
    font-family: monospace;

    &:focus {
      outline: none;
    }
  }

  textarea {
    text-align: center;
    min-height: 20px;
    max-height: 40px;
    color: white;
    background: #121212;
    border-radius: 10px;
    border: none;
    font-family: monospace;

    &:focus {
      outline: none;
    }
  }

  button {
    background: white;
    border: none;
    border-radius: 8px;
    font-size: 1em;
  }

  .close-button {
    position: absolute;
    top: -63px;
    right: 36px;
    color: white;
    font-size: 2em;
    font-family: monospace;
    z-index: 2;
  }
}
</style>
