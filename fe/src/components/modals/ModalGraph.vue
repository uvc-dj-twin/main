<template>
  <div>
    <button class="text-xl bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
      상세보기
    </button>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center" style="top: 0; left: 0; right: 0; bottom: 0;">
      <div>
        <!--content 모달창의 크기조절 위치-->
        <div style="width:1100px ; height: 500px" > 
          <!--header-->
          <div >
            <h3 class="text-3xl font-semibold">
              전류/전동 검사 그래프
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div>
            <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
            
            </p>
            <div class="grid">
              <div>
                <CardLineChartDetail @click="handleDetail" :data="vibrationGraphData"/>
                
              </div>
              <div>

                <CardLineChart2 @click="handleDetail" :data="currentGraphData"/>
                
                <button @click="() => {audio?.play()}">재생</button>
              </div>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios'
import CardLineChartDetail from '@/components/Cards/CardLineChartDetail.vue';
import CardLineChart2 from '@/components/Cards/CardLineChart2.vue';
export default {
  components:{
    CardLineChartDetail,
    CardLineChart2,

  },
  props : {
    data : {
      type: Object,
      default: () => ({ id: 1, date: '2024-01-01T01:01:01Z' })
    }
  },
  setup(props) {
    console.log("Modal에서 받은 props.data: ", props.data)
    const showModal = ref(false);

    const vibrationGraphData =ref ({data:[100,2,3000,4],labels:[1,2,3,4]})
    const currentGraphData=ref ({data:[[100,2,3000,4],[1,2000,3,4000],[500,500,500,500]],labels:[1,2,3,4]})

    const audio = ref();
    


    const toggleModal = () => {
      showModal.value = !showModal.value;
      if (showModal.value){
        handleDetail()
      }
      console.log(props)

    };



    const handleDetail = () => {
      console.log("axios 시작")
      axios
        .get(`http://192.168.0.64:3000/board/machines/details/${props.data.id}/data?time=${props.data.date}`, {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
          }
        })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          console.log('Response:', response.data.current.data)
          currentGraphData.value.data = response.data.current.data
          vibrationGraphData.value.data = response.data.vibration.data
          console.log(response.data.wavData);
          const wavData = response.data.wavData;
          audio.value = new Audio('data:audio/wav;base64,' + wavData);

          console.log(currentGraphData.value)
          console.log(vibrationGraphData.value)

          
          // currentGraphData.value.data = response.data.current
          // vibrationGraphData.value.data = response.data.vibration

          // console.log("모달에서 통신 후 배열:",currentGraphData.value)
          // console.log("모달통신배열",vibrationGraphData.value)

          // console.log("모달에서 통신 후 배열:",currentGraphData.value.data.data)



          

        //   equipmentList.value =response.data.map((x)=>x.name)
        //   console.log(equipmentList.value)
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)

        })
    

    }

   

    return {
      showModal,
      toggleModal,
      currentGraphData,
      vibrationGraphData,
      handleDetail,
      audio
    };
  }
}
</script>

<style scoped>
.modal-container {
  width: 900px; /* 임시로 30% 너비로 설정 */
  max-width: 1200px; /* 뷰포트 너비의 30%를 넘지 않도록 설정 */
  height: 30%; /* 임시로 30% 높이로 설정 */
}
</style>


