<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full">
        <HeaderForm :menu="menu" @handleSearch="handleSearch" />
        <GroupTable :people="users" :groupList="groups" @handleEdit="handleUpdate" />
      </div>
      <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
        <button
          class="bg-color3 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
          type="button" style="transition:all .15s ease" v-for="(page, index) in pages" :key="index" :value="page"
          @click="handlePage">
          {{ page }}
        </button>

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

    const menu = ['Mail', 'Group'];
    const axios = inject('axios');

    const getValue = () => {
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
          console.log(pages.value);
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)
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

    // 테스트 데이터
    const groups = ref([])
    const users = ref([])


    //검색 변수//
    const selectedOption = ref(menu[0])
    const searchValue = ref('')
    const limit = ref(15)
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


    const handlePage = (event) => {
      currentPage.value = event.target.value
      getValue()
    }

    return {
      menu, groups, users, pages, limit,
      handleUpdate, getValue, handlePage,
      selectedOption, searchValue,
      handleSearch
    }
  }
};
</script>
