<template>
  <main id="index-page">
    <div class="bg-color-black">
      <div
        class="grid p-20 lg:p-60-5dvw grid-columns-45%-55% grid-rows-auto lg:grid-rows-2fr-3fr grid-areas-:logo-header:-:description-description:- lg:grid-areas-:logo-header:-:logo-description:-"
      >
        <div class="grid-area-logo just-s-start lg:place-self-center">
          <img
            class="w-36dvw lg:w-28dvw max-w-600"
            border="rad-10 lg:rad-25"
            src="/logo.webp"
            alt="rebmemer logo"
          >
        </div>
        <div class="grid-area-header ml-16 lg:ml-0">
          <h1 class="color-white" font="s-1.8rem lg:s-3rem w-550">
            Local Ledger
          </h1>
          <button
            class="bg-color-white color-black p-12-16 lg:p-14-20 pointer active:scale-96"
            font="f-default-font w-500 s-1rem lg:s-1.25rem"
            border="none rad-5"
            @click="handleButtonClick"
          >
            {{ buttonText }}
          </button>
        </div>
        <div class="grid-area-description">
          <p class="lg:mt-36" font="lg:s-1.25rem">
            Local-Ledger is a mobile-first Progressive Web App designed for
            offline expense tracking. Organize transactions with tags, narrow
            results with filters, and visualize spending through interactive
            graph. Easily import and export your transaction data via CSV.
            Clean, minimal, and built to offer a secure and engaging way to
            manage personal finances — right from your mobile device
          </p>
        </div>
      </div>
    </div>
    <div class="p-20-0-40 lg:p-40-0-80 bg-color-secondary-black">
      <h3 class="m-0-20-20 lg:m-0-5dvw-40 color-white" font="w-500 lg:s-2rem">
        Images
      </h3>
      <swiper-container ref="swiper">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <a :href="image.src" target="_blank">
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-100p"
              border-rad="5"
            >
          </a>
        </swiper-slide>
      </swiper-container>
    </div>
    <footer class="bg-color-black flex justify--center align-center p-32">
      <i>
        Desgined and Developed by
        <a class="color-special-link" target="_blank" href="https://srira.me">
          Srira
        </a>
      </i>
    </footer>
  </main>
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
      return this.deferredPrompt || this.isInstalling
        ? 'Install App'
        : 'Open App';
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

      if (this.deferredPrompt) await this.installPWA();
      else await this.launchPWA();
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
