<template>
  

  
  <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">장비 선택</label>
      <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150">
        <option value="newUsersStat">New Users</option>
        <option value="totalStat">Total Statistics</option>
        <option value="salesStat">Sales</option>
      <option value="performanceStat">Performance</option>
      <option :value="option" v-for="(option,index) in props.equipmentList" :key="index" >{{ option }}</option>
    </select>
    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
//   setup() {
//     return {
//       dropdownPopoverShow: false
//     }
//   },
// })
</script>

  



<!-- <template>
  <div class="flex flex-wrap">
    <div class="w-full sm:w-6/12 md:w-4/12 px-4">
      <div class="relative inline-flex align-middle w-full">
        <button 
          class="btn-custom text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-emerald-500 active:bg-emerald-600 ease-linear transition-all duration-150" 
          type="button" 
          ref="btnDropdownRef" 
          @click="toggleDropdown()"
        >
          Equiquipments
        </button>
        <div 
          ref="popoverDropdownRef" 
          class="bg-emerald-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48" 
          :class="{hidden: !dropdownPopoverShow,block: dropdownPopoverShow,}"
        >
          <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
            Action
          </a>
          <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
            Another action
          </a>
          <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
            Something else here
          </a>
          <div class="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25"></div>
          <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
            Seprated link
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },
  methods: {
    toggleDropdown() {
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
};
</script>
 -->
