<template>
  <div class="flex column align-center m-0 p-100-0">
    <img src="~/public/logo.png" class="w-120 h-120 border-rad-20">
    <button class="bg-color-white p-10-20 no-border no-outline border-rad-5 mt-100"
            :disabled="isInstalling" :class="{ 'opacity-0.5': isInstalling }"
            font="w-500 s-1.2rem" @click="handleButtonClick">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    isInstalling: false,
    deferredPrompt: null,
    pwaStartUrl: window.location.origin + '/groups',
  }),
  computed: {
    buttonText() {
      return (this.deferredPrompt && !this.isInstalling) ? 'Install App' : 'Open App';
    },
    ...mapWritableState(useHeaderStore, ['title']),
  },
  async mounted() {
    this.title = 'Local Ledger';

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
    });
  },
  methods: {
    async handleButtonClick() {
      if (this.deferredPrompt && !this.isInstalling) {
        await this.installPWA();
      } else {
        await this.launchPWA();
      }
    },

    async installPWA() {
      // Show the install prompt
      this.deferredPrompt.prompt();

      try {
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          this.isInstalling = true;
          setTimeout(() => {
            this.isInstalling = false;
          }, 3000);
        }
      } catch (error) {
        console.error('Error installing PWA:', error);
      }
    },

    async launchPWA() {
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
