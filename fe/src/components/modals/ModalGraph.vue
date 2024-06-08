<template>
  <div>
    <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
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
                <CardLineChart/>
                
              </div>
              <div>

                <CardLineChart2/>
                
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
import CardLineChart from '@/components/Cards/CardLineChart.vue';
import CardLineChart2 from '@/components/Cards/CardLineChart2.vue';
export default {
  components:{
    CardLineChart,
    CardLineChart2,

  },
  setup() {
    const showModal = ref(false);

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    return {
      showModal,
      toggleModal
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


