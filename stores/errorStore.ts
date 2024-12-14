export const useErrorStore = defineStore('error', {
  actions: {
    raiseError(message: string, timeout: number = 3) {
      const toast = document.getElementById('toast');
      toast!.innerText = message;
      gsap.set(toast, { x: '-50%' });
      const timeline = gsap.timeline();

      timeline.fromTo(toast, {
        y: 100,
        opacity: 0,
        display: 'none',
      }, {
        y: 0,
        opacity: 1,
        display: 'block',
        duration: 0.5,
      }).to(toast, {
        opacity: 0,
        display: 'none',
      }, `>${timeout}`);
    },
  },
});
