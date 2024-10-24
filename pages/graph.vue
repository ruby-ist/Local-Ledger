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
    async dataset(): Promise<SeriesOption[]> {
      const logs = await db.logs.orderBy('tagId').toArray();
      const groups = Map.groupBy(logs, log => (log as LogWithTagId).tagId);
      const tags = await db.tags.where('id').anyOf(groups.keys().toArray()).toArray();
      const dataset: SeriesOption[] = [];

      groups.forEach((logs, tagId) => {
        const dateWiseGroup = Map.groupBy(logs, (log) => {
          const createdAt = new Date(log.createdAt);
          return createdAt.getDate();
        });

        const dateWiseTotal = new Map();

        dateWiseGroup.forEach((logs, date) => {
          const totalAmount = logs.reduce((total, log) => total + log.amount, 0);
          dateWiseTotal.set(date, totalAmount);
        });

        const amount = dateWiseTotal.has(1) ? [0, dateWiseTotal.get(1)] : [0, 0];

        for (let date = 2; date < this.endDateOfMonth; date++) {
          if (dateWiseTotal.has(date)) {
            amount.push(amount[date - 1] + dateWiseTotal.get(date));
          } else {
            amount.push(amount[date - 1]);
          }
        }

        const tag = tags.find(tag => tag.id === tagId) as Tag;

        dataset.push({
          name: tag.name,
          type: 'line',
          stack: 'Total',
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#000',
              },
              {
                offset: 0.5,
                color: `#${this.darkShade(tag.color, 50)}`,
              },
              {
                offset: 1,
                color: tag.color,
              }]),
          },
          data: amount,
          showSymbol: false,
          lineStyle: { color: tag.color, width: 1 },
        });
      });

      return dataset;
    },
    ...mapActions(useColorStore, ['darkShade']),
  },

  async mounted() {
    this.$emit('setTitle', 'Graph');

    const chartDom = this.$refs.chart as HTMLDivElement;
    const myChart = echarts.init(chartDom, null, { renderer: 'svg' });
    const datasets = await this.dataset();

    const option = {
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
      series: datasets,
    };

    myChart.setOption(option);
  },
});
</script>
