<template>
  <div>
    <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <h1>{{ fedata }}</h1>
      <h1>{{ fedata }}</h1>
      <h1>{{ fedata }}</h1>
      <h1>{{ fedata }}</h1>
      <h1>{{ fedata }}</h1>
      <h1>{{ fedata }}</h1>
      <h1>{{ fedata }}</h1>
      <h1>{{ fedata }}</h1>
      <h1>{{ fedata }}</h1>
      <h1>{{ fedata }}</h1>
      <h1>{{ currents }}</h1>

  
      
      <HeaderStats :dailyCount="dailyCount" :dailyState="dailyState"/><!-- 두번째 props가 전달이 안되고 props안에서 첫번째인 dailycount만 자식에게 전달되는 문제를 수정 -->
      <RealTimeCard :data="realtimeResult"/>

      <h1>{{ fedata }}</h1>
      
    </div>
  </div>
  </div>
</template>
<script>
// import CardLineChart from "@/components/Cards/CardLineChart.vue";
// import CardBarChart from "@/components/Cards/CardBarChart.vue";
// import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
// import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import RealTimeCard from "@/components/Cards/RealTimeCard.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import data from "@/data/dashboard.js";
import { ref,onMounted,inject} from 'vue';

import axios from 'axios';




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
    const currents =ref();

    //socket//
    onMounted(()=> {
      const socket =inject('socket')
      socket.on('currents',(data)=>{
        currents.value = data;
        console.log(currents.value);
      })
    })

    // const computed = computed(()=>currents.value)

//     const currentsComputed = computed(() => currents.value);


// watch(currentsComputed, (newValue, oldValue) => {
//   console.log(`currents has changed: ${oldValue} -> ${newValue}`);
// });

    const dailyCount =ref();
    const dailyState =ref();
    const realtimeResult =ref();
    const fedata = ref();

    dailyCount.value=data.dailyCount;
    dailyState.value=data.dailyState;
    realtimeResult.value=data.realtimeResult;
    console.log(dailyState.value)



const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'

    axios.get('http://192.168.0.64:3000/board/monitoring-data',{
      headers: {
        authorization: token
      }
    }

    )
    .then((response) => {
      console.log(response.data);
      fedata.value= response.data
    })
    .catch((error) => {
      console.error(error);
    });



    return {
      dailyCount,
      dailyState,
      realtimeResult,
      fedata,

      currents
     
  }
  }
};
</script>
