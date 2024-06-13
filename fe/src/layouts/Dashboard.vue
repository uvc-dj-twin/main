<template>
  <div
  :class="[
                       failCount >=10 ? 'bg-red-500' : 
                       failCount>= 1 ? 'bg-yellow-500' : 
                       'bg-emerald-500'
                      ]"
  >
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
import {useStore} from "vuex"
export default {
  setup() {
    const store = useStore()
    const failCount = store.state.failCount
    return {
      AdminNavbar,
      FooterAdmin,
      failCount
    }
  }
};
</script>

