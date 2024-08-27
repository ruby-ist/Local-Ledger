<template>
  <div class="log">
    <div ref="slider" class="row"
         @touchstart="startSwipe" @touchend="finishSwipe"
         @touchmove="performSwipe" @touchcancel="closeSwipe">
      <div class="col-1">
        <div class="timestamp">
          {{ timestamp }}
        </div>
        <h3 class="description">
          {{ description }}
        </h3>
        <div class="tag">
          <TagColor :color="tagColor" />
          &ensp;{{ tag }}
        </div>
      </div>
      <div class="col-2">
        <a href="#" @click="autoSwipe"><ThreeDotsIcon height="20px" /></a>
        <div class="amount">
          <span>₹</span>
          &ensp;{{ amount }}
        </div>
      </div>
    </div>
    <div class="hidden-layer">
      <div class="icons">
        <TrashIcon class="edit-icon" />
        <EditIcon color="535353" />
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

<style lang="scss">
.log {
  border-bottom: 1px solid #535353;
  position: relative;

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 10px;
    background: black;
  }

  .col-2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }

  .timestamp {
    font-size: 0.6em;
  }

  .description {
    margin: 15px 0 30px;
    font-weight: 600;
  }

  .tag {
    font-size: 0.8em;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
  }

  .amount {
    font-weight: 700;
  }

  .hidden-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #121212;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .icons {
      margin-right: 10px;
    }

    svg {
      height: 22px;
      margin: 0 15px;

      path {
        fill: #535353;
      }
    }
  }
}
</style>
