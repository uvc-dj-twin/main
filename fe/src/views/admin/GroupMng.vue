<template>
  <div>
    <div class="flex flex-wrap mt-4">

      <div class="flex flex-row mt-4 w-full" style="margin-right:56px;">
        <div>
          <!-- <h3 class="font-bold text-5xl relative w-full max-w-full flex-grow flex-1" style="width:300px"> 회원 테이블</h3> -->

        </div>

        <div class="flex items-center justify-end w-full h-full">
          <HeaderForm :menu="menu" @handleSearch="handleSearch" />
        </div>
      </div>





      <div class="w-full">
        <GroupTable :isLoading="isLoading" :people="users" :groupList="groups" @handleEdit="handleUpdate" @handleAddGroup="handleAdd" @handleDeleteGroup="handleDelete" />
      </div>
      <div class="flex relative w-full px-4 max-w-full flex-grow flex-1 text-right">
      <button @click="handleMinPages">이전</button>
      <div class="mt-2">
        <button
          class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style="transition: all .15s ease"
          v-for="(page) in pages"
          :key="page"
          :value="page"
          :class="{
            'hidden': !(Math.floor(page / 10) === Math.floor(currentPage / 10)) &&
              page !== 1 &&
              page !== pages
          }"
          @click="handlePages"
        >
          {{ page }}
        </button>
      </div>
      <button @click="handleMaxPages">다음</button>
    </div>
    </div>
  </div>
</template>
<script>
import GroupTable from "@/components/Cards/GroupTable.vue";
import HeaderForm from "@/components/Headers/HeaderForm.vue";
// import test from "@/data/userlist.js"
import { inject, onMounted, ref } from "vue";

export default {
  components: {
    GroupTable,
    HeaderForm,
  },
  setup() {

    const handleMaxPages=()=>{
      if(Math.floor(currentPage.value/10)<Math.floor(totalRow.value/10)) {
        currentPage.value=currentPage.value+10}
    }    
    const handleMinPages=()=>{
      if(Math.floor(currentPage.value/10)>=1) {
        currentPage.value=currentPage.value-10
      }
    }    
    const totalRow =ref();


    const menu = ['Mail', 'Group'];
    const axios = inject('axios');

    const getValue = () => {
      isLoading.value = true;
      groups.value = [];
      users.value = [];
      const selectedMap = { Mail: 'userEmail', Group: 'group' }
      const query = `${selectedMap[selectedOption.value]}=${searchValue.value}&limit=${limit.value}&page=${currentPage.value}`;
      console.log(query);
      axios.get(`/admin/groups/users?${query}`, {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
        }
      })
        .then((response) => {
          // 요청이 성공하면 데이터를 저장
          console.log('Response:', response.data)
          groups.value = response.data.groups
          users.value = response.data.users
          pages.value = response.data.totalRow % limit.value === 0 ? response.data.totalRow / limit.value : Math.floor(response.data.totalRow / limit.value) + 1;
          totalRow.value = response.data.totalRow
          isLoading.value = false;
          console.log(pages.value);
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)
          isLoading.value = false;
          // showGraph.value=true
        })
    }

    onMounted(() => {
      getValue();
    })

    const handleSearch = (selectedVal, searchVal) => {
      selectedOption.value = selectedVal;
      searchValue.value = searchVal;
      currentPage.value = 1;
      getValue();
    }

    const handlePages = (event) => {
      currentPage.value = event.target.value
      getValue()
    }

    const isLoading = ref(true);

    // 테스트 데이터
    const groups = ref([])
    const users = ref([])


    //검색 변수//
    const selectedOption = ref(menu[0])
    const searchValue = ref('')
    const limit = ref(10)
    const pages = ref(0)
    const currentPage = ref(1)

    const handleUpdate = (people, values) => {
      let editUsers = [];
      for (const index in people) {
        editUsers.push({
          id: people[index].id,
          groupId: values[index],
        })
      }
      console.log(editUsers);
      axios.patch(`/admin/groups/users`, {
        users: editUsers,
      }, {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
        }
      }).then(() => {
        getValue();
      })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)
        })
    };

    const handleAdd = (groupName) => {
      console.log(groupName)
      axios.post(`/admin/groups`, {
        name: groupName,
      }, {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
        }
      }).then(() => {
        getValue();
      }).catch((error) => {
        // 요청이 실패하면 실행되는 코드
        console.error('Error:', error)
      })
    }

    const handleDelete = (groupId) => {
      axios.delete(`/admin/groups/${groupId}`, {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
        }
      }).then(() => {
        getValue();
      }).catch((error) => {
        // 요청이 실패하면 실행되는 코드
        console.error('Error:', error)
      })
    }


    const handlePage = (event) => {
      currentPage.value = event.target.value
      getValue()
    }

    return {
      menu, groups, users, pages, limit,
      handleUpdate, getValue, handlePage, handleAdd,
      selectedOption, searchValue,
      handleSearch, handleDelete,
      handleMaxPages,handleMinPages,handlePages,isLoading
    }
  }
};
</script>
