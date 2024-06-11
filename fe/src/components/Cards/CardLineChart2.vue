<template>
<div class="modal relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">    
  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <!-- <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
            Overview
          </h6> -->
          <h2 class="text-white text-xl font-semibold">
            <!-- {{ data.title }} -->
            <button @click="addData">전류검사 </button>

          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <!-- Chart -->
      <div class="relative h-150-px w-1200-px">
        <canvas ref="chart" class="relative h-150-px w-1200-px">></canvas>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {watch} from 'vue';
import Chart from "chart.js";

export default {
  setup(props) {
    const chart = ref(null);
    let myChart = null;
    const {data} = props

    const addData = () => {
      if (myChart) {
        console.log("차트", myChart);
        console.log(data);

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
        type: "line",
        data: {
          labels: Array.from({length: 101}, (_, i) => i),
          datasets: [
            {
              label: 'X',
              backgroundColor: "white",
              borderColor: "white",
              data: Array.from({length: 101}, () => Math.floor(Math.random() * 100)),
              fill: false,
              borderWidth: 1, // 꺾은선 굵기 2픽셀로 설정
            },
            {
              label: 'Y',
              backgroundColor: "red",
              borderColor: "red",
              data: Array.from({length: 101}, () => Math.floor(Math.random() * 100)),
              fill: false,
              borderWidth: 1, // 꺾은선 굵기 2픽셀로 설정

            },
            {
              label: 'Z',
              backgroundColor: "green",
              borderColor: "green",
              data: Array.from({length: 101}, () => Math.floor(Math.random() * 100)),
              fill: false,
              borderWidth: 1, // 꺾은선 굵기 2픽셀로 설정

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
      
        myChart.data.labels = Array.from({length: 120}, (_, i) => i * (3 / 119));
        myChart.data.datasets[0].data = props.data.data[0];
        myChart.data.datasets[1].data = props.data.data[1];
        myChart.data.datasets[2].data = props.data.data[2];

        myChart.update();
        console.log('수정완료')

      }
    };

    const watcher = watch(() => props.data, () => {
      updateChart();
    }, { deep: true });
    // watch로 처리하는 방법: watch(()=>변수명, 실행할 콜백함수, {설정});


    return { chart,addData,watcher };
  },
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style>
.chartjs-size-monitor {
  height: 2000px; /* 원하는 높이 설정 */
}

</style>
