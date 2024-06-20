<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-5xl font-bold">
               회원가입
              </h6>
            </div>
            <div class="btn-wrapper text-center">
             
              
                <img alt="..." class="w-120 h-120" :src="logo" />
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              
            </div>
            <form @submit.prevent="register">
            

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                  
                >
                  Email
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  confirm password
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="confirm Password"
                  v-model="confirmPassword"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Name"
                  v-model="name"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Phone
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Phone number"
                  v-model="phone"
                />
              </div>
              <div class="text-center mt-6">\
                <p>{{message}}</p>
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                  
                >
                  Create Account
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
import logo from "@/assets/img/logo.jpg";
import { ref } from 'vue';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router'


export default {
  setup() {
    const router = useRouter()
    const store = useStore();
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const name = ref('');
    const phone =ref('');

    const message=ref('');

    const validation = () => {
      if (!email.value || !password.value) {
        message.value = 'Email, Password를 입력해주세요';
        return false;
      }
      if (password.value!=confirmPassword.value) {
        message.value = 'Password가 일치하지 않습니다.';
        return false;
      }
      if (phone.value.length<10) {
        message.value = '전화번호가 올바르지 않습니다.';
        return false;
        
      }
    }
  


    const register = async () => {
      validation()
      try {
        console.log(email.value)
        console.log(password.value)
        console.log(name.value)
        console.log(phone.value)

        await store.dispatch('register', { email: email.value, password: password.value, name: name.value,phone: phone.value, });
        console.log(store);
        // 로그인 성공 시 리다이렉트 또는 다른 작업 수행
        console.log('가입 성공')
        
        
        // console.log("유저정보는 토큰:",store.state.user)
        // const redirectPath = '/dashboard'; 

        // console.log(this.$router)
        // self.$router.push({name: "Dashboard"})
        router.push({ name: 'Dashboard' })
        


      } catch (error) {
        message.value="가입에 실패하였습니다. 확인 후 다시 가입바랍니다."


        console.error(error.message);
        // 로그인 실패 처리
      }
    };
    return {
      logo,register,
      email,
      password,
      name,
      phone
    };
  },
};
</script>
