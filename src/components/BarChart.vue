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
      default: [
        "Monday",
        "Tuesday",
        "Sunday",
        "Wednesday",
        "Friday",
        "Saturday",
        "Thursdary",
      ],
    },
    data: {
      required: false,
      default: [100, 100, 100, 100, 100, 100, 100],
    },
  },
  data() {
    return {
      salesChartData: {
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
      salesChart:null
    };
  },
  methods: {
    drawGraph() {
      if(this.salesChart)
         this.salesChart.destroy()
      const ctx = document.getElementById("barChart").getContext("2d");
      Chart.defaults.color = "#f1f1f1";
     this.salesChart= new Chart(ctx, this.salesChartData);
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
     this.drawGraph()

    },
  },
};
</script>
<style scoped>
.chart {
  height: 14em !important;
}
</style>
