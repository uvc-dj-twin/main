<template>
  <div>
    <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <HeaderForm :menu="menu" />
      <GroupTable :people="peopleArr" :groupList="groups"  :value="selectedValue"  @update:value="handleUpdate"/>
      
      
    </div>
    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button
            class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style="transition:all .15s ease"
            v-for="(page, index) in 5"
            :key="index"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          
        </div>
  </div>
  </div>
</template>
<script>
import GroupTable from "@/components/Cards/GroupTable.vue";
import HeaderForm from "@/components/Headers/HeaderForm.vue";
import test from "@/data/userlist.js"
import { ref } from "vue";

export default {
  components: {
    GroupTable,
    HeaderForm,




  },
  setup() {
    
    const menu = ['Mail','Group'];

    const groups =ref(['A','B','C'])
    const peopleArr =test

    const selectedValue = ref('option1');


    //검색 변수//
    const  userEmail=ref('')
    const  limit=ref(30)
    const  page=ref(1)

    const handleUpdate = (value) => {
      selectedValue.value = value;
      console.log('부모 컴포넌트에서 선택된 값:', value);
    };


    const handlePage = (event) => {
      page.value=event.target.id
      getValue()
    }

    const getValue = () => {
    
   
    // if (inputElement) {
    console.log(userEmail.value)  
    console.log(groups.value) 
    console.log(page.value) 
    console.log(limit.value)

    // axios
    //   .get(`http://192.168.0.64:3000/admin/groups/users?userEmail=${userEmail.value}&group=${group.value}&limit=${limit.value}&page=${page.value}`, {
    //     headers: {
    //       authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
    //     }
    //   })
    //   .then((response) => {
    //     // 요청이 성공하면 데이터를 저장
    //     console.log('Response:', response.data)
    //     totalRow.value=response.data.totalRow
    //     users.value=response.data.users
    //     groups.value=response.data.groups
    //     

    //   })
    //   .catch((error) => {
    //     // 요청이 실패하면 실행되는 코드
    //     console.error('Error:', error)
    //     showGraph.value=true

    //   })
  };
      return {peopleArr,menu,groups,
        selectedValue,handleUpdate,getValue,handlePage
      }
  }
};
</script>
