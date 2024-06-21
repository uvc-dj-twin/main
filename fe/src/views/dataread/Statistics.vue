<template>
  <div class="px-8 flex flex-wrap">
    <div class="w-full">
      <div class="flex">
        <p class="text-5xl font-bold" style="width: 400px"></p>
      </div>
      <div>

        <div style="display:flex">
          <HeaderDataRead />
          <div class="flex items-center justify-end w-full h-full" style="gap:16px; height: 65px;">

<div class="flex flex-col">
  
</div>
            <label>설비 선택</label>
            <EquipmentDropdown :equipmentList="equipmentList" :value="selectedValue" @update:value="handleUpdate"></EquipmentDropdown>
            <label>기간 선택</label>
            <div class="wrapper text-2xl font-bold "
              style="width: 200px;display: flex; align-content: space-around;flex-direction: row;flex-wrap: wrap;">
              <ejs-daterangepicker ref="dateRangePicker" style="width: 200px;" :startDate="startVal" :endDate="endVal"
                :placeholder="waterMark">
              </ejs-daterangepicker>

            </div>
            <button @click="getValue"
              class="text-xl px-4 py-1 get-started  font-bold rounded outline-none focus:outline-none mr-1 mb-1 bg-color1 active:bg-color1 bg-white border-2 border-blueGray-600 text-black active:bg-emerald-600"
              style="line-height: 20px; height:32px" type="button" click="">
              조회
            </button>
          </div>
        </div>
        <div>
          <div>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="h-500-px w-screen flex items-center justify-center text-5xl font-bold text-center">
        <div class="spinner" :style="{ transform: `rotate(${rotationDegree}deg)` }" style="  width: 50px;
                height: 50px;
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-left-color: #7986cb;
                border-radius: 50%;"></div>
      </div>
      <!-- <div v-else-if="true" class="h-600-px w-screen flex items-center justify-center text-5xl font-bold text-center">
          조회를 진행해주세요
        </div> -->
      <div v-else-if="showGraph">

        <div class="flex">
          <card-machine-info :infoData="infoData"></card-machine-info>
          <!-- <PieChart :data="totalCount"/> -->
          <CardBarChart :data="totalCount" />
          <PieChart :data="defectCount" />
        </div>
        <div>
          <CardLineChart :data="dailyTrend" />
        </div>
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
import { inject, ref, watch } from "vue";
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
    const equipmentList = ref(['가짜장비1', 'L-SF-05'])
    // const equipmentList1 =ref([])
    const dateRangePicker = ref(null);
    // 값을 저장할 변수
    const inputValue = ref('');
    const startDate = ref();
    const endDate = ref();
    const showGraph = ref(false);
    const axios = inject('axios');

    //Info전달용 props
    const infoData = ref({
      name: '가짜장비1',
      serialNo: 'L-SF-04',
      totalRatio: 1000,
      startDate: '01/01/2024 12:00 PM',
      endDate: '01/01/2024 5:00 PM',
    })

    onMounted( //장비목록 불러오기

      () => {

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
            // equipmentList[0].id
            selectedValue.value=equipmentList.value[0].id
            // getValue(); //
          })
          .catch((error) => {
            // 요청이 실패하면 실행되는 코드
            console.error('Error:', error)
            showGraph.value = true

          })

        
      }


    )


    // 자식 컴포넌트로부터 받은 값 처리
    const handleUpdate = (value) => {
      selectedValue.value = value;
      console.log('부모 컴포넌트에서 선택된 값:', value);
    };

    const dailyTrend = ref({
      data: [],
      labels: [],
    });
    const defectCount = ref({
      data: [1, 1],
      labels: ['정상', '이상'],
    });
    const totalCount = ref({
      data: [1, 1, 1],
      labels: ['a', 'b', 'c'],
    });

    // 값을 가져오는 함수

    const getMachineInfo = () => {
      let sumP = 0;
      let sumF = 0;
      totalCount.value.data[0].forEach(number => {
        sumP += number;
      });
      totalCount.value.data[1].forEach(number => {
        sumF += number;
      });


      /////////////
      infoData.value.name = equipmentList.value.find(option => option.id === selectedValue.value).name
      infoData.value.serialNo = equipmentList.value.find(option => option.id === selectedValue.value).serialNo
      infoData.value.totalRatio = Math.round(sumF * 100 / sumP)
      infoData.value.startDate = dailyTrend.value.labels[0]
      infoData.value.endDate = dailyTrend.value.labels[dailyTrend.value.labels.length - 1]
      //설비명,장비시리얼, 이상율,날짜 확인완료//
      //
    }

    const getValue = () => {
      isLoading.value = true //로딩확인변수 활성화 

      showGraph.value = true

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
          isLoading.value = false //로딩 종료 후 false처리

          console.log('Response:', response.data)
          dailyTrend.value = response.data.dailyTrend
          console.log('DailyTrend:', dailyTrend.value)
          totalCount.value = response.data.totalCount
          defectCount.value = response.data.defectCount

          getMachineInfo();

          showGraph.value = true
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          isLoading.value = false //로딩 종료 후 false처리

          console.error('Error:', error)
          showGraph.value = true

        })
      console.log(dailyTrend.value)
    };

    /////////// 회전관련///////////

    const isLoading = ref(false);
    let rotationDegree = ref(0);
    let rotateInterval;

    const startRotation = () => {
      // 회전 각도 초기화
      rotationDegree.value = 0;
      // 회전 각도를 10도씩 증가시키는 인터벌 설정
      rotateInterval = setInterval(() => {
        rotationDegree.value += 10; // 회전 속도 조절 가능
      }, 100); // 회전 속도 조절 가능
    };

    const stopRotation = () => {
      clearInterval(rotateInterval); // 회전 인터벌 종료
    };

    watch(() => isLoading.value, (newValue) => {
      if (newValue) {
        startRotation(); // 회전 시작
      } else {
        stopRotation(); // 회전 종료
      }
    });








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
      isLoading, //TF ref변수
      rotationDegree, // 회전각도 ref변수

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
