<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded"
    style="height: 20vh; width: 40vw;"
  >
    
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <!-- <h2 class="text-blueGray-700 text-center text-xl font-semibold">
            요일 별 추이
          </h2> -->
        </div>
      </div>
    <div class="p-4 flex-auto">
      <div class="relative ">
        <canvas ref="chart" style="height:18vh"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted,watch } from "vue";
import Chart from "chart.js";

export default {

  props: {
    data: {
      type: Object,
    },
  },  setup(props) {
    // 캔버스 요소 참조
    // chart 변수는 캔버스 요소를 참조하는 데 사용됩니다.
    // ref 함수는 Vue 3에서 반응성 변수를 만들기 위해 사용됩니다.
    // 이 경우, 캔버스 요소를 참조하는 데 사용됩니다.
    const chart = ref(null); // 캔버스 요소 참조
    // 차트 인스턴스
    let myChart = null;

    // 컴포넌트 마운트 시 차트 초기화
    onMounted(() => {
      // 차트 설정
      let config = {
        type: "bar",
        data: {
          labels: [
            "월",
            "화",
            "수",
            "목",
            "금",
            "토",
            "일",
          ],
          datasets: [
            {
              label: '정상',
              backgroundColor: "#001832",
              borderColor: "#ed64a6",
              data: props.data.data[0],
              fill: false,
              barThickness: 20,
            },
            {
              label: '이상',
              fill: false,
              backgroundColor: "#13A1F9",
              borderColor: "#4c51bf",
              data: props.data.data[1],
              barThickness: 20,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Orders Chart",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          scales: {
            xAxes: [
              {
                display: true, //X라벨 표시 결정 
                scaleLabel: {
                  display: false,
                  labelString: "",
                },
                gridLines: {
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(33, 37, 41, 0.3)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                },
                gridLines: {
                  borderDash: [2],
                  drawBorder: false,
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.2)",
                  zeroLineColor: "rgba(33, 37, 41, 0.15)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };
      // 캔버스 요소에 차트 생성
      let ctx = chart.value.getContext("2d");
      myChart = new Chart(ctx, config);
    });

    // 데이터 변경 시 차트 업데이트
    const updateChart = () => {
      if (myChart) {
        // 차트 데이터 업데이트
        myChart.data.datasets[0].data = props.data.data[0];
        myChart.data.datasets[1].data = props.data.data[1];

        // 차트 업데이트
        myChart.update();
      }
    };

    // 데이터 변경 시 차트 업데이트
    watch(() => props.data, () => {
      console.log('바차트 watch 작동')
      updateChart();
    }, { deep: true });
    // watch로 처리하는 방법: watch(()=>변수명, 실행할 콜백함수, {설정});

    return {
      chart
    };
  },
};
</script>

