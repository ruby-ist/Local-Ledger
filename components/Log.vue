<template>
  <div class="log relative" border-bottom="1 solid color-535353">
    <div ref="slider" class="p-20-10 flex row justify--space-between
                             relative bg-color-black z-1"
         @touchstart="startSwipe" @touchend="finishSwipe"
         @touchmove="performSwipe" @touchcancel="closeSwipe">
      <div class="col-1">
        <div font="s-0.6em">
          {{ formattedTime }}
        </div>
        <h3 class="m-15-0-30 font-w-600">
          {{ log.description }}
        </h3>
        <div class="mb-2 flex align-center" font="s-0.8em w-500">
          <Badge class="w-14 h-14 mr-4" :style="`--tag-color: ${log.tag.color}`" :shade="25" />
          &ensp;{{ log.tag.name }}
        </div>
      </div>
      <div class="flex column justify--space-between align-flex-end">
        <a href="#" @click="autoSwipe"><ThreeDotsIcon height="20px" /></a>
        <div font="w-700">
          <span>{{ currencySymbol }} </span>
          {{ log.amount }}
        </div>
      </div>
    </div>
    <div class="h-100p w-100p flex align-center justify--flex-end
                absolute t-0 l-0 z-0 bg-color-secondary-black">
      <div class="mr-10">
        <button class="no-bg no-outline no-border" @click="destroyLog">
          <TrashIcon class="m-0-15 h-22 path:fill-grey" />
        </button>
        <button class="no-bg no-outline no-border" @click="editLog">
          <EditIcon class="m-0-15 h-22 path:fill-grey" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data: () => ({
    initialPosition: 0,
    currentPosition: 0,
    swipeOpen: false,
  }),
  props: {
    log: {
      type: Object as PropType<LogWithTag>,
      required: true,
    },
  },
  computed: {
    formattedTime(): string {
      const dateTime = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }).format(new Date(this.log.createdAt));
      return dateTime.replace(',', ' :').replace(/\b(am|pm)\b/, match => match.toUpperCase());
    },
    ...mapState(useSettingsStore, { currencySymbol: 'currency' }),
    ...mapWritableState(useLedgerStore, ['currentLog', 'showModal']),
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

    editLog() {
      this.currentLog = this.log;
      this.showModal = true;
      this.closeSwipe();
    },

    async destroyLog() {
      if (confirm('Are you sure?')) {
        await this.deleteLog(this.log.id as number);
        this.closeSwipe();
      }
    },
    ...mapActions(useLedgerStore, ['deleteLog']),
  },
});
</script>
