<template>
  <div class="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rounded bg-blueGray-700">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <!-- <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
            Overview
          </h6> -->
          <h2 class="text-white text-xl font-semibold">
            <!-- {{ data.title }} -->
            <!-- <button @click="addData">진동검사 </button> -->

          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <!-- Chart -->
      <div class="relative h-full w-150-px">
        <canvas ref="chart" ></canvas>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js";
import {watch} from "vue";

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  setup(props) {
    const chart = ref(null);
    let myChart = null;
    const addData = () => {
      if (myChart) {
        console.log("차트", myChart);
        console.log(props.data);

        myChart.data.datasets[0].data = [10,0, 100, 0, 10000];
        myChart.data.labels = props.data.labels;

        myChart.update();
      }
    };

    onMounted(() => {
      let config = {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "vertical",
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [],
              fill: false,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Sales Charts",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            x: {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              grid: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
            y: {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              grid: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
              min: 0,
            },
          },
        },
      };

      if (chart.value) {
        let ctx = chart.value.getContext("2d");
        myChart = new Chart(ctx, config);
      }
    });

    const updateChart = () => {
      console.log('업데이트 실행진입')
      console.log('업데이트 실행진입')
   

      if (myChart) {
        console.log('수정진입')
        console.log(props.data.data[0])
        myChart.data.datasets[0].data = props.data.data;
        myChart.data.labels = props.data.labels;
        myChart.update();
        console.log('수정완료')

      }
    };

    const watcher = watch(() => props.data, () => {
      updateChart();
    }, { deep: true });

    return { chart, addData,watcher };
  },
};
</script>

