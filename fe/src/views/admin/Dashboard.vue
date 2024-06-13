<template>
  <div>
    <div class="flex flex-wrap mt-4 overflow-x-hidden">
    <div class="w-full">
    


  
      
      <HeaderStats :dailyCount="dailyCount" :dailyState="dailyState"/><!-- 두번째 props가 전달이 안되고 props안에서 첫번째인 dailycount만 자식에게 전달되는 문제를 수정 -->
      <RealTimeCard :dataRealtimeCard="realtimeResult"/>

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
// import data from "@/data/dashboard.js";
import { ref,onMounted,inject, onUnmounted} from 'vue';

import axios from 'axios';
import {useStore} from 'vuex';



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
   
    const dailyCount =ref();
    const dailyState =ref();
    const realtimeResult =ref();
    const store=useStore();

    //socket//
    onMounted(() => {
      const socket = inject('socket')
      axios
        .get('http://192.168.0.64:3000/board/monitoring-data', {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
          }
        })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          realtimeResult.value = response.data
          setDailyInfo()

          // console.log(socket)
          socket.on('currents', (data) => {
            changeData(data)
          })
          socket.on('vibrations', (data) => {
            changeData(data)
          })
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

  store.state.failCount = dailyState.value.failCount 
  // failCount store 저장
}

const changeData = (data) => {
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
    setDailyInfo()
    console.log('Updated realtimeResult:', realtimeResult.value[index])
  } else {
    console.log(`Equipment with ID ${data.equipmentId} not found.`)
  }
}



// API 토큰

// const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'


// API요청 
    // axios.get('http://192.168.0.64:3000/board/monitoring-data',{
    //   headers: {
    //     authorization: token
    //   }
    // }

    // )
    // .then((response) => {
    //   console.log(response.data);
    //   realtimeResult.value= response.data
    // })
    // .catch((error) => {
    //   console.error(error);
    // });



    return {
      dailyCount,
      dailyState,
      realtimeResult,
      

      
     
  }
  }
};
</script>
