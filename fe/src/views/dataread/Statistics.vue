<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <h1>구간을 선택하세요</h1>
        <div class="flex">
          <EquipmentDropdown></EquipmentDropdown>
          <div class="wrapper">
            <ejs-daterangepicker
              :startDate="startVal"
              :endDate="endVal"
              :placeholder="waterMark"
            ></ejs-daterangepicker>
          </div>
          <button
            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            조회
          </button>
        </div>
        <div class="flex"> 

          <CardLineChart :data="data.serialData"/>
          <PieChart :data="data.totalCount"/>
          <PieChart :data="data.faultType"/>


        

        </div>

      </div>
    </div>










  </div>
</template>

<script>
import { DateRangePickerComponent as EjsDaterangepicker } from "@syncfusion/ej2-vue-calendars";
import EquipmentDropdown from "@/components/Dropdowns/EquipmentDropdown.vue";
import PieChart from '@/components/Cards/PieChart.vue'
import CardLineChart from '@/components/Cards/CardLineChart.vue'
import data from "@/data/statistics.js";

export default {
  components: {
    EjsDaterangepicker,
    EquipmentDropdown,
    PieChart,
    CardLineChart,
  },
  setup() {
    const startVal = new Date("11/12/2019 12:00 PM");
    const endVal = new Date("11/25/2019 5:00 PM");
    const waterMark = "Select a Range";
    return {
      startVal,
      endVal,
      waterMark,
      data,
      
    };
  },
};
</script>

