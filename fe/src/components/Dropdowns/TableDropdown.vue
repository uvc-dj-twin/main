<template>
  <div>
    <!-- 드롭다운 토글 버튼 -->
    <a
      class="text-blueGray-500 py-1 px-3"
      href="#pablo"
      :ref="btnDropdownRef"
      @click="toggleDropdown"
    >
      <i class="fas fa-ellipsis-v"></i>
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
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; // Vue 3에서 ref 가져오기
import { createPopper } from '@popperjs/core';

export default {
  setup() {
    // 반응적인 변수들을 ref로 선언
    const btnDropdownRef = ref(null);
    const popoverDropdownRef = ref(null);
    const dropdownPopoverShow = ref(false); // 드롭다운 메뉴의 표시 여부

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
      toggleDropdown,
    };
  },
};
</script>
