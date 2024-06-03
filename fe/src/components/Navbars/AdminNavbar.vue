<template>
  <!-- Navbar -->
  <nav
    class="absolute top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
  >
    <div
      class="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4 "
    >
      <!-- Brand -->
      
     
      <div class="mt-12">
         <!-- 각 페이지로 이동하는 링크 -->
         <router-link
        to="/dashboard"
        class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-emerald-500 active:bg-emerald-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
      >
      모니터링</router-link>
     
        <router-link
        to="/dataread"
        class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-emerald-500 active:bg-emerald-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
      >
      이력조회</router-link> 

      <router-link
        to="/admin/groupMng"
        class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-emerald-500 active:bg-emerald-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
      >
      그룹관리</router-link>
      <router-link
        to="/admin/equipmentMng"
        class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-emerald-500 active:bg-emerald-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
      >
      장비관리</router-link>
            </div>



     
      <!-- User -->
      <ul >
       
      <br/>
     
        <!-- <user-dropdown /> -->
      </ul>
      <div class="flex-col md:flex-row list-none items-center hidden md:flex">
        <span>현재 시간{{new Date().toLocaleTimeString()}}</span>
        <span>접속자: {{ userName }}</span>
      <button class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> 마이페이지</button>
      <button class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> 로그아웃</button>  
      </div>
    </div>
    
  </nav>
  <!-- End Navbar -->
</template>

<script>
// import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
  components: {
    // UserDropdown,
  },
  setup(){
    const userName = '홍길동'
    return {
    userName}

  }
 
};
</script>


 <!-- Form
 <form
 class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
>
 <div class="relative flex  w-full flex-wrap items-stretch">
   <span
     class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
   >
     <i class="fas fa-search"></i>
   </span>
   <input
     type="text"
     placeholder="Search here..."
     class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
   />
 </div>
</form> -->