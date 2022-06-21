<template>
  <div>
    <canvas id="barChart" class="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  props: {
    labels: {
      required: false,
      default: ["Monday", "Tuesday", "Sunday"],
    },
    data: {
      required: false,
      default: [10000, 12090, 15090],
    },
  },
  data() {
    return {
      planetChartData: {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Title",
              data: this.data,
              backgroundColor: ["#82bc3e", "#ff7d0b"],
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: false,
              text: "Custom Chart Title",
              padding: {
                top: 10,
                bottom: 30,
              },
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
        },
      },
    };
  },
  mounted() {
    const ctx = document.getElementById("barChart").getContext("2d");
    Chart.defaults.color = "#f1f1f1";
    new Chart(ctx, this.planetChartData);
  },
};
</script>
<style scoped>
.chart {
  height: 14em !important;
}
</style>
