<template>
<div id="bg-class"
:class="[
  currentColor
]">
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
import { computed } from "vue";
import {useStore} from "vuex"
export default {
  setup() {
    const store = useStore()

    // const backgroundClass = computed(() => {
    //   if (failCount.value >= 10) {
    //    id가 bg-class인 dom요소를 찾아서 클래스를 ''

    //   } else if (failCount.value >= 1) {
    //     return currentColor.value === 'bg-yellow-500';
    //   } else {
    //     return 'bg-white';
    //   }
    // });

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

