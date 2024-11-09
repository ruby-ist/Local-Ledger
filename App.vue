<template>
  <Head>
    <Title>Nuxt PWA</Title>
    <Meta name="description" content="Expense tracker app" />
    <Meta name="theme-color" content="#000" />
    <Link rel="icon" href="favicon.ico" />
    <Link rel="apple-touch-icon" href="apple-touch-icon-180x180.png" />
    <Link rel="mask-icon" href="maskable-icon-512x512.png" />
  </Head>
  <NuxtPwaAssets />

  <div class="h-100vh hidden-overflow">
    <Header />
    <div class="relative">
      <NuxtPage class="page mr-96px auto-overflow--y no-scroll-bar" />
      <VerticalNavBar />
      <LogModal v-show="showModal" ref="logModal" />
    </div>
  </div>
</template>

<script lang="ts">
import '~/utils/swiper';

export default defineNuxtComponent({
  computed: {
    ...mapState(useLedgerStore, ['showModal']),
  },

  beforeMount() {
    if (!localStorage.getItem('appSettings')) {
      localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
    }
  },

  watch: {
    showModal(value) {
      if (value) {
        gsap.to('#log-modal', {
          height: '100%',
          display: 'flex',
          duration: 0.5,
          onUpdate: () => {
            const swiperEl = document.querySelector('#log-swiper') as SwiperElement;
            swiperEl.swiper.update();
          },
        });
      }
    },
  },
});
</script>

<style>
:root {
  background: var(--black);
  color: var(--white);
  font-family: system-ui, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

a {
  text-decoration: none;
}

body {
  margin: 0;
  overflow: hidden;
}

.page {
  height: calc(100vh - 120px);
}
</style>
