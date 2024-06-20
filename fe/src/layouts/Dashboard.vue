<template>
<div>
    <sidebar />
    <div class="relative ">
      <admin-navbar style="top: 0;" />
      <div class=" px-4 md:px-10 mx-auto w-full -m-24"
      :class="currentColor">
        <div class="mt-20 ">
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
import { computed } from "vue";
import {useStore} from "vuex"
export default {
  setup() {
    const store = useStore()
    const currentColor = computed(() => {
      if (store.state.failCount >= 2) {
        return 'bg-red-500';
      } else if (store.state.failCount >= 1) {
        return 'bg-orange-500';
      } else {
        return 'bg-white';
      }
    });

    return {
      AdminNavbar,
      FooterAdmin,
      currentColor,
      
    }
  }
};
</script>

