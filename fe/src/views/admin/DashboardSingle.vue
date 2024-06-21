<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full">

        <p class="text-6xl">
{{ realtimeResult?.equipmentSerialNo }}
</p>

<!-- {{ typrof (realtimeResult?.vibrationTime) }} -->

<!-- {{ new Date().getTime()  }} -->
  <div> 

    <span v-if="checkTimedifference < 60">정상 작동중</span>
    <span v-else>센서 정지</span>
    {{realtimeResult?.vibrationTime}} <br>
    {{realtimeResult?.currentTime}} 
  </div>
       


        



<!-- 
        <HeaderStatsSingle :dailyCount="dailyCount? dailyCount : ''" :dailyState="dailyState? dailyState : ''" 
        /> -->
        <CardLineChartDetail :data="vibrationRef"></CardLineChartDetail>
        <!-- <CardLineChartDetailSingle :data="vibrationRef"></CardLineChartDetailSingle> -->

        <CardLineChart2 :data="currentRef"></CardLineChart2>
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
    
    
    const checkTimedifference = ref (0)


   



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

    checkTimedifference.value = ((new Date().getTime() - (data.time/1000))/1000)

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


      checkTimedifference,
      dailyCount,
      realtimeResult,
      currentRef, vibrationRef,
       testChartData, realtimeTestData, realtimeMachineData, machineChartData,
       



    }
  }
};
</script>