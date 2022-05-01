<template>
  <LineChart :chartData="data" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: 'LineChartComponent',
  components: { LineChart },
  props: ['chartData', 'player1', 'player2', 'player3', 'player4',],
  setup(props) {
    let rangeArray = []
    for (let i = 1; i <= props.chartData.player1.length; i++) {
        rangeArray.push(i)
    }
    const data = {
    labels : rangeArray,
      datasets: [
        {
          label: props.player1,
          data: props.chartData.player1,
          showLine: true,
          backgroundColor: '#3366CCA0',
          borderColor: '#3366CCA0',
        },
        {
          label: props.player2,
          data: props.chartData.player2,
          showLine: true,
          backgroundColor: '#DC3912A0',
          borderColor: '#DC3912A0',
        },
        {
          label: props.player3,
          data: props.chartData.player3,
          showLine: true,
          backgroundColor: '#FF9900A0',
          borderColor: '#FF9900A0',
        },
        {
          label: props.player4,
          data: props.chartData.player4,
          showLine: true,
          backgroundColor: '#109618A0',
          borderColor: '#109618A0',
        },
      ],
    };

    return { data };
  },
});
</script>
