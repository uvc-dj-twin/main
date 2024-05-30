<template>
  <div>
    <navbar />
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          :style="{ backgroundImage: `url(${registerBg2})` }"
        ></div>
        <router-view />
        <footer-small absolute />
      </section>
    </main>
  </div>
</template>

<script>

import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterSmall from "@/components/Footers/FooterSmall.vue";

export default {
  setup(){
    const registerBg2 = require('@/assets/img/register_bg_2.png').default


    return {
      Navbar,FooterSmall,
      registerBg2
    }
  }

};
  

</script>
