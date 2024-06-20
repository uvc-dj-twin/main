<template>
  <div>
  
    <div class="flex flex-wrap mt-4">
      <div class="w-full">



        <HeaderStats 
        :warningEquipmentArray="warningEquipmentArray"
        :dailyCount="dailyCount" :dailyState="dailyState" :testChartData="testChartData"
          :machineChartData="machineChartData" />


        <!-- 두번째 props가 전달이 안되고 props안에서 첫번째인 dailycount만 자식에게 전달되는 문제를 수정 -->
        <RealTimeCard :dataRealtimeCard="realtimeResult" />

        <!-- <h1>{{ realtimeResult }}</h1>   
      <h1>{{ dailyCount }}</h1>       
      <h1>{{ dailyState }}</h1>       
     -->

      </div>
    </div>
  </div>
</template>
<script>
import RealTimeCard from "@/components/Cards/RealTimeCard.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import CardLineChart from "@/components/Cards/CardLineChartDashboard.vue";
// import data from "@/data/dashboard.js";
import { ref, onMounted, inject, onUnmounted, computed } from 'vue';

import { useStore } from 'vuex';



export default {
  components: {
    HeaderStats,
    RealTimeCard,
    // CardLineChart,
    // CardBarChart,
    // CardPageVisits,
    // CardSocialTraffic,
  },
  setup() {

    const dailyCount = ref();
    const dailyState = ref();
    const realtimeResult = ref();
    const store = useStore();


    const warningEquipmentArray =ref([])

    const testChartData = computed(() => {
      const labels = Object.keys(realtimeTestData.value);
      const data = Object.values(realtimeTestData.value);

      return { labels, data };
    });
    const realtimeTestData = ref({});
    const realtimeFailCount = ref(0);
    const machineChartData = computed(() => {
      const labels = Object.keys(realtimeMachineData.value);
      const data = Object.values(realtimeMachineData.value);

      return { labels, data };
    });
    const realtimeMachineData = ref({});
    const interval = ref(null);
    const axios = inject('axios');
    const connectSocket = inject('connectSocket')


    //socket//
    onMounted(() => {
      axios
        .get(`/board/monitoring-data`)
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          realtimeResult.value = response.data
          setDailyInfo()

          connectSocket().then((socket) => {
            console.log('Socket connected:', socket);

            socket.emit('requestGroupData');

            // 'currents' 이벤트 리스너 등록
            socket.on('currents', (data) => {
              changeData(data);
            });

            // 'vibrations' 이벤트 리스너 등록
            socket.on('vibrations', (data) => {
              changeData(data);
            });
          });
          interval.value = setInterval(() => {
            const labelTime = new Date(Date.now()).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' });
            realtimeTestData.value[labelTime] = realtimeFailCount.value;
            realtimeFailCount.value = 0;
            const keys = Object.keys(realtimeTestData.value)
            if (keys.length > 20) {
              const recentKeys = keys.slice(-20);
              const newObject = {};

              recentKeys.forEach(key => {
                newObject[key] = realtimeTestData.value[key];
              });
              realtimeTestData.value = newObject;
            }

            realtimeMachineData.value[labelTime] = dailyState.value.failCount;
            const machineKeys = Object.keys(realtimeMachineData.value)
            if (machineKeys.length > 20) {
              const recentKeys = machineKeys.slice(-20);
              const newObject = {};

              recentKeys.forEach(key => {
                newObject[key] = realtimeMachineData.value[key];
              });
              realtimeMachineData.value = newObject;
            }
          }, 3000);
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)
        })
    })

    onUnmounted(() => {
      const socket = inject('socket')
      // 페이지를 떠날 때 소켓 연결 해제
      if (socket) {
        socket.off('currents');
        socket.off('vibrations');
      }
      if (interval) {
        clearInterval(interval.value);
      }
    });

    const setDailyInfo = () => {
      let totalCount = 0
      let failCount = 0

      realtimeResult.value.forEach((equipment) => {
        totalCount += equipment.currentCount + equipment.vibrationCount
        failCount += equipment.currentFailCount + equipment.vibrationFailCount
      })

      const totalEquipments = realtimeResult.value.length
      const equipmentsWithFailures = realtimeResult.value.filter(
        (equipment) =>
          equipment.vibrationFailCount >= equipment.thresholdCount || equipment.currentFailCount >= equipment.thresholdCount
      ).length

      dailyCount.value = {
        totalCount: totalCount,
        passCount: totalCount - failCount,
        failCount: failCount
      }
      dailyState.value = {
        totalCount: totalEquipments,
        passCount: totalEquipments - equipmentsWithFailures,
        failCount: equipmentsWithFailures
      }
      // store.state.failCount = dailyState.value.failCount

      store.dispatch('checkAlarm',dailyState.value.failCount);

      
      
    }

    const changeData = async (data) => {
      const index = realtimeResult.value.findIndex((item) => item.equipmentId === data.equipmentId)
      // 해당 객체가 존재하는 경우 업데이트
      if (index !== -1) {
        const newData = {
          ...realtimeResult.value[index]
        }
        newData.equipmentName = data.equipmentName
        newData.equipmentSerialNo = data.equipmentSerialNo
        newData.thresholdCount = data.thresholdCount
        const type = data.type === 'currents' ? 'current' : 'vibration'
        newData[`${type}Count`] = data.count
        newData[`${type}FailCount`] = data.failCount
        newData[`${type}Result`] = data.result
        newData[`${type}Time`] = new Date(data.time / 1000).toISOString('ko-KR')
        newData[`${type}RatioPercent`] = data.ratioPercent
        newData.thresholdPercent =
          (Math.max(newData.currentFailCount, newData.vibrationFailCount) / newData.thresholdCount) *
          100

          
        if (!warningEquipmentArray.value.includes(newData.equipmentName) 
        && newData.thresholdPercent >= 100) {
          warningEquipmentArray.value.push(newData.equipmentName);
        }
        console.log(warningEquipmentArray.value)



        realtimeResult.value[index] = newData
        if (data.resultCode !== 0) {
          realtimeFailCount.value += 1
        }
        setDailyInfo()
        console.log('Updated realtimeResult:', realtimeResult.value[index])
      } else {
        console.log(`Equipment with ID ${data.equipmentId} not found.`)
      }
    }


    return {
      warningEquipmentArray,
      dailyCount,
      dailyState,
      realtimeResult,
      CardLineChart, testChartData, realtimeTestData, realtimeMachineData, machineChartData,
      


    }
  }
};
</script>