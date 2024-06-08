<template>
  <div
    
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            실시간 모니터링 결과
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              장비명 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Threshold 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              전류검사 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              전류 판정결과
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
               검사시간
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              전동검사
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
               전동 판정결과
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
               검사 시간
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
               상세보기
            </th>
           
         
            <!-- 추가칼럼 설정용 
              <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            ></th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result,index) in props.dataRealtimeCard" :key="index">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
            >
              <span
                class="ml-3 font-bold"
                :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >{{ result.equipmentSerialNo }}
              <br>
              {{ result.equipmentName }}
              </span>
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
            <div class="flex items-center">
                <span class="mr-2">{{ result.thresholdCount }}<br> 
                  <br></span>
                <div class="relative w-full">
                  <div
                    
                  >
                    <div
                    style="width: 90%;"
                      class="big-circle"
                    >{{  result.thresholdPercent }} </div>
                  </div>
                </div>
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
            <div class="flex items-center">
                <span class="mr-2">{{  result.currentFailCount }} /{{ result.currentCount }}
                  <br></span>
                <div class="relative w-full">
                  <div
                    class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                  >
                    <div
                      style="width: 90%;"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                    > {{result.currentRatioPercent}}</div>
                  </div>
                </div>
              </div>
            </td>
            
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <i class="fas fa-circle text-orange-500 mr-2"></i> {{  result.currentResult}}
            </td>
          
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
         <!-- {{`${result.currentTime.toLocaleDateString()} ${result.currentTime.getHours()}:${result.currentTime.getMinutes()}:${result.currentTime.getSeconds()}`}} -->
        {{ result.currentTime}} 
        </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
            <div class="flex items-center">
                <span class="mr-2">{{result.vibrationFailCount}} / {{ result.vibrationCount }}
                  <br></span>
                <div class="relative w-full">
                  <div
                    class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                  >
                    <div
                      style="width: 60%;"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                    >{{ result.vibrationRatioPercent }}</div>
                  </div>
                </div>
              </div>
              
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <i class="fas fa-circle text-orange-500 mr-2"></i> {{ result. vibrationResult }}
            </td>
          
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
            <!-- {{`${result.vibrationTime.toLocaleDateString()} ${result.vibrationTime.getHours()}:${result.vibrationTime.getMinutes()}:${result.currentTime.getSeconds()}`}} -->
          {{ result.vibrationTime}}   
          </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              style="text-align: left;"
            >
        
            <ModalGraph/> 
            <!-- 상세보기 버튼  -->
        
         

            
            </td>
          </tr>
        </tbody>

      </table>
      <!-- <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button
            class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style="transition:all .15s ease"
            v-for="(page, index) in 5"
            :key="index"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div> -->
    </div>
  </div>
</template>
<script>
// import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";

import ModalGraph from "@/components/modals/ModalGraph.vue";
import {onMounted} from "vue";
export default {
  components: {
    ModalGraph,
  },
  props: {
    dataRealtimeCard: {
      type: Array,
      default: () => ([{ 
        equipmentId: 0, 
        equipmentSerialNo: 0, 
        equipmentName: 0,
        thresholdCount:0,
        currentCount:0,
        currentFailCount:0,
        currentRatioPercent:0,
        vibrationCount:0,
        vibrationFailCount:0,
        vibrationRatioPercent:0,
        currentResult:"확인중",
        currentTime:new Date(),
        vibrationResult:"확인중",
        vibrationTime:new Date(),
        thresholdPercent:0.01,
       }])
    },
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  setup(props) {

    onMounted(() =>{
      console.log(props.dataRealtimeCard)
    })



    return {
      props,
      
      
    };
  },
  


};
</script>


<style scoped>
.big-circle {
    width: 300px; /* 조절 가능한 크기 */
    height: 100px; /* 조절 가능한 크기 */
    border-radius: 50%; /* 원 모양 */
    background: linear-gradient(to bottom, gray 40%, yellow 60%); /* 배경색은 빨강색 60%, 하향색 40% */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px; /* 텍스트 글씨크기 */
    color: #ffffff; /* 텍스트 색상은 흰색 */
    line-height: 100px; /* 라인 높이를 크기와 같게 설정하여 글자가 꽉차게 표시되도록 한다. */
    font-weight: bold; /* 글자 굵기를 두껍게 설정한다. */
    text-align: center; /* 글자를 가운데로 정렬한다. */
}


</style>