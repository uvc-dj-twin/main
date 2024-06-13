<template>
  <div class="p-8">
    <div class="flex flex-wrap mt-4">
      <div class="w-full">
        <div class="flex flex-wrap">
        <HeaderDataRead/>
          
            <EquipmentDropdown :equipmentList="equipmentList" :value="selectedValue"  @update:value="handleUpdate"></EquipmentDropdown>
            <div class="wrapper"
            style="width:200px;
            height:60px">
              <ejs-daterangepicker ref="dateRangePicker" 
            style="width: 200px;"
          :startDate="startVal"
        :endDate="endVal"
      :placeholder="waterMark"
    ></ejs-daterangepicker>
    </div>
          <button
            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"     
            click=""       
          >
            조회
          </button>
          <button @click="getValue">Get Value</button>

          {{ startVal }} ~ {{ endVal }}
        </div>
        <div v-if="showGraph"> 
          <div>
          <CardLineChart :data="dailyTrend"/>
          </div>
          <div class="flex">
          <PieChart :data="totalCount"/>
          <PieChart :data="defectCount"/></div>
        </div>
        <div v-else class="h-600-px w-screen flex items-center justify-center text-5xl font-bold text-center">조회를 진행해주세요</div>
      </div>
    </div>










  </div>
</template>

<script>
import { DateRangePickerComponent as EjsDaterangepicker } from "@syncfusion/ej2-vue-calendars";
import EquipmentDropdown from "@/components/Dropdowns/EquipmentDropdown.vue";
import HeaderDataRead from "@/components/Headers/HeaderDataRead.vue";
import PieChart from '@/components/Cards/PieChart.vue'
import CardLineChart from '@/components/Cards/CardLineChart.vue'
import data from "@/data/statistics.js";
import {ref}  from "vue";
import axios  from "axios";
import { onMounted } from "vue";
// import {onMounted}  from "vue";

export default {
  components: {
    HeaderDataRead,
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
    const equipmentList = ref(['가짜장비1','L-SF-05'])
    // const equipmentList1 =ref([])
    const dateRangePicker = ref(null);
    // 값을 저장할 변수
    const inputValue = ref('');
      const startDate = ref();
      const endDate = ref();
      const showGraph= ref(false);

      onMounted( //장비목록 불러오기
        axios
        .get(`http://192.168.0.64:3000/board/machines`, {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
          }
        })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          
          equipmentList.value = response.data
          console.log(equipmentList.value)
        //   equipmentList.value =response.data.map((x)=>x.name)
        //   console.log(equipmentList.value)
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)
          showGraph.value=true

        })
      )


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

      axios
        .get(`http://192.168.0.64:3000/board/machines/statistics/${selectedValue.value}/?startDate=${startDate.value}&endDate=${endDate.value}`, {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
          }
        })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          dailyTrend.value=response.data.dailyTrend
          totalCount.value=response.data.totalCount
          defectCount.value=response.data.defectCount
          console.log(dailyTrend.value)
          showGraph.value=true
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)
          showGraph.value=true

        })


      console.log(dailyTrend.value)
    

     
      dailyTrend.value=data.dailyTrend
      totalCount.value=data.totalCount
      defectCount.value=data.defectCount
  
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


<style>

.e-input-group.e-control-wrapper.e-date-range-wrapper {
  height: 100%;
}
</style>