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
      isInstalled: false,
      deferredPrompt: null,
      canInstall: false,
    };
  },
  computed: {
    buttonText() {
      return this.isInstalled ? 'Open App' : 'Install App';
    },
    ...mapWritableState(useHeaderStore, ['title']),
  },
  async mounted() {
    this.title = 'Local Ledger';
    // Initial check
    await this.checkInstallationStatus();

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.canInstall = true;
    });

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.deferredPrompt = null;
      this.canInstall = false;
    });

    // Listen for display mode changes
    window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
      this.isInstalled = evt.matches;
    });
  },
  methods: {
    async checkInstallationStatus() {
      // Check if running in standalone mode (installed)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        this.isInstalled = true;
        return;
      }

      // For iOS devices
      if (window.navigator.standalone === true) {
        this.isInstalled = true;
        return;
      }

      // Check service worker registration
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        this.isInstalled = !!registration;
      } catch (error) {
        console.error('Error checking installation status:', error);
      }
    },

    async handleButtonClick() {
      if (this.isInstalled) {
        await this.launchPWA();
      } else {
        await this.installPWA();
      }
    },

    async installPWA() {
      if (!this.deferredPrompt) {
        console.error('Installation prompt not available');
        return;
      }

      // Show the install prompt
      this.deferredPrompt.prompt();

      try {
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          this.isInstalled = true;
        }
      } catch (error) {
        console.error('Installation error:', error);
      }

      // Clear the deferred prompt
      this.deferredPrompt = null;
    },

    async launchPWA() {
      // Try to launch using the manifest start_url
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const startUrl = new URL(registration.scope).href;
          alert('registration scope', startUrl);
          window.open(startUrl, '_blank');
          return;
        }
      } catch (error) {
        console.error('Error launching PWA:', error);
      }

      // Fallback: open in new window with standalone display
      const pwaUrl = window.location.origin;
      alert('pwaUrl', pwaUrl);
      const windowFeatures = 'width=800,height=600,status=0,toolbar=0';
      window.open(pwaUrl, 'pwa_window', windowFeatures);
    },
  },
};
</script>
