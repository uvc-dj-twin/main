<template>
  <div>
    <admin-navbar style=" top: 0;" />
      <div class="mt-0 px-4 md:px-10 mx-4 w-full"
      style="
        overflow-x:hidden;
        overflow-y:hidden;
        margin-right:40px; 
        margin-left:40px;
        width:1456px;">
          <router-view />
        </div>
        <footer-admin />
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

