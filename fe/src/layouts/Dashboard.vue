<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 ">
      <admin-navbar style="top: 0;" />
      <div class="p-8">
        <div class="">
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
  setup() {
    return {
      AdminNavbar,
      FooterAdmin,
    }
  }
};
</script>

