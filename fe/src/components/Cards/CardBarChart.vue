<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
    style="height: 18vw; margin-bottom: 22px; width: 50vw;"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h2 class="text-blueGray-700 text-xl font-semibold">
            요일 별 추이
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative ">
        <canvas ref="chart"></canvas>
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
    const chart = ref(null);
    let myChart = null;

    console.log()
    onMounted(() => {
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
              backgroundColor: "#13A1F9",
              borderColor: "#ed64a6",
              data: props.data.data[0],
              fill: false,
              barThickness: 8,
            },
            {
              label: '이상',
              fill: false,
              backgroundColor: "#001832",
              borderColor: "#4c51bf",
              data: props.data.data[1],
              barThickness: 8,
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
                display: false,
                scaleLabel: {
                  display: true,
                  labelString: "Month",
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
      let ctx = chart.value.getContext("2d");
      myChart = new Chart(ctx, config);
    });

    const updateChart = () => {
      if (myChart) {
       
        console.log(props.data.data[0])
        console.log(props.data.data[0])
        console.log(props.data.data[0])

        
        myChart.data.datasets[0].data = props.data.data[0];
        myChart.data.datasets[1].data = props.data.data[1];

        myChart.update();
      }
    };

  
    watch(() => props.data, () => {
      console.log('bar chart watch 작동')
      
      updateChart();
    }, { deep: true });
    // watch로 처리하는 방법: watch(()=>변수명, 실행할 콜백함수, {설정});

    return {
      chart
    };
  },
};
</script>

