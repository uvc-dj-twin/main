<!-- 
변경된 부분 및 주석 설명:
템플릿 부분 (<template>):
Navbar 토글 상태 바인딩:
:class="[navbarOpen.value ? 'block' : 'hidden']": Navbar가 열려 있는지 닫혀 있는지 상태에 따라 클래스를 동적으로 설정합니다. Composition API의 ref로 선언된 변수의 값에 접근할 때 .value를 사용합니다.
스크립트 부분 (<script>):
Vue 3의 Composition API 사용:

ref를 사용하여 반응형 변수 navbarOpen 선언.
Navbar 상태를 저장하는 변수:

const navbarOpen = ref(false);: Navbar가 열려 있는지 닫혀 있는지를 나타내는 반응형 변수입니다. 초기값은 false입니다.
Navbar 상태를 토글하는 함수:

const setNavbarOpen = () => { navbarOpen.value = !navbarOpen.value; };: Navbar의 상태를 토글(열림/닫힘)하는 함수입니다.
setup 함수:

Composition API의 setup 함수 안에서 반응형 변수와 함수를 선언하고 반환합니다.
이 코드는 Composition API를 사용하여 Navbar의 열림/닫힘 상태를 반응형 변수로 관리하고, 이를 템플릿에서 동적으로 바인딩하여 상태에 따라 Navbar의 표시를 제어합니다. 각 변수와 로직은 주석으로 명확히 설명되어 있습니다. -->


<template>
  <nav
    class="top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow"
  >
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
        <router-link to="/">
          <a
            class="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            href="#pablo"
          >
            Vue Notus
          </a>
        </router-link>
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="setNavbarOpen"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div
        class="lg:flex flex-grow items-center"
        :class="[navbarOpen.value ? 'block' : 'hidden']"
        id="example-navbar-warning"
      >
        <ul class="flex flex-col lg:flex-row list-none mr-auto">
          <li class="flex items-center">
            <a
              class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
              href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus?ref=vn-index-navbar"
            >
              <i class="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />
              Docs
            </a>
          </li>
        </ul>
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <index-dropdown />
          </li>
          <li class="flex items-center">
            <a
              class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fvue-notus%2F%23%2F"
              target="_blank"
            >
              <i class="text-blueGray-400 fab fa-facebook text-lg leading-lg" />
              <span class="lg:hidden inline-block ml-2">Share</span>
            </a>
          </li>

          <li class="flex items-center">
            <a
              class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
              href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fvue-notus%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20VueJS%20UI%20Kit%20and%20Admin.%20Let%20Vue%20Notus%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
              target="_blank"
            >
              <i class="text-blueGray-400 fab fa-twitter text-lg leading-lg" />
              <span class="lg:hidden inline-block ml-2">Tweet</span>
            </a>
          </li>

          <li class="flex items-center">
            <a
              class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
              href="https://github.com/creativetimofficial/vue-notus?ref=vn-index-navbar"
              target="_blank"
            >
              <i class="text-blueGray-400 fab fa-github text-lg leading-lg" />
              <span class="lg:hidden inline-block ml-2">Star</span>
            </a>
          </li>

          <li class="flex items-center">
            <button
              class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              type="button"
            >
              <i class="fas fa-arrow-alt-circle-down"></i> Download
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'; // Vue 3의 ref 가져오기
import IndexDropdown from "@/components/Dropdowns/IndexDropdown.vue"; // IndexDropdown 컴포넌트 가져오기

export default {
  components: {
    IndexDropdown, // IndexDropdown 컴포넌트 등록
  },
  setup() {
    // Navbar의 상태를 저장하는 반응형 변수
    const navbarOpen = ref(false);

    // Navbar의 상태를 토글하는 함수
    const setNavbarOpen = () => {
      navbarOpen.value = !navbarOpen.value;
    };

    return {
      // 템플릿에서 사용할 변수와 함수 반환
      navbarOpen,
      setNavbarOpen,
    };
  },
};
</script>
