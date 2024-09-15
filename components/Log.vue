<template>
  <div class="log relative" border-bottom="1 solid color-535353">
    <div ref="slider" class="p-20-10 flex row justify--space-between bg-color-black"
         @touchstart="startSwipe" @touchend="finishSwipe"
         @touchmove="performSwipe" @touchcancel="closeSwipe">
      <div class="col-1">
        <div font="s-0.6em">
          {{ timestamp }}
        </div>
        <h3 class="m-15-0-30 font-w-600">
          {{ description }}
        </h3>
        <div class="mb-2 flex align-center" font="s-0.8em w-500">
          <TagColor :color="tagColor" />
          &ensp;{{ tag }}
        </div>
      </div>
      <div class="flex column justify--space-between align-flex-end">
        <a href="#" @click="autoSwipe"><ThreeDotsIcon height="20px" /></a>
        <div font="w-700">
          <span>₹</span>
          &ensp;{{ amount }}
        </div>
      </div>
    </div>
    <div class="h-100p w-100p flex align-center justify--flex-end
                absolute t-0 l-0 -z-1 bg-color-secondary-black">
      <div class="mr-10">
        <TrashIcon class="m-0-15 h-22 path:fill-grey" />
        <EditIcon class="m-0-15 h-22 path:fill-grey" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { gsap } from 'gsap';

export default defineNuxtComponent({
  data: () => ({
    initialPosition: 0,
    currentPosition: 0,
    swipeOpen: false,
  }),
  props: {
    description: String,
    tag: String,
    amount: Number,
    timestamp: String,
    tagColor: String,
  },
  methods: {
    autoSwipe() {
      if (this.$refs.slider) {
        const x = this.swipeOpen ? 0 : -125;
        gsap.to(this.$refs.slider, { x: x, duration: 0.1 });
        this.swipeOpen = !this.swipeOpen;
      }
    },

    startSwipe(event: TouchEvent) {
      this.initialPosition = event.touches[0].pageX;
    },

    performSwipe(event: TouchEvent) {
      if (this.$refs.slider) {
        let x = event.touches[0].pageX - this.initialPosition;
        x = x < 0 ? x : 0;
        if (x >= -125 && x <= 0) {
          this.currentPosition = x;
          gsap.to(this.$refs.slider, { x: x, duration: 0.1 });
        }
      }
    },

    finishSwipe() {
      if (this.$refs.slider) {
        if (this.currentPosition < -67.5) {
          gsap.to(this.$refs.slider, { x: -125, duration: 0.1 });
          this.swipeOpen = true;
        }
        else {
          gsap.to(this.$refs.slider, { x: 0, duration: 0.1 });
          this.swipeOpen = false;
        }
      }
    },

    closeSwipe() {
      if (this.$refs.slider) {
        gsap.to(this.$refs.slider, { x: 0, duration: 0.1 });
      }
    },
  },
});
</script>
