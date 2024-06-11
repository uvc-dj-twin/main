<template>
  
  <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">결과 선택</label>
      <select 
      v-model="selectedValue"
      @change="handleChange"
      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150">
      <option value="All"> All </option>
      <option :value="option.id" v-for="(option,index) in props.defectTypeList" :key="index" >{{ option.name }}</option>
    </select>
    </div>
</template>

<script>

import { ref } from 'vue'; // Vue 3의 ref 가져오기


export default ({
  props: {
    defectTypeList: {
      type: Array,
      default: () => ([])
    },
    value: {
      type:String}, 
    },
  
  setup(props, { emit }) {
    const selectedValue = ref(props.value);
    const handleChange = () => {
      // 선택된 값을 부모 컴포넌트로 emit
      emit('update:value', selectedValue.value);
    };
    // watch(selectedValue, (newValue, oldValue) => {
    //   // 선택된 값이 변경되었을 때 자동으로 emit
    //   console.log(newValue,oldValue)
    //   handleChange();
    // });
    
    return {
      props,
      selectedValue,
      handleChange
    }
  },
})

</script>
