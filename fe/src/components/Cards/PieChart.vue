<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            Performance
          </h6>
          <h2 class="text-blueGray-700 text-xl font-semibold">
            Total orders
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <canvas ref="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";  
export default {
  setup() {
    const chart = ref(null);

    onMounted(() => {
      let config = {
        type: "pie",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "Orders",
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#8A2BE2",
                "#FFD700",
                "#20B2AA",
                "#FFA07A",
              ],
              data: [30, 78, 56, 34, 100, 45, 13],
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
          legend: {
            position: "bottom",
          },
        },
      };

      if (chart.value) {
        let ctx = chart.value.getContext("2d");
        new Chart(ctx, config);
      }
    });

    return { chart };
  },
};
</script>
