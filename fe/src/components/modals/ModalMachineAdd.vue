<template>
  <div>
    <button class=" text-xl bg-color3 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
      장비추가
    </button>
    <div v-if="showModal" class=" fixed inset-0 z-50 flex items-center justify-center" style="top: 0; left: 0; right: 0; bottom: 0;">
      <div>
        <!--content 모달창의 크기조절 위치-->
        <div class="bg-white "
        style="width:1100px ;" > 
          <!--header-->
          <div class="flex items-center justify-between p-5">
            <h3 class="text-3xl font-semibold">
              장비 추가
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="text-5xl bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div>
            <label>장비명</label>
            <input 
            v-model="machineName"
            type=text class="my-4 text-blueGray-500 text-lg leading-relaxed/">
            <label>시리얼넘버</label>
            <input 
            v-model="serialNo"
            type=text class="my-4 text-blueGray-500 text-lg leading-relaxed/">
            <label>Threshold</label>
            <input
            v-model="threshold"
            type=number class="my-4 text-blueGray-500 text-lg leading-relaxed/">

            
            
            <div class="grid">
              <div>
               
                
              </div>
              <div>

                
                
              </div>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" @click="handleAddMachine">추가</button>

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
import { inject, ref } from 'vue';

export default {
  components:{
  

  },
  setup() {
    const showModal = ref(false);
    const axios = inject('axios')
    const machineName = ref();
    const threshold = ref();
    const serialNo  = ref();



    const toggleModal = () => {
      showModal.value = !showModal.value;
     

    };


    // const handleAdd = (groupName) => {
    //   console.log(groupName)
    //   axios.post(`/admin/groups`, {
    //     name: groupName,
    //   }, {
    //     headers: {
    //       authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
    //     }
    //   }).then(() => {
    //     getValue();
    //   }).catch((error) => {
    //     // 요청이 실패하면 실행되는 코드
    //     console.error('Error:', error)
    //   })
    // }


    const handleAddMachine = () => {
      console.log("장비 추가 axios 시작")
      axios
        .post(`/admin/machines`, {
        name: machineName.value,
        threshold: threshold.value,
        serialNo: serialNo.value
      })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('추가요청 완료 후 Response:', response.data)
          showModal.value = !showModal.value;
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)

        })
    

    }

   

    return {
      showModal,
      toggleModal,
      handleAddMachine,
      machineName,
      threshold,
      serialNo
    };
  }
}
</script>

<!-- <style scoped>
.modal-container {
  width: 900px; /* 임시로 30% 너비로 설정 */
  max-width: 1200px; /* 뷰포트 너비의 30%를 넘지 않도록 설정 */
  height: 30%; /* 임시로 30% 높이로 설정 */
}
</style> -->


