<template>
  <div class="flex column align-center m-0 p-100-0">
    <img src="~/public/logo.png" class="w-120 h-120 border-rad-20">
    <button class="bg-color-white p-10-20 no-border no-outline border-rad-5 mt-100"
            font="w-500 s-1.2rem" @click="handleButtonClick">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
// PWAButton.vue
export default {
  data() {
    return {
      deferredPrompt: null,
      pwaStartUrl: window.location.origin + '/groups',
    };
  },
  computed: {
    buttonText() {
      return this.deferredPrompt ? 'Install App' : 'Open App';
    },
    ...mapWritableState(useHeaderStore, ['title']),
  },
  async mounted() {
    this.title = 'Local Ledger';
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
    });
  },
  methods: {
    async handleButtonClick() {
      if (this.deferredPrompt) {
        await this.installPWA();
      } else {
        await this.launchPWA();
      }
    },

    async installPWA() {
      // Show the install prompt
      this.deferredPrompt.prompt();
    },

    async launchPWA() {
      // Try to launch using the manifest start_url
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          window.open(this.pwaStartUrl, '_blank');
          return;
        }
      } catch (error) {
        console.error('Error launching PWA:', error);
      }
    },
  },
};
</script>
