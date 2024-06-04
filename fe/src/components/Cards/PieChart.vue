
<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h2 class="text-blueGray-700 text-xl font-semibold">
            {{ data.title }}
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <!-- <canvas ref="chart"></canvas> -->
        <canvas ref="chart"></canvas>

        <button @click="addData">버튼 </button>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js";  

export default {
  setup(props) {
    const chart = ref(null);
    let myChart = null;
    const {data} = props

    const addData = () => {
      if (myChart) {
        console.log("차트", myChart);
        console.log(data.data);

        // 기존 데이터에 새로운 값을 추가하기 위해서는 배열의 push 메소드를 사용합니다.
        // 새로운 값은 숫자 10으로 설정되어 있습니다.

        
        myChart.data.datasets[0].data=data.data;
        myChart.data.labels = data.labels;
        

        // myChart.data.datasets[0].data=[10, 78, 56, 34, 100, 45, 130];
        // 차트를 업데이트 해줍니다. 이렇게 업데이트 하면 새로운 데이터가 차트에 표시됩니다.
        myChart.update();
      }
    }

    onMounted(() => {
      let config = {
        type: "pie", // 원 그래프를 그립니다.
        data: {
          labels: [
            "데이터111", // 원 그래프의 라벨을 설정합니다.
          ],
          datasets: [
            {
              label: "주문", // 그래프 제목을 설정합니다.
              backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#FFD700", "#20B2AA", "#FFA07A", // 원 그래프의 색상을 설정합니다.
              ],
              data: [30, 78, 56, 34, 100, 45, 130], // 각 원의 데이터를 설정합니다.
            },
          ],
        },
        options: {
          maintainAspectRatio: false, // 원 그래프의 비율을 유지시키지 않습니다.
          responsive: true, // 화면 크기에 따라 그래프를 변경합니다.
          title: {
            display: false, // 제목을 표시하지 않습니다.
            text: "주문 차트", // 차트 제목을 설정합니다.
          },
          legend: {
            position: "bottom", // 범례를 차트 아래에 배치합니다.
          },
        },
      };

      if (chart.value) {
        let ctx = chart.value.getContext("2d");
        myChart = new Chart(ctx, config);
      }
    });

    return { chart, addData };
  },
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

