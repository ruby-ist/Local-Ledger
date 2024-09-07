<template>
  <swiper-container class="h-120 w-120 m-20-0" effect="cards" grab-cursor="true">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
  </swiper-container>
</template>

<script>
import { register } from 'swiper/element/bundle';

register();

export default defineNuxtComponent({
  mounted() {
    const swiperEl = document.querySelector('swiper-container');
    const swiperParams = {
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      cardsEffect: {
        perSlideRotate: 5,
        perSlideOffset: 10,
      },
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
    swiperEl.swiper.slideTo(5);
  },
});
</script>

<style>
swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

swiper-slide:nth-child(1n) {
  background-color: rgb(206, 17, 17);
}

swiper-slide:nth-child(2n) {
  background-color: rgb(0, 140, 255);
}

swiper-slide:nth-child(3n) {
  background-color: rgb(10, 184, 111);
}

swiper-slide:nth-child(4n) {
  background-color: rgb(211, 122, 7);
}

swiper-slide:nth-child(5n) {
  background-color: rgb(118, 163, 12);
}

swiper-slide:nth-child(6n) {
  background-color: rgb(180, 10, 47);
}

swiper-slide:nth-child(7n) {
  background-color: rgb(35, 99, 19);
}

swiper-slide:nth-child(8n) {
  background-color: rgb(0, 68, 255);
}

swiper-slide:nth-child(9n) {
  background-color: rgb(218, 12, 218);
}

swiper-slide:nth-child(10n) {
  background-color: rgb(54, 94, 77);
}
</style>
