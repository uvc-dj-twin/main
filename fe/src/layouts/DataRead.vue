<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64">
      <admin-navbar style=" top: 0;" />
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
import HeaderDataRead from "../components/Headers/HeaderDataRead.vue";
export default {
  setup() {
    return {
      AdminNavbar,
      FooterAdmin,
      HeaderDataRead,
    }
  }
};
</script>

