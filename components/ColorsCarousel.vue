<template>
  <div ref="carousel" class="carousel mb-24" @scroll="loopScroll" @touchend="snapScroll" @touchcancel="snapScroll">
    <div class="item">
      <TagColor color="432343" />
      <div class="tag">
        Food
      </div>
    </div>
    <div class="item">
      <TagColor color="935873" />
      <div class="tag">
        Snack
      </div>
    </div>
    <div class="item">
      <TagColor color="398499" />
      <div class="tag">
        Dress
      </div>
    </div>
    <div class="item">
      <TagColor color="123e23" />
      <div class="tag">
        Movie
      </div>
    </div>
    <div class="item">
      <TagColor color="493843" />
      <div class="tag">
        Others
      </div>
    </div>
    <div class="item">
      <TagColor color="435454" />
      <div class="tag">
        Pending
      </div>
    </div>
    <div class="item">
      <TagColor color="432343" />
      <div class="tag">
        Food
      </div>
    </div>
    <div class="item">
      <TagColor color="935873" />
      <div class="tag">
        Snack
      </div>
    </div>
    <div class="item">
      <TagColor color="398499" />
      <div class="tag">
        Dress
      </div>
    </div>
    <div class="item">
      <TagColor color="123e23" />
      <div class="tag">
        Movie
      </div>
    </div>
    <div class="item">
      <TagColor color="493843" />
      <div class="tag">
        Others
      </div>
    </div>
    <div class="item">
      <TagColor color="435454" />
      <div class="tag">
        Pending
      </div>
    </div>
    <div class="item">
      <TagColor color="432343" />
      <div class="tag">
        Food
      </div>
    </div>
    <div class="item">
      <TagColor color="935873" />
      <div class="tag">
        Snack
      </div>
    </div>
    <div class="item">
      <TagColor color="398499" />
      <div class="tag">
        Dress
      </div>
    </div>
    <div class="item">
      <TagColor color="123e23" />
      <div class="tag">
        Movie
      </div>
    </div>
    <div class="item">
      <TagColor color="493843" />
      <div class="tag">
        Others
      </div>
    </div>
    <div class="item">
      <TagColor color="435454" />
      <div class="tag">
        Pending
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { gsap } from 'gsap';

export default defineNuxtComponent({
  methods: {
    loopScroll(event: Event) {
      const carousel = event.target as HTMLDivElement;
      const left = carousel.scrollLeft;

      if (left <= 500) {
        carousel.scrollLeft = 1200 - (600 - left);
        gsap.set(carousel.children[5], { scale: 0.5 });
        gsap.set(carousel.children[11], { scale: 1 });
      }
      else if (left >= 1200) {
        carousel.scrollLeft = left - 600;
        gsap.set(carousel.children[12], { scale: 0.5 });
        gsap.set(carousel.children[6], { scale: 1 });
      }
      else {
        this.magnifyItems();
      }
    },

    magnifyItems() {
      document.querySelectorAll('.item').forEach((item) => {
        const left = item.getBoundingClientRect().left;
        if (left < 253 && left >= 153) {
          const scaleLevel = Math.round((253 - left) * 0.5) / 100;
          gsap.set(item, { scale: 0.5 + scaleLevel });
        }
        else if (left < 153 && left >= 69.8) {
          //  153x + c = 1
          // 69.8x + c = 0.5
          // 1/x = ( 153 - 69.8 ) / 0.5 = 166.4
          // c ~= 0.08
          const scaleLevel = Math.round((left / 166.4 + 0.08) * 100) / 100;
          gsap.set(item, { scale: scaleLevel });
        }
        else {
          gsap.set(item, { scale: 0.5 });
        }
      });
    },

    snapScroll(event: Event) {
      const carousel = event.target as HTMLDivElement;
      carousel.scrollLeft = Math.round(carousel.scrollLeft / 100) * 100;
    },
  },

  mounted() {
    const carousel = this.$refs.carousel as HTMLDivElement;
    carousel.scrollLeft = 600;

    gsap.set('.item', { scale: 0.5 });
  },
});
</script>

<style lang="scss">
.carousel {
  display: flex;
  width: 300px;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  white-space: nowrap;
  position: relative;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.item {
  // ToDo: make it Uno class
  margin: 10px;
  scroll-behavior: smooth;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:first-child {
    padding-left: 100px;
  }

  &:last-child {
    padding-right: 100px;
  }

  .tag-color {
    display: flex;
    width: 80px;
    height: 80px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    // ToDo: make it Uno class
    margin-bottom: 10px;
  }
}
</style>
