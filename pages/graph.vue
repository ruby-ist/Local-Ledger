<template>
  <div>
    <div ref="chart" class="w-280 h-300 ml-20 mb-40" />
    <div class="ml-50">
      <h3 class="pl-15">Tags</h3>
      <div class="flex row wrap mb-40">
        <GraphLegend v-for="tag in tags" :key="tag.id" :tag="tag" @toggle-legend="toggleLegend" />
      </div>
      <div font="s-1.1rem">
        <div class="mb-15"><b>Spent:&ensp;</b>{{ currencySymbol + totalAmount }}</div>
        <div class="mb-15"><b>Remaining:&ensp;</b>{{ currencySymbol + (target - totalAmount) }}</div>
        <div class="mb-15"><b>Days Left:&ensp;</b>{{ endDateOfMonth - currentDate }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
let chart: ECharts;

export default defineNuxtComponent({
  data: () => ({
    tags: [] as Tag[],
    totalAmount: 0,
  }),

  emits: {
    setTitle(payload: string) {
      return payload.length > 0;
    },
  },

  computed: {
    endDateOfMonth(): number {
      const today = new Date();
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return monthEnd.getDate();
    },

    currentDate(): number {
      // return (new Date()).getDate();
      return 7;
    },
    ...mapState(useSettingsStore, { currencySymbol: 'currency', target: 'target' }),
  },

  methods: {
    toggleLegend(name: string) {
      if (chart) {
        chart.dispatchAction({
          type: 'legendToggleSelect',
          name: name,
        });
      }
    },

    hideTooltip(event: Event) {
      const chartElement = chart.getDom();
      if (!chartElement.contains(event.target as Node)) {
        chart.dispatchAction({ type: 'hideTip' });
        chart.dispatchAction({
          type: 'updateAxisPointer',
          currTrigger: 'leave',
        });
      }
    },

    async fetchLogGroups(): Promise<Map<number, Log[]>> {
      const logs: Log[] = await db.logs.orderBy('tagId').toArray();

      return Map.groupBy(logs, (log) => {
        return (log as LogWithTagId).tagId;
      });
    },

    async fetchTagForGroups(groups: Map<number, Log[]>): Promise<Tag[]> {
      return await db.tags.where('id')
                          .anyOf(groups.keys().toArray())
                          .toArray();
    },

    groupByDate(logs: Log[]): Map<number, Log[]> {
      return Map.groupBy(logs, (log) => {
        const createdAt = new Date(log.createdAt);
        return createdAt.getDate();
      });
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
          color: new graphic.LinearGradient(1, 0, 0, 1, [
            { offset: 0, color: '#000' },
            { offset: 0.25, color: `${this.darkShade(tag.color, 50)}` },
            { offset: 0.5, color: `${this.darkShade(tag.color, 20)}` },
            { offset: 0.75, color: `${this.darkShade(tag.color, 50)}` },
            { offset: 1, color: '#000' },
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
      const groups = await this.fetchLogGroups();
      this.tags = await this.fetchTagForGroups(groups);
      groups.forEach((logs, tagId) => {
        const dailyProgression = this.convertToDailyProgression(logs);
        const tag = this.tags.find(tag => tag.id === tagId) as Tag;
        dataset.push(this.createSeriesOption(tag, dailyProgression));
        this.totalAmount += dailyProgression[dailyProgression.length - 1];
      });

      return dataset;
    },

    chartOptions(series: SeriesOption[]) {
      return {
        color: this.tags.map(tag => (tag.color)),
        legend: { show: false },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              opacity: 0.5,
              color: '#fff',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false,
            },
            data: [...Array(this.currentDate + 1).keys()],
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: (value: string, _index: number) => {
                const amount = parseInt(value);
                if (amount >= 1_000_000) {
                  return `${Math.round(amount / 10000) / 100}M`;
                } else if (amount >= 1_000) {
                  return `${Math.round(amount / 10) / 100}k`;
                } else {
                  return value;
                }
              },
            },
          },
        ],
        series,
      };
    },

    ...mapActions(useColorStore, ['darkShade']),
  },

  async mounted() {
    this.$emit('setTitle', 'Graph');

    const chartDom = this.$refs.chart as HTMLDivElement;
    chart = echarts.init(chartDom, null, { renderer: 'svg' });
    const dataset = await this.dataset();
    const option = this.chartOptions(dataset);

    chart.setOption(option);
    document.addEventListener('pointerup', this.hideTooltip);
  },

  unmounted() {
    document.removeEventListener('pointerup', this.hideTooltip);
  },
});
</script>
