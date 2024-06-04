<!-- 이 코드에서는 드롭다운 토글 버튼과 드롭다운 메뉴가 있습니다. 드롭다운 토글 버튼을 클릭하면 드롭다운 메뉴가 표시되거나 숨겨집니다. 
  드롭다운이 열릴 때마다 Popper.js를 사용하여 드롭다운 메뉴의 위치가 조정됩니다.  -->


<template>
  <div>
    <!-- 드롭다운 토글 버튼 -->
    <a
      class="text-blueGray-500 block py-1 px-3"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown"
    >
      <i class="fas fa-bell"></i>
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
      <!-- 드롭다운 메뉴 항목들 -->
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Action
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Another action
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Something else here
      </a>
      <!-- 구분선 -->
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <!-- 별도의 링크 -->
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Seprated link
      </a>
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
      // 드롭다운 상태를 변경
      dropdownPopoverShow.value = !dropdownPopoverShow.value;

      if (dropdownPopoverShow.value) {
        // 드롭다운이 열렸을 때 Popper.js를 사용하여 드롭다운 메뉴의 위치 조정
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
