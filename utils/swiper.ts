import { register } from 'swiper/element/bundle';
import type Swiper from 'swiper';

register();
type SwiperElement = HTMLElement & { swiper: Swiper; initialize: () => void };
export type { SwiperElement, Swiper };
