<!-- setup 함수 내에서 ref를 사용하여 변수들을 반응적으로 선언합니다.
이미지 경로를 가져오기 위해 import를 사용합니다.
createPopper를 이용하여 드롭다운의 위치를 조정하는 부분에 주석이 추가되어 있습니다. -->

<template>
  <div>
    <!-- 드롭다운 토글 버튼 -->
    <a
      class="text-blueGray-500 block"
      href="#pablo"
      :ref="btnDropdownRef"
      @click="toggleDropdown"
    >
      <div class="items-center flex">
        <!-- 프로필 이미지 -->
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
    </a>
    <!-- 드롭다운 메뉴 -->
    <div
      :ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      :class="{ hidden: !dropdownPopoverShow, block: dropdownPopoverShow }"
    >
      <!-- 액션 항목 -->
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Action
      </a>
      <!-- 다른 액션 항목 -->
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Another action
      </a>
      <!-- 다른 항목 -->
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Something else here
      </a>
      <!-- 구분선 -->
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <!-- 분리된 링크 -->
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Separated link
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; // Vue 3에서 ref 가져오기
import { createPopper } from '@popperjs/core';

import image from '@/assets/img/team-1-800x800.jpg'; // 이미지 가져오기

export default {
  setup() {
    // 반응적인 변수들을 ref로 선언
    const btnDropdownRef = ref(null); // 드롭다운 토글 버튼의 참조
    const popoverDropdownRef = ref(null); // 드롭다운 메뉴의 참조
    const dropdownPopoverShow = ref(false); // 드롭다운 메뉴의 표시 여부
    const imageSrc = image; // 이미지 경로

    // 드롭다운을 토글하는 메소드
    const toggleDropdown = (event) => {
      event.preventDefault();
      // 드롭다운 메뉴가 표시되어 있다면 숨김
      if (dropdownPopoverShow.value) {
        dropdownPopoverShow.value = false;
      } else {
        // 드롭다운 메뉴가 숨겨져 있다면 표시
        dropdownPopoverShow.value = true;
        // Popper.js를 사용하여 드롭다운의 위치 조정
        createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
          placement: 'bottom-start',
        });
      }
    };

    return {
      // 템플릿에서 사용할 변수들 반환
      btnDropdownRef,
      popoverDropdownRef,
      dropdownPopoverShow,
      image: imageSrc,
      toggleDropdown,
    };
  },
};
</script>
