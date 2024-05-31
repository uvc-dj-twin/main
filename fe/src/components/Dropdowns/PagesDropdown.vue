<template>
  <div>
    <!-- 드롭다운 토글링을 위한 링크 -->
    <a
      class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
      href="#pablo"
      :ref="btnDropdownRef"
      @click="toggleDropdown"
    >
      Demo Pages
    </a>
    <!-- 드롭다운 영역 -->
    <div
      :ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      :class="{ hidden: !dropdownPopoverShow, block: dropdownPopoverShow }"
    >
      <!-- Admin Layout 섹션 -->
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
      >
        Admin Layout
      </span>
      <!-- 대시보드 링크 -->
      <router-link
        to="/admin/dashboard"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Dashboard
      </router-link>
      <!-- 설정 링크 -->
      <router-link
        to="/admin/settings"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Settings
      </router-link>
      <!-- 테이블 링크 -->
      <router-link
        to="/admin/tables"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Tables
      </router-link>
      <!-- 맵 링크 -->
      <router-link
        to="/admin/maps"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Maps
      </router-link>
      <!-- 구분선 -->
      <div class="h-0 mx-4 my-2 border border-solid border-blueGray-100"></div>
      <!-- Auth Layout 섹션 -->
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
      >
        Auth Layout
      </span>
      <!-- 로그인 링크 -->
      <router-link
        to="/auth/login"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Login
      </router-link>
      <!-- 회원가입 링크 -->
      <router-link
        to="/auth/register"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Register
      </router-link>
      <!-- 구분선 -->
      <div class="h-0 mx-4 my-2 border border-solid border-blueGray-100"></div>
      <!-- No Layout 섹션 -->
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
      >
        No Layout
      </span>
      <!-- 랜딩 페이지 링크 -->
      <router-link
        to="/landing"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Landing
      </router-link>
      <!-- 프로필 페이지 링크 -->
      <router-link
        to="/profile"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Profile
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"; // Vue 3에서 ref 가져오기
import { createPopper } from "@popperjs/core";

export default {
  setup() {
    // 반응적인 변수들을 ref로 선언
    const btnDropdownRef = ref(null);
    const popoverDropdownRef = ref(null);
    const dropdownPopoverShow = ref(false); // 드롭다운 영역의 표시 여부

    // 드롭다운을 토글하는 메소드
    const toggleDropdown = (event) => {
      event.preventDefault();
      // 드롭다운이 표시되어 있다면 숨김
      if (dropdownPopoverShow.value) {
        dropdownPopoverShow.value = false;
      } else {
        // 드롭다운이 숨겨져 있다면 표시
        dropdownPopoverShow.value = true;
        // Popper.js를 사용하여 드롭다운의 위치 조정
        createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
          placement: "bottom-start",
        });
      }
    };

    return {
      // 템플릿에서 사용할 변수들 반환
      btnDropdownRef,
      popoverDropdownRef,
      dropdownPopoverShow,
      toggleDropdown,
    };
  },
};
</script>
