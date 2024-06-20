<template>
  <div
    class="mx-auto w-full overflow-x-auto scrollable-container"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
      
      </div>
    </div>
    <div class="block vw-50%">
      <!-- Projects table -->
      <table
        class="w-full max-w-full items-center margin-left-auto bg-transparent border-collapse"
      >
        <thead>
          <tr>
            <th
              v-for="column in columnList"
              :key="column"
              class="text-4xl align-middle border border-solid py-3 text-l uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-middle"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in props.dataRealtimeCard" :key="index">
            <th
              class="text-4xl border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap "
            >
              <span
                class="ml-3 font-bold"
                :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
                {{ result.equipmentName }}
              </span>
            </th>

            <td
              class="text-2xl border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap "
            >
              <span
                class="ml-3 font-bold"
                :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
                {{ result.equipmentSerialNo }}
              </span>
            </td>

            <td
              class="text-xl border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap "
            >
              <div class="flex items-center">
                <div class="relative w-full">
                  <div>
                    <div
                      class="text-center text-4xl"
                      :class="[
                        result.thresholdPercent > 70
                          ? 'text-red-500'
                          : result.thresholdPercent > 50
                          ? 'text-yellow-500'
                          : 'text-emerald-500',
                      ]"
                    >
                      {{ Math.round(result.thresholdPercent, 1) }}% ({{
                        result.thresholdCount
                      }})
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td
              class="text-center border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap "
            >
              <div class="items-center">
                <span class="mr-2">
                  {{ result.currentFailCount }} / {{ result.currentCount }}
                </span>
                <div class="relative w-full">
                  <div class="h-4 flex rounded bg-gray-100">
                    <div
                      :style="{ width: `${Math.round(result.currentRatioPercent)}%` }"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      :class="[
                        result.currentRatioPercent > 70
                          ? 'bg-red-500'
                          : result.currentRatioPercent > 50
                          ? 'bg-yellow-500'
                          : 'bg-emerald-500',
                      ]"
                    >
                      {{ Math.round(result.currentRatioPercent, 1) }}%
                    </div>
                  </div>
                  <i
                    class="ellipse w-full text-5xl fas mr-2"
                    :class="[
                      result.currentResult === '정상' ? 'text-emerald-500' : 'text-orange-500',
                    ]"
                  >
                    <p class="text-white text-xl text-center">
                      {{ result.currentResult }}
                    </p>
                  </i>
                </div>
              </div>
            </td>

              <td
              class="text-center border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap "
            >
              <div class="items-center">
                <span class="mr-2">
                  {{ result.vibrationFailCount }} / {{ result.vibrationCount }}
                </span>
                <div class="relative w-full">
                  <div class="h-4 flex rounded bg-gray-100">
                    <div
                      :style="{ width: `${Math.round(result.vibrationRatioPercent)}%` }"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      :class="[
                        result.vibrationRatioPercent > 70
                          ? 'bg-red-500'
                          : result.vibrationRatioPercent > 50
                          ? 'bg-yellow-500'
                          : 'bg-emerald-500',
                      ]"
                    >
                      {{ Math.round(result.vibrationRatioPercent, 1) }}%
                    </div>
                  </div>
                  <i
                    class="ellipse w-full text-5xl fas mr-2"
                    :class="[
                      result.vibrationResult === '정상' ? 'text-emerald-500' : 'text-orange-500',
                    ]"
                  >
                    <p class="text-white text-xl text-center">
                      {{ result.vibrationResult }}
                    </p>
                  </i>
                </div>
              </div>
            </td>





            

            <td
              class="text-4xl text-center border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap "
            >
              {{ new Date(result.vibrationTime).toLocaleTimeString('ko-KR') }}
            </td>
            <td
              class="border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap  text-center"
              style="text-align: center;"
            >
              <router-link
                :to="{
                  name: 'DashboardSingle',
                  params: { id: result.equipmentId? result.equipmentId : 10 },
                }"
                class="bg-color1 text-2xl get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-color1 active:bg-color1"
              >
                상세보기
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
// import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";

// import ModalGraph from "@/components/modals/ModalGraph.vue";
import {onMounted} from "vue";
export default {
  components: {
    // ModalGraph,
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
    const columnList= ['설비명','장비코드','Threshold','전류검사','진동검사','검사시간','상세보기']


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


.ellipse {
        width: 100%; /* 가로 길이 */
        background-color: currentColor; /* 아이콘의 색상을 상속 */
        border-radius: 20%; /* 타원형 모양을 위한 둥근 모서리 */
        display: inline-block; /* 인라인 블록 요소로 설정 */
        text-align: center; /* 텍스트를 중앙으로 정렬 */
        align-items: center; /* 수직 중앙 정렬 */
    }


</style>