<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"

          >            
            {{editCheck ? '회원 관리 수정' : '회원 관리 조회'}}
            <button 
           class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-red-600 bg-emerald-500 active:bg-emerald-600"
           style="min-width: 200px; max-width: 400px"
           @click="handleEdit">모드 변경 </button>

          </h3>
          

          <!-- 일괄적용을 위한 드랍다운  -->
          <select
            v-model="selectedGroupArray[index]"
            @change="checkGroupAll"
            class="w-200-px h-200-px border-0 px-6 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
            style="min-width: 200px; max-width: 400px"
            >
            <option :value="option" v-for="option in props.groupList" :key="option" >{{ option }}</option>
          </select>

          <button class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-red-600"
          :class="[editCheck ? 'bg-emerald-500 active:bg-emerald-600' : 'bg-red-500 active:bg-red-600']"
          >수정 요청</button>
      
         
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              체크박스 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              이름 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
               메일
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              현재 그룹
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            > 최종 그룹 
            </th>

            <!-- 추가칼럼 설정용 
              <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            ></th> -->
          </tr>
        </thead>
        <tbody>
           <!-- 데이터 배열을 반복하여 각 항목을 생성 -->

          <!-- <tr v-for="person in people" :key="person.id"> -->
          <tr v-for="(person, index) in people" :key="index">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4 text-left flex items-center"
             
              >
            <input :id="`${index}`" type="checkbox" v-model="checkedArray[index]" @change="checkE"
              :disabled="!editCheck"
            />
              <span
                class="ml-3 font-bold"
                :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
              </span>
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4"
            >
            <div class="flex items-center">
                <span class="mr-2">{{person.name}}
                  <br></span>
                <div class="relative w-full">
                
                </div>
              </div>
            </td>
            
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4"
            >
            {{person.mail}}
            </td>
          
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4"
            >{{ person.currentGroup }}
         <!-- {{person.currentGroup}} -->
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4"
            >
          <select 
            v-model="selectedGroupArray[index]"
            @change="checkGroupE"

            
            class="">
            <!-- <option selected :value="person.currentGroup">  {{ person.currentGroup }} </option> -->
            
            <option :value="option" v-for="option in props.groupList" :key="option" >{{ option }}</option>
            
          </select>
              
            </td>
           
          </tr>
         
       
        </tbody>

     
      </table>
    </div>
  </div>
</template>


<script>
import {onMounted, ref} from 'vue';

// import GroupDropdown from '@/components/Dropdowns/GroupDropdown.vue';

// import { defineProps } from 'vue'

export default {

    


  components: {
    // GroupDropdown
  },
  setup(props,{emit}) {
    const selectedValue = ref(props.value);
    const handleChange = () => {
      // 선택된 값을 부모 컴포넌트로 emit
      emit('update:value', selectedValue.value);
    };
    onMounted(() => {
    checkedArray.value = (new Array(props.people.length).fill(false));
    selectedGroupArray.value = (new Array(props.people.length).fill(props.groupList[0]));


    });
    const selectedGroupArray = ref([]);
    const checkedArray = ref([]);
    const selectAll = ref('');

    const editCheck=ref(true);
    const handleEdit = ()=>{
      editCheck.value=!editCheck.value
      console.log(editCheck.value)
    }

    const checkE = (event) => {
     
      const index = Number(event.target.id);
      // const checked = event.target.checked;
      // checkedArray.value[index] = checked;
      console.log( checkedArray.value[index])
    }

    const checkGroupE = (event) => {
     
     const index = Number(event.target.id);
     // const checked = event.target.checked;
     // checkedArray.value[index] = checked;
     console.log( selectedGroupArray.value[index])
     console.log( selectedGroupArray.value)

   }


   // 전체 체크박스에서 값이 변경되면,
   // 해당 체크박스가 true일 때만 선택된 그룹 값을 변경한다.
   const checkGroupAll = (event)=> {
     // 전체 체크박스의 값을 반복하면서,
     checkedArray.value.forEach ((checked, index) => {
       // 해당 체크박스가 true일 때,
       if(checked){
         // 선택된 그룹 값을 변경한다.
         selectedGroupArray.value[index]=event.target.value
       }
       // 변경된 선택된 그룹 값을 출력한다.
       console.log(selectedGroupArray.value)
     })
   }



    

    return {
      checkedArray,checkE,props,
      handleChange,
      checkGroupE,checkGroupAll,selectAll,
      selectedGroupArray,
      handleEdit,editCheck
      
      


    };
  },
  
  props: {
    people:Array,
    groupList:Array,
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
};
</script>