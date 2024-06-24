<template>
  <div  class="">
    <div class="flex flex-wrap mt-4 overflow-y:hidden">
      <div class="w-full">

<div class="flex justify-center gap-6 text-2xl font-bold" > 
  <div> 
    {{ realtimeResult?.equipmentSerialNo }}
    <br>
    {{ realtimeResult?.equipmentName }}
  </div>
  <div :class="[
     realtimeResult?.thresholdPercent >= 70 ? 'text-red-500'
    :realtimeResult?.thresholdPercent >= 50 ? 'text-orange-500'
    :'text-black'
  ]"> 
    Threshold <br>
   {{ realtimeResult? Math.round(realtimeResult.thresholdPercent,1) : '' }}%
  </div>
  <div> 
    금일 전류 검사 수: {{ realtimeResult?.currentCount }} (이상률 {{ Math.round(realtimeResult?.currentRatioPercent,1)  }}%)
  <br>
    금일 진동 검사 수: {{ realtimeResult?.vibrationCount }} (이상률 {{Math.round( realtimeResult?.vibrationRatioPercent,1) }}%)

  </div>

  <div>
    {{ currentTimedifference ? currentTimedifference : '' }}

    <span v-if="currentTimedifference > 10">전류센서 상태: 정지</span>
    <span v-else>전류센서 상태: 작동 중 </span>
    <br>
    <span v-if="vibrationTimedifference > 10">진동센서 상태: 정지</span>
    <span v-else>진동센서 상태: 작동 중 </span>
  </div>
</div>        
        <div class="text-xl font-bold"> 
    
          
         최근 검사결과 {{ realtimeResult?.vibrationResult}} ({{realtimeResult?.vibrationTime}})
        </div>
        
        <CardLineChartDetail :data="vibrationRef"></CardLineChartDetail>
        
        <div class="text-xl font-bold "> 
       
          
        최근 검사결과: {{ realtimeResult?.currentResult }} (  {{realtimeResult?.currentTime}} )

        </div>
        
        <CardLineChart2 :data="currentRef"></CardLineChart2>
       

      </div>
    </div>
  </div>
</template>
<script>
// import data from "@/data/dashboard.js";
import { ref, onMounted, inject, onUnmounted, computed } from 'vue';

// import HeaderStatsSingle from "@/components/Headers/HeaderStatsSingle.vue";
import CardLineChartDetail from "@/components/Cards/CardLineChartDetail.vue";
// import CardLineChartDetailSingle from "@/components/Cards/CardLineChartDetailSingle.vue";

import CardLineChart2 from "@/components/Cards/CardLineChart2.vue";


export default {
  components: {
    // HeaderStatsSingle,
    CardLineChartDetail,
    // CardLineChartDetailSingle,
    CardLineChart2,
    
    // CardBarChart,
    // CardPageVisits,
    // CardSocialTraffic,
  },
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    console.log(props)

    const currentRef =ref({
      data: [[], [], []],
    });
    const vibrationRef =ref({
      data: [[]],
    });
    
    
    const currentTimedifference = ref (1000)
    const vibrationTimedifference = ref (1000)



   



    const dailyCount = ref();
    const realtimeResult = ref();
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
        totalCount += realtimeResult.value.currentCount + realtimeResult.value.vibrationCount
        failCount += realtimeResult.value.currentFailCount + realtimeResult.value.vibrationFailCount

      dailyCount.value = {
        totalCount: totalCount,
        passCount: totalCount - failCount,
        failCount: failCount
      }
      // store.state.failCount = dailyState.value.failCount

    }

    const changeData = async (data) => {
    console.log(data);
    console.log(new Date().getTime())
    console.log((data.time/1000))

    if(data.type==='currents'){
      currentTimedifference.value = ((new Date().getTime() - (data.time/1000))/1000)
    }
    else {
      vibrationTimedifference.value = ((new Date().getTime() - (data.time/1000))/1000)
    }


        const newData = {
          ...realtimeResult.value
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
        realtimeResult.value = newData
        if (data.resultCode !== 0) {
          realtimeFailCount.value += 1
        }
        if (data.type === 'currents') {
          const flatData = Array.from({ length: data.data[0].length }, () => []);
          data.data.forEach(row => {
            row.forEach((value, index) => {
              flatData[index].push(value);
            });
          });
          console.log(flatData[0]);
          console.log(flatData[1]);
          console.log(flatData[2]);
          currentRef.value.data[0] = currentRef.value.data[0].concat(flatData[0])
          currentRef.value.data[1] = currentRef.value.data[1].concat(flatData[1])
          currentRef.value.data[2] = currentRef.value.data[2].concat(flatData[2])
          console.log(currentRef.value.data[0])
          currentRef.value.data[0] = currentRef.value.data[0].length > 360 ? currentRef.value.data[0].slice(-360) : currentRef.value.data[0];
          currentRef.value.data[1] = currentRef.value.data[1].length > 360 ? currentRef.value.data[1].slice(-360) : currentRef.value.data[1];
          currentRef.value.data[2] = currentRef.value.data[2].length > 360 ? currentRef.value.data[2].slice(-360) : currentRef.value.data[2];
        } else {
          const flatData = data.data.flat();
          vibrationRef.value.data[0] = vibrationRef.value.data[0].concat(flatData);
          vibrationRef.value.data[0] = vibrationRef.value.data[0].length > 360 ? vibrationRef.value.data[0].slice(-360) : vibrationRef.value.data[0];
          console.log(vibrationRef.value)
        }
        setDailyInfo()
        console.log('Updated realtimeResult:', realtimeResult.value)

    }


    return {
      props,


      currentTimedifference,
      vibrationTimedifference,
      dailyCount,
      realtimeResult,
      currentRef, vibrationRef,
       testChartData, realtimeTestData, realtimeMachineData, machineChartData,
       



    }
  }
};
</script>


