<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <h1>구간을 선택하세요</h1>
        <div class="flex">
          <EquipmentDropdown :equipmentList="equipmentList" :value="selectedValue"  @update:value="handleUpdate"></EquipmentDropdown>
          <div class="wrapper">
            <ejs-daterangepicker ref="dateRangePicker" 
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
          <button @click="getValue">Get Value</button>

          {{ startVal }} ~ {{ endVal }}
        </div>
        <div v-if="showGraph" class="flex"> 
          <CardLineChart :data="dailyTrend"/>
          <!-- <PieChart :data="data.totalCount"/>
          <PieChart :data="data.faultType"/> -->
          <PieChart :data="totalCount"/>
          <PieChart :data="defectCount"/>
        </div>
        <div v-else class="h-600-px w-screen flex items-center justify-center text-5xl font-bold text-center">조회를 진행해주세요</div>
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
import {ref}  from "vue";
// import axios from "axios";

export default {
  components: {
    EjsDaterangepicker,
    EquipmentDropdown,
    PieChart,
    CardLineChart,
  },
  setup() {
    const startVal = ref(new Date("01/06/2024 12:00 PM"));
    const endVal = ref(new Date("06/06/2024 5:00 PM"));
    const selectedValue = ref('option1');
    const waterMark = "Select a Range";
    const equipmentList = ['L-SF-04','L-SF-05']
    const dateRangePicker = ref(null);
    // 값을 저장할 변수
    const inputValue = ref('');
      const startDate = ref();
      const endDate = ref();
      const showGraph= ref(false);


         // 자식 컴포넌트로부터 받은 값 처리
     const handleUpdate = (value) => {
      selectedValue.value = value;
      console.log('부모 컴포넌트에서 선택된 값:', value);
    };

    const dailyTrend =ref({
      data:[],
      labels:[],

      
    });
    const defectCount =ref({
      data:[1,1],
      labels:['정상','이상'],
    });
    const totalCount =ref({
      data:[1,1,1],
      labels:['a','b','c'],
    });

    // 값을 가져오는 함수

    const getValue = () => {
     
        showGraph.value=true
      

      
    
      const inputElement = document.querySelector('.wrapper .e-control.e-daterangepicker.e-lib.e-input.e-keyboard');
      
      if (inputElement) {
        inputValue.value = inputElement.value;
        console.log(inputValue.value);
         startDate.value = inputElement.value.split(' - ')[0];
          endDate.value = inputElement.value.split(' - ')[1];
      }
      
      console.log(startDate.value)
      console.log(endDate.value)
      console.log(selectedValue.value)

      // axios
      //   .get(`http://192.168.0.64:3000/dataread/statistics/${equipmentList.value[0]}?startDate=${startDate.value}&endDate=${endDate.value}`, {
      //     headers: {
      //       authorization:
      //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
      //     }
      //   })
      //   .then((response) => {
      //     // 요청이 성공하면 실행되는 코드
      //     console.log('Response:', response.data)
      //     dailyTrend.value=response.data.dailyTrend
      //     totalCount.value=response.data.totalCount
      //     defectCount.value=response.data.defectCount
      //     showGraph.value=true
      //   })
      //   .catch((error) => {
      //     // 요청이 실패하면 실행되는 코드
      //     console.error('Error:', error)
      //     showGraph.value=true

      //   })


      console.log(data.dailyTrend)
      console.log(data.dailyTrend)
    

     
      dailyTrend.value=data.dailyTrend
      totalCount.value=data.totalCount
      defectCount.value=data.defectCount
      console.log(defectCount.value)
      console.log(defectCount.value)
    };





  
    

    return {
      startVal,
      endVal,
      waterMark,
      data,
      equipmentList,
      getValue,
      handleUpdate,
      dateRangePicker,
      selectedValue,
      defectCount,
      totalCount,
      dailyTrend,
      showGraph,
    };
  },
};
</script>

