<template>
  
  <!-- <div class="container mx-auto px-4 h-full"> -->
    <div class="">
    <div class="flex content-center items-center justify-center h-full"
    style="margin-top: 100px">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-5xl font-bold">
                My Page
              </h6>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-3xl text-blueGray-400 text-center mb-3 font-bold">
             
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <p  
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                > 
                {{ name }}</p>
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  부서
                </label>
                <p  
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                > 
                {{ groupName }}</p>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <p  
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                > 
                {{ email }}</p>
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                phone
                </label>
                <p  
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                > 
                {{ phone }}</p>
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                role
                </label>
                <p  
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                > 
                {{ userRoll }}</p>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                @change=handlePasswordCheck
                  type="password"
                  v-model="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Confirm Password
                </label>
                <input
                  @change="handlePasswordCheck"
                  type="password"
                  v-model="confirmPassword"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
                <p>                  {{ message }}
                </p>
                <!-- <button @click="toggleModal">클릭</button> -->

                <!-- <button @click="showModal=!showModal">클릭</button> -->
                <!-- <div v-if="showModal==true">
                  <Modal/>
                </div> -->
                <div v-show="showModal==true">
                <div
                class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div class="bg-white p-6 rounded shadow-lg" style="width: 30vw; height: 200px;">
                  <!-- 모달 헤더 -->
                  <div class="flex justify-end p-4">
                    <button @click="cancelDelete" class="text-gray-600 hover:text-gray-800">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <!-- 모달 내용 -->
                  <div class="p-6 text-center">
                    <p class="mb-4 text-lg font-semibold">회원정보가 수정되었습니다.</p>
                    <!--  버튼 -->
                    <div class="flex justify-center">
                      <button @click="cancelDelete" class="px-4 py-2 bg-gray-100 text-gray-700 rounded m-2">확인</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                

              </div>
              

              

              <div class="text-center mt-6">
                <button
                @click="editEvent"
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  비밀번호 변경하기
                  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, onMounted, ref } from "vue";
import { useStore } from "vuex";




export default {
  components: {
    
  },

  setup() {
    const store = useStore(); //stor 불러오기 
    const userId =store.state.userId; // store 유저명 불러오기    
    const name = ref('사원명')
    const email = ref('이메일')
    const phone = ref("부서")
    const groupName = ref('그룹명')
    const userRoll=ref('역할');
    const password =ref('');
    const confirmPassword = ref('');
    const message=ref(' ')
    const changeCheck=ref('false')
    const showModal=ref('false')
    // const id = ref(1)
    const axios = inject('axios')


    const toggleModal = () => {
        showModal.value = true
    }


    onMounted( // 회원정보 불러오는 api
   
    axios
        .get(`/users/${userId}`, {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Iu2FjOyKpO2KuCIsInJvbGUiOm51bGwsImlhdCI6MTcxODYxMjQxMywiZXhwIjoxNzQ3NDEyNDEzfQ.9W_wzUOd5oGkXNKghkTo6bPj-yXkhZLy6IzlQ4fUZzc'
          }
        })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)

          const userData = JSON.parse(JSON.stringify(response.data));
          console.log(userData)
          name.value = userData.name; //확인
          email.value = userData.email; //확인
          phone.value = userData.phone; //확인
          userRoll.value=userData.role; 
          groupName.value = userData.Group.name;
          // console.log(userData.group.name)

        //   equipmentList.value =response.data.map((x)=>x.name)
        //   console.log(equipmentList.value)
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
         

          console.error('Error:', error)

        })
      )


      const editEvent = ()=>{

        if(!changeCheck.value){
          return null}
        axios
        .patch(`/users/${userId}`,
        {
          password:password.value,
        },
         {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
          }
        })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          toggleModal()
          console.log('Response:', response.data)

        

        //   equipmentList.value =response.data.map((x)=>x.name)
        //   console.log(equipmentList.value)
        })
        .catch((error) => {
          message.value="요청이 실패했습니다."
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)

        })
        
        
      }


  const handlePasswordCheck = () => {
    if(password.value !== confirmPassword.value) {
      message.value="비밀번호가 다릅니다."
      changeCheck.value = false;
    }
    if(password.value === confirmPassword.value) {
       message.value="변경하실 비밀번호가 확인되었습니다."
       changeCheck.value = true;
     }
}
    return {
      name,phone,groupName,email,userId,userRoll,editEvent,
      password,confirmPassword,handlePasswordCheck,message,
      showModal,toggleModal,
      }
  } 
}


</script>

<style scoped>



</style>
