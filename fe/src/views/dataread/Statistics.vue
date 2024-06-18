<template>
  <div class="p-8 flex flex-wrap">
      <div class="w-full">
        <div class="flex">
             <p class="text-5xl font-bold"
             style="width: 400px">이력조회</p>
             </div><div>

              <div style="display:flex"> 
              <HeaderDataRead/>
            <div class="flex items-center justify-end w-full h-full"
            style="gap:16px"> 
              
              <EquipmentDropdown 
                :equipmentList="equipmentList" 
                :value="selectedValue" 
                @update:value="handleUpdate">
              </EquipmentDropdown>
              <div class="wrapper text-2xl font-bold " 
                 style="width: 200px;display: flex; align-content: space-around;flex-direction: row;flex-wrap: wrap;">
              <ejs-daterangepicker ref="dateRangePicker" 
                                  style="width: 200px;"
                                  :startDate="startVal"
                                  :endDate="endVal"
                                  :placeholder="waterMark">
              </ejs-daterangepicker>
              
            </div>
            <button @click="getValue"
                      class="text-2xl px-4 get-started text-white font-bold rounded outline-none focus:outline-none mr-1 mb-1 bg-color1 active:bg-emerald-600"
                      style="height:32px"
                      type="button"     
                      click=""       
              >
                조회
              </button>
            </div>
          </div>
          <div>
            <div>
            </div>
          </div>
        </div>
        <div v-if="showGraph"> 
          
          <div class="flex">
            <card-machine-info :infoData="infoData"></card-machine-info>
            <!-- <PieChart :data="totalCount"/> -->
            <CardBarChart :data="totalCount"/>
            <PieChart :data="defectCount"/>
          </div>
          <div>
            <CardLineChart :data="dailyTrend"/>
          </div>
        </div>
        <div v-else class="h-600-px w-screen flex items-center justify-center text-5xl font-bold text-center">
          조회를 진행해주세요
        </div>
      </div>
  </div>
</template>

<script>
import { DateRangePickerComponent as EjsDaterangepicker } from "@syncfusion/ej2-vue-calendars";
import EquipmentDropdown from "@/components/Dropdowns/EquipmentDropdown.vue";
import HeaderDataRead from "@/components/Headers/HeaderDataRead.vue";
import CardMachineInfo from '@/components/Cards/CardMachineInfo.vue';
import CardBarChart from '@/components/Cards/CardBarChart.vue';
import PieChart from '@/components/Cards/PieChart.vue'
import CardLineChart from '@/components/Cards/CardLineChart.vue'
import data from "@/data/statistics.js";
import {inject, ref}  from "vue";
import { onMounted } from "vue";

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
// import {onMounted}  from "vue";



export default {
  components: {
    HeaderDataRead,
    EjsDaterangepicker,
    EquipmentDropdown,
    CardBarChart,
    PieChart,
    CardLineChart,
    CardMachineInfo,
  },
  setup() {
    const startVal = ref(new Date("06/06/2024 12:00 PM"));
    const endVal = ref(new Date("06/20/2024 5:00 PM"));
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
      const axios = inject('axios');

      //Info전달용 props
      const infoData = ref({
        name: '가짜장비1',
        totalRatio: 10,
        startDate:'06/06/2024 12:00 PM',
        endDate:'06/20/2024 5:00 PM',
      })

      onMounted( //장비목록 불러오기
      axios
        .get(`/board/machines`, {
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
        .get(`/board/machines/statistics/${selectedValue.value}/?startDate=${startDate.value}&endDate=${endDate.value}`, {
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
      infoData, //infoData prop데이터
      
    };
  },
};
</script>


<style module>
.e-input-group.e-control-wrapper.e-date-range-wrapper.e-valid-input {
  font-size: var(--font-size-extra-large);
}


.wrapper {
    max-width: 250px;
    margin: 0 auto;
  }


</style>
<!-- 
/* 
  .container {
  display: flex;
  justify-content: space-between; /* div 요소 사이에 공간을 동일하게 분배합니다 */
  align-items: center; /* 세로 방향 가운데 정렬 */
  height: 100px; /* 예시로 설정한 높이. 필요에 따라 조정하세요 */
  background-color: #f0f0f0; /* 배경색 추가 */
  padding: 0 20px; /* 좌우 여백을 추가하여 내용이 너무 가깝지 않게 합니다 */
} */

.item {
  /* 각각의 div 요소에 스타일을 추가할 수 있습니다 */
  padding: 10px; /* 내부 여백을 추가하여 내용을 좀 더 간격있게 합니다 */
  background-color: #ccc; /* 예시로 배경색 추가 */
} -->
