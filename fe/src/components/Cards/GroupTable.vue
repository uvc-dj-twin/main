<template>
  <div v-if="people.length == 0" class="h-500-px w-screen flex items-center justify-center text-5xl font-bold text-center">
      조회를 진행해주세요</div>
  <div v-else
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
   
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"

          >            
            {{editCheck ? '회원 관리 수정' : '회원 관리 조회'}}
            <button 
           class="get-started bg-color3 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-color3 active:bg-emerald-600"
           style="min-width: 200px; max-width: 400px"
           @click="handleEdit">{{editCheck ? '그룹 저장' : '그룹 수정'}}</button>

          </h3>
          

          <!-- 일괄적용을 위한 드랍다운  -->
          <div v-show="editCheck">
            <span>선택한 사용자의 변경할 그룹 선택</span>
            <!-- <select
              v-model="selectedValue"
              class="w-200-px h-200-px border-0 px-6 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
              style="min-width: 200px; max-width: 400px"
              >
              <option :value="option.id" v-for="option in props.groupList" :key="option" >{{ option.name }}</option>
              <option @click="() => {console.log('+++')}">+</option>
            </select> -->
            <div class="relative inline-block">
              <div @click="toggleDropdown" class="w-200-px h-200-px border-0 px-6 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base shadow focus:outline-none focus:ring ease-linear transition-all duration-150 cursor-pointer"
                  style="min-width: 200px; max-width: 400px">
                {{ selectedText }}
              </div>
              <div v-if="dropdownOpen" class="absolute bg-white border mt-1 w-full z-10">
                <div v-for="option in props.groupList" :key="option.id" @click="selectOption(option)" class="px-6 py-3 hover:bg-gray-100 cursor-pointer">
                  {{ option.name }}
                </div>
                <div v-show="false" @click="handleAddOption" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center">
                  +
                </div>
              </div>
            </div>
  
            <button class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-red-600"
            :class="[editCheck ? 'bg-color3 active:bg-emerald-600' : 'bg-red-500 active:bg-red-600']"
            @click="checkGroupAll"
            >일괄 변경</button>
          </div>
      
         
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
            >
              선택
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
             
            >
              이름 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            
            >
               메일
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
             
            >
              현재 그룹
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            
            > 최종 그룹 
            </th>

         
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
              <!-- <span
                class="ml-3 font-bold"
                :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
              </span> -->
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
            {{person.email}}
            </td>
          
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4"
            >{{ person.Group?.name }}
         <!-- {{person.currentGroup}} -->
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4"
            >
          <select 
            v-model="selectedGroupArray[index]"
            @change="checkGroupE"
            :disabled="!editCheck"
            
            class="">
            <!-- <option selected :value="person.currentGroup">  {{ person.currentGroup }} </option> -->
            
            <option :value="option.id" v-for="option in props.groupList" :key="option" >{{ option.name }}</option>
            
          </select>
              
            </td>
           
          </tr>
         
       
        </tbody>

     
      </table>
    </div>
  </div>
</template>


<script>
import {computed, onMounted, ref} from 'vue';

// import GroupDropdown from '@/components/Dropdowns/GroupDropdown.vue';

// import { defineProps } from 'vue'

export default {

    


  components: {
    // GroupDropdown
  },
  setup(props,{emit}) {
    const selectedValue = ref();
    onMounted(() => {
      checkedArray.value = (new Array(props.people.length).fill(false));
      selectedGroupArray.value = (new Array(props.people.length).fill(0));
    });
    const selectedGroupArray = ref([]);
    const checkedArray = ref([]);
    const selectAll = ref('');


    // 커스텀 드롭다운
    const dropdownOpen = ref(false);
    const selectedText = computed(() => {
      const selectedOption = props.groupList.find(option => option.id === selectedValue.value);
      return selectedOption ? selectedOption.name : '그룹을 선택하세요';
    })

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    const selectOption = (option) => {
      selectedValue.value = option.id;
      dropdownOpen.value = false;
    }

    const handleAddOption = () => {
      console.log('add event');
    }

    const editCheck=ref(false);
    const handleEdit = ()=>{
      if (editCheck.value) {
        emit('handleEdit', props.people, selectedGroupArray.value)
        checkedArray.value = (new Array(props.people.length).fill(false));
        selectedGroupArray.value = (new Array(props.people.length).fill(0));
      } else {
        checkedArray.value = (new Array(props.people.length).fill(false));
        selectedGroupArray.value = props.people.map(person => person.Group.id);
      }
      if (props.people.length > 0) {
        editCheck.value=!editCheck.value
      }
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
   const checkGroupAll = ()=> {
    console.log(selectedValue.value)
     // 전체 체크박스의 값을 반복하면서,
     checkedArray.value.forEach ((checked, index) => {
       // 해당 체크박스가 true일 때,
       if(checked){
         // 선택된 그룹 값을 변경한다.
         selectedGroupArray.value[index]=selectedValue.value
       }
     })
   }


    return {
      checkedArray,checkE,props,selectedValue,
      checkGroupE,checkGroupAll,selectAll,
      selectedGroupArray,
      handleEdit,editCheck,
      selectedText, dropdownOpen, toggleDropdown, selectOption, handleAddOption,
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