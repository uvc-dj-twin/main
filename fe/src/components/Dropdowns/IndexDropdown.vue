<!-- 화면 최상단 드랍다운 토글 버튼  -->



<template>
  <div>
    <!-- 드롭다운 토글 버튼 -->
    <a
      class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown"
    >
      Demo Pages
    </a>
    <!-- 드롭다운 메뉴 -->
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <!-- Admin Layout 항목 -->
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
      >
        Admin Layout
      </span>
      <!-- 각 페이지로 이동하는 링크 -->
      <router-link
        to="/admin/dashboard"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Dashboard
      </router-link>
      <router-link
        to="/admin/settings"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Settings
      </router-link>
      <router-link
        to="/admin/tables"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Tables
      </router-link>
      <router-link
        to="/admin/maps"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Maps
      </router-link>
      <div class="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
      <!-- Auth Layout 항목 -->
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
      >
        Auth Layout
      </span>
      <!-- 각 페이지로 이동하는 링크 -->
      <router-link
        to="/auth/login"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Login
      </router-link>
      <router-link
        to="/auth/register"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Register
      </router-link>
      <div class="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
      <!-- No Layout 항목 -->
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
      >
        No Layout
      </span>
      <!-- 각 페이지로 이동하는 링크 -->
      <router-link
        to="/landing"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Landing
      </router-link>
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
import { ref } from 'vue';
import { createPopper } from "@popperjs/core";

export default {
  setup() {
    // 드롭다운의 표시 여부를 관리하는 ref
    const dropdownPopoverShow = ref(false);
    // 드롭다운 토글 버튼의 ref
    const btnDropdownRef = ref(null);
    // 드롭다운 메뉴의 ref
    const popoverDropdownRef = ref(null);

    // 드롭다운을 토글하는 메서드
    const toggleDropdown = (event) => {
      event.preventDefault();
      if (dropdownPopoverShow.value) {
        dropdownPopoverShow.value = false;
      } else {
        dropdownPopoverShow.value = true;
        // Popper.js를 사용하여 드롭다운 메뉴의 위치 조정
        createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
          placement: "bottom-start",
        });
      }
    };

    return {
      dropdownPopoverShow,
      toggleDropdown,
      btnDropdownRef,
      popoverDropdownRef,
    };
  },
};
</script>
