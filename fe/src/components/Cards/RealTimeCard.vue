<template>
  
  <div class="md:px-10 mx-auto w-full overflow-x-auto"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="font-bold text-5xl relative w-full max-w-full flex-grow flex-1"
        
        >
            
          Monitoring Board
          
        </div>
      </div>
    </div>
    <div class="block vw-50%">
      <!-- Projects table -->
      <table class="max-w-full items-center margin-left-auto bg-transparent border-collapse"
      style="width: 100%">
        <thead>
          <tr >
            <th v-for="column in columnList" :key="column"
              class=" align-middle border border-solid py-3 text-5xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-middle"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              {{column}} 
            </th>
            <!-- <th
              class=" align-middle border border-solid py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-middle"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Threshold 
            </th>
            <th
              class=" align-middle border border-solid py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-middle"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              전류검사 
            </th>
            <th
              class=" align-middle border border-solid py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-middle"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              전류 판정
            </th>
            <th
              class=" align-middle border border-solid py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-middle"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              전동검사
            </th>
            <th
              class=" align-middle border border-solid py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-middle"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
               전동 판정
            </th>
            <th
              class=" align-middle border border-solid py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-conter"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
               검사 시간
            </th>
            <th
              class=" align-middle border border-solid py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-conter"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
               상세보기
            </th> -->

           
         
            <!-- 추가칼럼 설정용 
              <th
              class=" align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-conter"
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
              class="border-t-0  align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-left flex items-center"
            >
              <span 
                class="ml-3 font-bold text-5xl"
                :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >{{ result.equipmentSerialNo }}
              <br>
              {{ result.equipmentName }}
              </span>
            </th>
            <td
              class="text-5xl border-t-0  align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4"
            >
            <div class="flex items-center">
              
                <div class="relative w-full">
                  <div
                    
                  >
                    <div
                    style="width: 100%;"
                      class="big-circle"
                      :class="[
                       result.thresholdPercent >70 ? 'bg-red-500' : 
                       result.thresholdPercent >50 ? 'bg-yellow-500' : 
                       'bg-emerald-500'
                      ]"
                    >
                    {{result.thresholdCount}}, 
                    
                    {{ Math.round(result.thresholdPercent, 1) }}% </div>
                  </div>
                </div>
              </div>
            </td>
            <td
              class="text-center text-5xl border-t-0  align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4"
            >
            <div class=" items-center">
                <span class="mr-2 text-5xl">{{  result.currentFailCount }}/<br>{{ result.currentCount }}</span>
                <div class="relative w-full">
                  <div
                    class=" h-12 text-xl flex rounded bg-red-200"
                    
                  >
                    <div
                    :style="{ width: `${Math.round(result.currentRatioPercent)}%` }"
                      class="  text-5xl shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      :class="[
                       result.currentRatioPercent >70 ? 'bg-red-500' : 
                       result.currentRatioPercent >50 ? 'bg-yellow-500' : 
                       'bg-emerald-500'
                      ]"
                    
                      > {{    `${Math.round(result.currentRatioPercent,1)}%` }}</div>
                  </div>
                </div>
              </div>
            </td>
            
            <td
              class="text-center text-5xl border-t-0  align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4"
            >
              <i class="fas fa-circle mr-2"
              :class="[result.currentResult === '정상' ? 'text-emerald-500' : 'text-orange-500']" 
              
              ></i> 
             
                {{  result.currentResult}}
             
            </td>
          
          
        <td
              class="text-center text-5xl border-t-0  align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4"
            >
            <div class=" items-center">
              <span class="mr-2 text-5xl">{{  result.vibrationFailCount }}/<br>{{ result.vibrationCount }}</span>
                <div class="relative w-full">
                  <div
                    class=" h-12 text-xl flex rounded bg-red-200"
                  >
                    <div
                    :style="{ width: `${Math.round(result.vibrationRatioPercent)}%` }"
                      class="text-5xl shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      :class="[
                       result.currentRatioPercent >70 ? 'bg-red-500' : 
                       result.currentRatioPercent >50 ? 'bg-yellow-500' : 
                       'bg-emerald-500'
                      ]"
                      > {{    `${Math.round(result.vibrationRatioPercent,1)}%` }}</div>
                  </div>
                </div>
              </div>
            </td>
            <td
              class="text-center text-5xl border-t-0  align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4"
            >
              <i class="fas fa-circle mr-2"
              :class="[result.vibrationResult === '정상' ? 'text-emerald-500' : 'text-orange-500']" 
              
              ></i> 
              
                {{ result. vibrationResult }}

              
            </td>
          
            <td
              class="text-center text-5xl border-t-0  align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4"
            >
            <!-- {{`${result.vibrationTime.toLocaleDateString()} ${result.vibrationTime.getHours()}:${result.vibrationTime.getMinutes()}:${result.currentTime.getSeconds()}`}} -->
          <!-- {{  result.vibrationTime?.split('.')[0].split('T')[1] }}    -->
          {{  result.vibrationTime }}   
          </td>
            <td
              class="text-5xl border-t-0  align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center"
              style="text-align: center;"
            >
            

        
            <ModalGraph :data="{id:result.equipmentId ,date:result.vibrationTime}"/>            <!-- 상세보기 버튼  -->
            </td>
          </tr>
        </tbody>

      </table>
    
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
        currentTime:new Date().toISOString().split('.')[0],
        vibrationResult:"확인중",
        vibrationTime:new Date().toISOString().split('.')[0],
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
    const columnList= ['장비명','Threshold','전류검사','전류판정','전동검사','전동판정','검사시간','상세보기']


    onMounted(() =>{
      console.log(props.dataRealtimeCard)
    })



    return {
      props,columnList
      
      
    };
  },
  


};
</script>


<style scoped>
.big-circle {
    width: 300px; /* 조절 가능한 크기 */
    height: 100px; /* 조절 가능한 크기 */
    border-radius: 50%; /* 원 모양 */
    /* 배경색은 빨강색 60%, 하향색 40% */
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