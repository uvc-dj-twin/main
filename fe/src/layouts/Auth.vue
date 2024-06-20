<template>
  <div>
    <main>
      <section class="relative w-full h-full py-16 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          :style="`background-image: url('${registerBg2}');`"
        ></div>
        <router-view />
        <footer-admin></footer-admin>
      </section>
    </main>
  </div>
  
</template>
<script>
import Footeradmin from "@/components/Footers/FooterAdmin.vue";
import registerBg2 from "@/assets/img/register_bg_2.png";

export default {
  setup(){

    return {
      registerBg2,Footeradmin
    };
  }
  
};
</script>

