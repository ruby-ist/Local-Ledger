<template>
  <div>
    <div ref="chart" class="w-300 h-300" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
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
  },

  methods: {
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

      for (let date = 2; date < this.endDateOfMonth; date++) {
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
          color: new graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#000' },
            { offset: 0.5, color: `#${this.darkShade(tag.color, 40)}` },
            { offset: 1, color: tag.color },
          ]),
        },
        data: dailyProgression,
        showSymbol: false,
        lineStyle: { color: tag.color, width: 1 },
      };
    },

    async dataset(): Promise<SeriesOption[]> {
      const dataset: SeriesOption[] = [];
      const groups = await this.fetchLogGroups();
      const tags = await this.fetchTagForGroups(groups);
      groups.forEach((logs, tagId) => {
        const dailyProgression = this.convertToDailyProgression(logs);
        const tag = tags.find(tag => tag.id === tagId) as Tag;
        dataset.push(this.createSeriesOption(tag, dailyProgression));
      });

      return dataset;
    },

    chartOptions(series: SeriesOption[]) {
      return {
        color: ['#d9d9d9', '#5272F2', '#6ac066', '#ef9798', '#e57939'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          orient: 'vertical',
          right: 'center',
          data: ['Others', 'Food', 'Snacks', 'Grocery', 'Rent'],
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
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false,
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
    const myChart = echarts.init(chartDom, null, { renderer: 'svg' });
    const dataset = await this.dataset();
    const option = this.chartOptions(dataset);

    myChart.setOption(option);
  },
});
</script>
