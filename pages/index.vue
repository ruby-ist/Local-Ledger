<template>
  <div id="index-page">
    <div class="flex row justify--space-evenly p-75-0-50">
      <div>
        <img src="~/public/logo.png" class="w-120 border-rad-20">
      </div>
      <div class="flex column justify--space-between">
        <h1 class="m-0">Local Ledger</h1>
        <div>
          <button class="bg-color-white p-10-20 no-border no-outline border-rad-5 mb-5"
                  :class="{ 'opacity-0.5': isInstalling }"
                  font="w-500 s-1.2rem" @click="handleButtonClick">
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
    <section class="p-0-40 mb-40">
      <h3 class="mb-40">Description</h3>
      <p class="lh-28">
        Local Ledger is a minimal Progressive Web App (PWA) that helps you track expenses effortlessly. It works completely offline, with features like filters for organizing transactions, interactive graphs for visualizing spending, and import/export options for easy data management. With a clean, simple interface, it offers a secure and hassle-free way to manage your finances on your mobile.
      </p>
    </section>
    <section class="p-20-0-40 mb-40 bg-color-secondary-black">
      <h3 class="mb-40 pl-40">Images</h3>
      <swiper-container ref="swiper">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <a :href="image.src" target="_blank">
            <img :src="image.src" :alt="image.alt" class="w-100p" border-rad="5">
          </a>
        </swiper-slide>
      </swiper-container>
    </section>
    <footer class="centered-grid mb-32" font="s-0.75rem">
      <em>
        Designed and Developed by <a href="https://srira.me">Srira</a>
      </em>
    </footer>
  </div>
</template>

<script lang="ts">
interface BeforeInstallPromptEvent extends Event {
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
  }>;
  prompt(): Promise<void>;
}

export default defineNuxtComponent({
  data: () => ({
    isInstalling: false,
    deferredPrompt: null as null | BeforeInstallPromptEvent,
    pwaStartUrl: window.location.origin + '/groups',
    images: [
      { src: '/screenshots/groups.webp', alt: 'groups' },
      { src: '/screenshots/graph.webp', alt: 'graph' },
      { src: '/screenshots/ledger.webp', alt: 'ledger' },
      { src: '/screenshots/filters.webp', alt: 'filters' },
      { src: '/screenshots/tags.webp', alt: 'tags' },
      { src: '/screenshots/log-modal.webp', alt: 'log-modal' },
      { src: '/screenshots/tag-modal.webp', alt: 'tag-modal' },
      { src: '/screenshots/settings.webp', alt: 'settings' },
    ],
  }),
  computed: {
    buttonText() {
      return (this.deferredPrompt || this.isInstalling) ? 'Install App' : 'Open App';
    },
  },
  async mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
    });

    const swiperEl = this.$refs.swiper as SwiperElement;
    const swiperParams = {
      slidersPerView: 3,
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20,
      breakpoints: {
        320: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  },
  methods: {
    async handleButtonClick() {
      if (this.isInstalling) return;

      if (this.deferredPrompt)
        await this.installPWA();
      else
        await this.launchPWA();
    },

    async installPWA() {
      // Show the install prompt
      this.deferredPrompt!.prompt();

      try {
        const { outcome } = await this.deferredPrompt!.userChoice;
        if (outcome === 'accepted') {
          this.isInstalling = true;
          setTimeout(() => {
            this.isInstalling = false;
          }, 8000);
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
});
</script>

<style>
/* resetting these styles on index page */
#index-page {
  height: auto;
  margin-right: 0;
}

body {
  overflow: auto;

  .hidden-overflow {
    overflow: auto;
  }
}
</style>
