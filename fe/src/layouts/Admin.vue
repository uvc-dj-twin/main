<template>
  <div
  style="
  position: fixed;
  bottom: 0;
  width: 100%;
  overflow-y: auto">
    <sidebar />
    <div class="">
      <!-- AdminNavbar 컴포넌트의 높이를 고정해서 올라가는 현상을 방지하기 위해서 fixed 속성을 추가하고, top 속성을 0으로 설정 -->
      <admin-navbar />
      <div class="px-4 md:px-10 mx-auto w-full -m-32"
      style="margin-left: 32px;">
          <router-view />
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

<style scoped>
footer-admin {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>


