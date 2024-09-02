<template>
  <div id="new_log_modal">
    <h2 class="mt-64">
      Tag
    </h2>
    <ColorsCarousel />
    <div class="amount">
      <span>₹ </span>
      <input v-model="amount" :style="{ width: inputWidth }" autocomplete="off"
             maxlength="6" class="amount-input" type="text" placeholder="0"
             @input="updateWidth" @keypress="checkNumeric" @paste="checkContentValue">
    </div>
    <textarea v-model="description" class="m-30-0 p-15-20" wrap="hard" maxlength="30" placeholder="description"
              autocomplete="off" spellcheck="false" @input="adjustHeight" />
    <button class="p-8-16">
      Add
    </button>
    <a class="close-button" @click="closeModal">x</a>
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
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background: black;
  overflow-x: clip;

  .amount {
    font-size: 1.5em;
    display: flex;
    align-items: center;
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
    height: 20px;
    max-height: 40px;
    resize: none;
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
    cursor: pointer;
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
    cursor: pointer;
  }
}
</style>
