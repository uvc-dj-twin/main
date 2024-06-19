<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-5xl font-bold">
                기계시설물 <br>
                모니터링 
                <br>
                시스템
              </h6>
            </div>
            <div class="btn-wrapper text-center">
                    <img alt="..." class="w-120 h-120" :src="logo" />
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>LOGIN</small>
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"  v-model="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
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
                  type="password"  v-model="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    v-model="rememberMe"
                    class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Remember me
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2 text-right">
            <router-link to="/auth/register" class="text-blueGray-200">
              <small>Create new account</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    

import logo from "@/assets/img/logo.jpg";

import { inject, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
// import { useUserStore } from '@/stores/user' // Pinia 스토어 가져오기

export default {
  setup() {
    const router = useRouter()
    const email = ref('');
    const password = ref('');
    const store = useStore();

    const rememberMe = ref(false); // Initialize rememberMe to false
    const connectSocket = inject('connectSocket');


    const handleSubmit = async () => {
      try {
        await store.dispatch('login', { email: email.value, password: password.value });
        connectSocket();
        console.log(store);
        // 로그인 성공 시 리다이렉트 또는 다른 작업 수행
        console.log('성공')
        console.log("유저id:",store.state.userId)
        console.log("유저이름:",store.state.name)
        console.log("유저 토큰:",store.state.token)

        if (rememberMe.value) {
        localStorage.setItem('rememberedEmail', email.value);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    

        // const redirectPath = '/dashboard'; 

        // console.log(this.$router)
        // self.$router.push({name: "Dashboard"})
        router.push({ name: 'Dashboard' })
        


      } catch (error) {
        this.$router.push({name: "Dashboard"});

        console.error(error.message);
        // 로그인 실패 처리
      }
    };

    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      email.value = rememberedEmail;
    }

    return { email, password, handleSubmit,logo,rememberMe };
  }
};
</script>
