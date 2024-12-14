<template>
  <div>
    <input v-model="month" type="month"
           :max="currentMonth" :min="minimumMonth"
           class="block p-12-0-10-40 color-white bg-color-secondary-black
                  no-outline max-content no-border center-text absolute r-30 t-0"
           border="rad-5" font="s-1em">
    <div ref="chart" class="w-280 h-300 ml-20 mb-40" />
    <div class="ml-50">
      <h3 class="pl-15">Tags</h3>
      <div v-if="tags.length !== 0" class="flex row wrap mb-40">
        <GraphLegend v-for="tag in tags" :key="tag.id" :tag="tag" @toggle-legend="toggleLegend" />
      </div>
      <div v-else class="pl-15 mb-50">
        <em>No Data Found.</em>
      </div>
      <div font="s-1.1rem">
        <div class="mb-15"><b>Spent:&ensp;</b>{{ currencySymbol + totalAmount }}</div>
        <div v-if="month === currentMonth" class="mb-15"><b>Remaining:&ensp;</b>{{ currencySymbol + (target - totalAmount) }}</div>
        <div v-if="month === currentMonth" class="mb-15"><b>Days Left:&ensp;</b>{{ monthEndDate - currentDate }}</div>
        <div v-if="month !== currentMonth && totalAmount > target" class="mb-15">
          <b>Exceeded:&ensp;</b>
          {{ currencySymbol + (totalAmount - target) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
let chart: ECharts;

export default defineNuxtComponent({
  data: () => ({
    tags: [] as Tag[],
    month: currentMonth,
    totalAmount: 0,
  }),

  computed: {
    currentDate(): number {
      return this.month === currentMonth ? (new Date()).getDate() : this.monthEndDate;
    },

    monthEndDate(): number {
      const date = new Date(this.month);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return monthEnd.getDate();
    },

    gridConfig() {
      return {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      };
    },

    legendConfig() {
      return { show: false };
    },

    tooltipConfig() {
      return {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            opacity: 0.5,
            color: '#fff',
          },
        }, // @ts-expect-error for echarts params type
        position: function (pos, _params, _dom, _rect, size) {
          const obj: { top: number; left?: number; right?: number } = { top: 100 };
          if (pos[0] < size.viewSize[0] / 2)
            obj.left = pos[0] + 20;
          else
            obj.right = size.viewSize[0] - pos[0] + 20;
          return obj;
        },
        order: 'seriesDesc',
      };
    },

    xAxisConfig() {
      return {
        type: 'category',
        boundaryGap: false,
        axisTick: { show: false },
        data: [...Array(this.currentDate + 1).keys()],
        axisLabel: { showMaxLabel: true },
      };
    },

    yAxisConfig() {
      return {
        type: 'value',
        splitLine: { show: false },
        axisLine: { show: true },
        axisLabel: { formatter: this.yAxisFormatter },
      };
    },
    ...mapState(useSettingsStore, { currencySymbol: 'currency', target: 'target' }),
    ...mapWritableState(useHeaderStore, ['title']),
  },

  methods: {
    chartOptions(series: SeriesOption[]) {
      return {
        color: this.tags.map(tag => (tag.color)).reverse(),
        grid: this.gridConfig,
        legend: this.legendConfig,
        series,
        tooltip: this.tooltipConfig,
        xAxis: this.xAxisConfig,
        yAxis: this.yAxisConfig,
      };
    },

    convertToDailyProgression(logs: Log[]): number[] {
      const dailyTotal: Map<number, number> = this.squeezeByDate(logs);
      const progression: number[] = dailyTotal.has(1) ? [0, dailyTotal.get(1)!] : [0, 0];

      for (let date = 2; date <= this.currentDate; date++) {
        let amount = progression[date - 1];
        if (dailyTotal.has(date)) amount += dailyTotal.get(date)!;
        progression.push(amount);
      }

      return progression;
    },

    createSeriesOption(tag: Tag, dailyProgression: number[]): SeriesOption {
      return {
        name: tag.name,
        type: 'line',
        stack: 'Total',
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: tag.color },
            { offset: 0.789, color: '#000' },
          ]),
        },
        data: dailyProgression,
        symbol: 'roundRect',
        symbolSize: 6,
        showSymbol: false,
        lineStyle: { color: tag.color, width: 1 },
      };
    },

    async dataset(): Promise<SeriesOption[]> {
      const dataset: SeriesOption[] = [];
      const logGroups = await this.fetchLogGroups();
      this.tags = await this.fetchTagForGroups(logGroups);
      this.totalAmount = 0;
      logGroups.forEach((logs, tagId) => {
        const dailyProgression = this.convertToDailyProgression(logs);
        const tag = this.tags.find(tag => tag.id === tagId) as Tag;
        dataset.push(this.createSeriesOption(tag, dailyProgression));
        this.totalAmount += dailyProgression[dailyProgression.length - 1];
      });
      dataset.sort(this.datasetSortFunc);
      this.sortTags(dataset);

      return dataset;
    },

    datasetSortFunc(a: SeriesOption, b: SeriesOption) {
      const firstData = a.data as Array<number>;
      const secondData = b.data as Array<number>;
      const firstDataLastElement = firstData[firstData.length - 1];
      const secondDataLastElement = secondData[secondData.length - 1];

      return firstDataLastElement - secondDataLastElement;
    },

    async fetchLogGroups(): Promise<Map<number, Log[]>> {
      const [startTime, endTime] = monthTimestamps(this.month);
      const logs: Log[] = await db.logs.where('createdAt')
                                       .between(startTime, endTime)
                                       .toArray();

      return Map.groupBy(logs, (log) => {
        return (log as LogWithTagId).tagId;
      });
    },

    async fetchTagForGroups(logGroups: Map<number, Log[]>): Promise<Tag[]> {
      return await db.tags.where('id')
                          .anyOf(logGroups.keys().toArray())
                          .toArray();
    },

    groupByDate(logs: Log[]): Map<number, Log[]> {
      return Map.groupBy(logs, (log) => {
        const createdAt = new Date(log.createdAt);
        return createdAt.getDate();
      });
    },

    hideTooltipOnOutsideClick(event: Event) {
      const chartElement = chart.getDom();
      if (!chartElement.contains(event.target as Node)) {
        chart.dispatchAction({ type: 'hideTip' });
        chart.dispatchAction({
          type: 'updateAxisPointer',
          currTrigger: 'leave',
        });
      }
    },

    sortTags(dataset: SeriesOption[]) {
      this.tags.sort((a: Tag, b: Tag) => (
        dataset.findIndex(data => (data.name === b.name))
        - dataset.findIndex(data => (data.name === a.name))
      ));
    },

    squeezeByDate(logs: Log[]): Map<number, number> {
      const ledger: Map<number, Log[]> = this.groupByDate(logs);
      const dailyExpenseList = new Map();

      ledger.forEach((logs: Log[], date: number) => {
        const totalAmount = logs.reduce((total: number, log: Log) => {
          return total + log.amount;
        }, 0);

        dailyExpenseList.set(date, totalAmount);
      });
      return dailyExpenseList;
    },

    toggleLegend(name: string) {
      if (chart) {
        chart.dispatchAction({
          type: 'legendToggleSelect',
          name: name,
        });
      }
    },

    yAxisFormatter(value: string, _index: number) {
      const amount = parseInt(value);
      if (amount >= 1_000_000) {
        return `${Math.round(amount / 10_000) / 100}M`;
      } else if (amount >= 1_000) {
        return `${Math.round(amount / 10) / 100}k`;
      } else {
        return value;
      }
    },
    ...mapActions(useColorsStore, ['darkShade']),
  },

  async mounted() {
    this.title = 'Graph';
    const chartDom = this.$refs.chart as HTMLDivElement;
    chart = echarts.init(chartDom, null, { renderer: 'svg' });
    const dataset = await this.dataset();
    const option = this.chartOptions(dataset);

    chart.setOption(option);
    document.addEventListener('pointerup', this.hideTooltipOnOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener('pointerup', this.hideTooltipOnOutsideClick);
  },

  watch: {
    async month(value) {
      if (/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
        const dataset = await this.dataset();
        const option = this.chartOptions(dataset);

        chart.setOption(option, true);
      }
    },
  },
});
</script>

<style scoped>
input[type="month"] {
  appearance: none;
  background-image: url('~/assets/images/calendar-grey.svg');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 32px 16px;
}
</style>
