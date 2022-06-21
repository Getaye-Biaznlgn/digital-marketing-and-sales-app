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
      planetChartData: {
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
    };
  },
  mounted() {
    const ctx = document.getElementById("pieChart").getContext("2d");
    
    new Chart(ctx, this.planetChartData);
     Chart.defaults.color = "#f1f1f1";
  },
};
</script>
