<template>
  <!-- Navbar -->
  <nav class="bg-color2 top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
    <div class="top-0 w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
      <!-- Brand -->
      <div class="flex-col md:flex-row list-none items-center hidden md:flex">
        <!-- 각 페이지로 이동하는 링크 -->
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="text-2xl get-started text-white font-bold px-2 py-4 rounded outline-none focus:outline-none mr-1 mb-1"
          :class="{
            'bg-color3 active:bg-emerald-600': this.$route.path.includes(link.path),
            'bg-color1 active:bg-emerald-600': !(this.$route.path.includes(link.path)),
          }"
        >
          {{ link.name }}
        </router-link>

        <!-- <div v-if="userRole === 'admin'">  -->
        <div> 
        <router-link
        
          v-for="link in linksAdmin"
          :key="link.path"
          :to="link.path"
          class="text-2xl get-started text-white font-bold px-2 py-4 rounded outline-none focus:outline-none mr-1 mb-1"
          :class="{
            'bg-color3 active:bg-emerald-600': this.$route.path.includes(link.path),
            'bg-color1 active:bg-emerald-600': !(this.$route.path.includes(link.path)),
          }"
        >
          {{ link.name }}
        </router-link>
      </div>
      </div>
      <div>
        <router-link
          to="/myPage"
          class="bg-color1 text-2xl get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-color1 active:bg-color1"
        >
       {{newDate}} {{ userName }}님 마이페이지
        </router-link>
        
     
       
        <router-link
          to="/auth/login"
          class="text-2xl bg-color1 get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-color1 active:bg-color1"
        @click="handleLogout">
       로그아웃
        </router-link>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
export default {

  setup() {

    const token = localStorage.getItem('token');
    const userRole =ref('');

if (token) {
  // Step 2: Split the token to get the payload part
  const payloadBase64Url = token.split('.')[1];

  if (payloadBase64Url) {
    // Step 3: Decode the Base64Url-encoded payload
    const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = atob(payloadBase64);
    
    // Step 4: Parse the JSON to extract the role value
    const payload = JSON.parse(payloadJson);
    
     userRole.value = payload.role;
    console.log('User role:', userRole.value);
  } else {
    console.error('Invalid token: missing payload');
  }
} else {
  console.error('No token found in localStorage');
}




    const store = useStore(); //stor 불러오기 
    const userName = computed(() => store.state.name); // store 유저명 불러오기

    console.log(store.state.name)
  
    
    // const userName = ref();


    
    const links = [
      { path: '/dashboard', name: '모니터링' },
      { path: '/dataread', name: '이력조회' },
    ];
        
    const linksAdmin = [
      { path: '/admin/groupMng', name: '그룹관리' },
      { path: '/admin/equipmentMng', name: '권한관리' },
    ];

    const isActive = (path) => {
      const route = this?.$route;
      return route ? route.path === path : false;
    };


    const newDate =ref();
    setInterval(() =>{
      newDate.value = new Date().toLocaleTimeString();}
      ,1000)

const handleLogout = () => {
  store.dispatch('logout');
}
    
    return {
      userName,
      links,
      linksAdmin,
      newDate,
      isActive,
      handleLogout,
      userRole,
    };
  },
};
</script>




