<template>
  <div class="w-100p center-grid block relative">
    <div id="toast" ref="toast"
         class="absolute max-content z-100 b-10vh l-50vw max-w-80p
                bg-color-white color-black p-10-20 border-rad-5 opacity-0"
         style="display: none;" @touchend="hideToast" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  methods: {
    hideToast() {
      gsap.to(this.$refs.toast!, { opacity: 0, display: 'none', duration: 0.5 });
    },
  },
});
</script>
