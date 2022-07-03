<template>
  <div>
    <canvas id="pieChart"></canvas>
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
      default: [1000, 1200, 1500],
    },
  },
  data() {
    return {
      salesChartData: {
        type: "pie",
        data: {
          labels: this.labels,
          datasets: [
            {
              labels: "Title",
              data: this.data,
              backgroundColor: ["#ffffff", "#ff7d0b", "#82bc3e"],
            },
          ],
        },
        //
        options: {
          plugins: {
            title: {
              // display: false,
              // text: "Custom Chart Title",
              // padding: {
              //   top: 10,
              //   bottom: 30,
              // },
            },
            legend: {
              display: true,
              position: "right",
            },
          },
        },
      },
      salesChart:null
    };
  },
  // mounted() {
  //   const ctx = document.getElementById("pieChart").getContext("2d");
  //   new Chart(ctx, this.salesChart);
  //    Chart.defaults.color = "#f1f1f1";
  // },
  methods: {
    drawGraph() {
      if (this.salesChart) this.salesChart.destroy();
      const ctx = document.getElementById("pieChart").getContext("2d");
      Chart.defaults.color = "#f1f1f1";
      this.salesChart = new Chart(ctx, this.salesChartData);
    },
  },
  mounted() {
    this.drawGraph();
  },
  watch: {
    labels(values) {
      this.salesChartData.data.labels = values;
    },
    data(values) {
      this.salesChartData.data.datasets[0].data = values;
      this.drawGraph();
    },
  },
};
</script>
