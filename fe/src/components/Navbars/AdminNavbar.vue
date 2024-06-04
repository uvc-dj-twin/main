<template>
  <!-- Navbar -->
  <nav class="absolute top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
    <div class="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
      <!-- Brand -->
      <div class="flex-col md:flex-row list-none items-center hidden md:flex">
        <!-- 각 페이지로 이동하는 링크 -->
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1"
          :class="{
            'bg-emerald-500 active:bg-emerald-600': isActive(link.path),
            'bg-indigo-500 active:bg-emerald-600': !isActive(link.path),
          }"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
export default {
  setup() {
    const links = [
      { path: '/dashboard', name: '모니터링' },
      { path: '/dataread', name: '이력조회' },
      { path: '/admin/groupMng', name: '그룹관리' },
      { path: '/admin/equipmentMng', name: '장비관리' },
    ];

    const isActive = (path) => {
      const route = this?.$route;
      return route ? route.path === path : false;
    };

    const userName = '홍길동';

    return {
      userName,
      links,
      isActive,
    };
  },
};
</script>

