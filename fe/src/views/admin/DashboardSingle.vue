<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full">

        <p class="text-6xl">
          장비명:{{props.id}}

        </p>



     
        <HeaderStatsSingle :dailyCount="dailyCount" :dailyState="dailyState" 
        />


          <CardLineChartDetail></CardLineChartDetail>
          <CardLineChart2></CardLineChart2>

         

        <!-- <h1>{{ realtimeResult }}</h1>   
      <h1>{{ dailyCount }}</h1>       
      <h1>{{ dailyState }}</h1>       
     -->

      </div>
    </div>
  </div>
</template>
<script>
// import data from "@/data/dashboard.js";
import { ref, onMounted, inject, onUnmounted, computed } from 'vue';
import { useStore } from 'vuex';

import HeaderStatsSingle from "@/components/Headers/HeaderStatsSingle.vue";
import CardLineChartDetail from "@/components/Cards/CardLineChartDetail.vue";
import CardLineChart2 from "@/components/Cards/CardLineChart2.vue";


export default {
  components: {
    HeaderStatsSingle,
    CardLineChartDetail,
    CardLineChart2,
    
    // CardBarChart,
    // CardPageVisits,
    // CardSocialTraffic,
  },
  props: {
    id: {
      type: Number,
    },
  },
  setup(props) {
    console.log(props)

    const dailyCount = ref();
    const dailyState = ref();
    const realtimeResult = ref();
    const store = useStore();
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
        .get(`/board/monitoring-data/${props.id}`)
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          realtimeResult.value = response.data
          // setDailyInfo()

          connectSocket().then((socket) => {
            console.log('Socket connected:', socket);

            socket.emit('requestMachineData', props.id);

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
    console.log(data);
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
      props,



      dailyCount,
      dailyState,
      realtimeResult,
       testChartData, realtimeTestData, realtimeMachineData, machineChartData



    }
  }
};
</script>