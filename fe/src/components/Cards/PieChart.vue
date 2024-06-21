<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded"
  style=" height: 20vh; width: 50vw;">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <!-- <h2 class="text-center text-blueGray-700 text-xl font-semibold">
            이상 유형 비율
          </h2> -->
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative">
        <canvas ref="chart" style="height: 15vh"></canvas>
        <!-- <button @click="addData">버튼</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted  } from "vue";
import {watch} from "vue";
// import {watch} from "vue";

import Chart from "chart.js";

export default {
  props: {
    data: {
      type: Object,
      default: () => ({ data: [1, 1], labels: ['양', '불'] }),
    },
  },
  setup(props) {
    const chart = ref(null);
    let myChart = null;

    const initializeChart = () => {
      const config = {
        type: "pie",
        data: {
          labels: props.data.labels,
          datasets: [
            {
              label: "주문",
              backgroundColor: [
                "#001832", "#326B98", "#13A1F9", "#98F1F8", "#FFD700", "#20B2AA", "#FFA07A",
              ],
              data: props.data.data,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "주문 차트",
          },
          legend: {
            position: "bottom",
          },
        },
      };

      if (chart.value) {
        const ctx = chart.value.getContext("2d");
        myChart = new Chart(ctx, config);
      }
    };

    const updateChart = () => {
      if (myChart) {
        myChart.data.labels = props.data.labels;
        myChart.data.datasets[0].data = props.data.data;
        myChart.update();
      }
    };

    const addData = () => {
      if (myChart) {
        console.log("차트", myChart);
        console.log(props.data);
        updateChart();
      }
    };

    onMounted(() => {
      initializeChart();
    });

    watch(() => props.data, () => {
      updateChart();
    }, { deep: true });
    // watch로 처리하는 방법: watch(()=>변수명, 실행할 콜백함수, {설정});
    
    return { chart, addData, };
  },
};
</script>
