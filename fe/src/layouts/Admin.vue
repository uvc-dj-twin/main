<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 ">
      <!-- AdminNavbar 컴포넌트의 높이를 고정해서 올라가는 현상을 방지하기 위해서 fixed 속성을 추가하고, top 속성을 0으로 설정 -->
      <admin-navbar style="position: fixed; top: 0;" />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <div class="mt-20">
          <router-view />
        </div>
        <footer-admin />
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";

export default {
  components: {
    AdminNavbar,
    FooterAdmin
  }
};
</script>


