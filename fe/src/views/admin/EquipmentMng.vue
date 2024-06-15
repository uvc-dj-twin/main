<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full">
        <HeaderForm :menu="menu" @handleSearch="handleSearch" />
        <div></div>
        <button
          class="bg-color3 get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-color3"
          @click="editEvent">{{ editCheck ? '저장' : '수정' }}</button>

        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
          >
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-bold text-5xl relative w-full max-w-full flex-grow flex-1">
                  장비 테이블
                </h3>
              </div>
            </div>
          </div>
          <div v-if="true" class="text-left block w-full overflow-x-auto">
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th 
                    class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                    장비명 </th>
                    <th 
                    class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >Threshold</th>
                  <th v-for="(group, index) in groupList" :key="index"
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >그룹 {{ group.name }}</th>
                    <th 
                    class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >삭제</th>
                </tr>
              </thead>
              <tbody>
                <!-- // v-for 시작 한 행에 대한 정보 -->
                <tr v-for="(machine, index) in data.machines" :key="index">
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    {{ machine.name }}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    <input v-if="editCheck" type="text" v-model="machine.threshold" placeholder="Search here..."
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10" />
                    <div v-else>{{ machine.threshold }}</div>
                  </td>
                  <td v-for="(group, groupIndex) in machine.groups" :key="groupIndex"
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    <div class="col-lg-12 control-section">
                      <div class="content-wrapper">
                        <div class="container switch-control">
                          <div>
                            <label for="groupA" style="padding: 10px 10px 10px 0"> 권한부여 </label>
                            <input type="checkbox" v-model="group.access" @click="checkTF(index, groupIndex)"
                              placeholder="Search here..." :disabled="!editCheck" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                 
                
                  <td>
                    <button @click="addDeleteMachine(machine.id)"
                   
          class="bg-color3 text-sm get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-color3"
                    style="text-align: right;" :disabled="!editCheck">{{ DeleteMachineArray.includes(machine.id) ? '취소' : '삭제' }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="h-600-px w-screen flex items-center justify-center text-5xl font-bold text-center">
            조회를 진행해주세요
          </div>
        </div>
      </div>
    </div>
    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
      <button
        class="bg-color3 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
        type="button" style="transition: all .15s ease" v-for="(page) in pages" :key="page" value="page"
        @click="handlePages">
        {{ page }}
      </button>
    </div>
  </div>
</template>


<script>


// import CardLineChart from "@/components/Cards/CardLineChart.vue";
// import CardBarChart from "@/components/Cards/CardBarChart.vue";
// import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
// import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import HeaderForm from "@/components/Headers/HeaderForm.vue";
import { ref, watch, onMounted, inject } from "vue";

import { rippleMouseHandler } from "@syncfusion/ej2-buttons";

// 감시할 data의 상태를 추가
// 이 예제에서는 'test' 변수의 상태를 감시합니다.


function rippleHandler(e) {
  const rippleSpan = this.nextElementSibling.querySelector('.e-ripple-container');
  rippleSpan && rippleMouseHandler(e, rippleSpan);
}



export default {
  components: {
    HeaderForm,

    // CardLineChart,
    // CardBarChart,
    // CardPageVisits,
    // CardSocialTraffic,
  },
  mounted() {
    const elemArray = this.$el.querySelectorAll('.switch-control label');
    elemArray.forEach((elem) => {
      elem.addEventListener('mouseup', rippleHandler);
      elem.addEventListener('mousedown', rippleHandler);
    });

    watch(
      () => this.data,
      (newValue, oldValue) => {
        console.log("data changed:", newValue);
        console.log("data changed:", oldValue);

      },
      { deep: true }
    )


  },
  setup() {
    const menu = ['장비명', '그룹명'];
    const DeleteMachineArray = ref([]);

    const columnList = ['장비명', 'Threshold', '그룹A', '그룹B', '그룹C', '삭제요청']
    const pages = ref(0);
    const currentPage = ref(1);
    const limit = ref(30);
    const selectedOption = ref(menu[0])
    const searchValue = ref('')
    const groupList = ref([])
    const editCheck = ref(false)
    const axios = inject('axios');

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

    const getValue = () => {
      console.log("axios 시작")
      const selectedMap = { 장비명: 'name', 그룹명: 'group' }

      axios
        .get(`/admin/machines?${selectedMap[selectedOption.value]}=${searchValue.value}&limit=${limit.value}&page=${currentPage.value}`, {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
          }
        })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          const result = JSON.parse(JSON.stringify(response.data));
          data.value = result
          const total = Number(data.value.totalRow);
          pages.value = total % limit.value === 0 ? total / limit.value : Math.floor(total / limit.value) + 1;
          if (result.machines.length > 0) {
            groupList.value = result.machines[0].groups
          }
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)
        })
    };





    const data = ref(
      {
        "totalRow": 0,
        "machines": []
      })

    const checkTF = (index, groupIndex) => {
      console.log(`${data.value.machines[index].name}기계의 ${data.value.machines[index].groups[groupIndex].name}그룹 권한설정 상태: ,${data.value.machines[index].groups[groupIndex].access}값을 변경함`)
    }

    ////// 삭제할 장비를 삭제배열에 추가 혹은 취소하는 기능을 하는 각 행의 삭제버튼 클릭 시 실행되는 함수
    const addDeleteMachine = (selectedId) => {
      console.log(DeleteMachineArray.value.includes(selectedId))
      DeleteMachineArray.value = DeleteMachineArray.value.includes(selectedId)
        ? DeleteMachineArray.value.filter(id => id !== selectedId)
        : [...DeleteMachineArray.value, selectedId];
      console.log(DeleteMachineArray.value);
    }

    const editEvent = () => {
      if (editCheck.value){
        console.log("axios 시작")
        axios
          .patch(`/admin/machines`, {
            machines: data.value.machines,
            deletedMachines: DeleteMachineArray.value
          },
            {
              headers: {
                authorization:
                  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
              }
            })
          .then((response) => {
            console.log('Response:', response.data)
            console.log("수정,삭제 요청 완료 ")
            // 요청이 성공하면 실행되는 코드
            getValue();
          })
          .catch((error) => {
            // 요청이 실패하면 실행되는 코드
            console.error('Error:', error)
          })
      } else {
        console.log('수정으로 변경')
      }
      if (data.value.totalRow > 0) {
        editCheck.value=!editCheck.value
      }
    }


    return {
      menu, columnList, data, pages, handlePages, addDeleteMachine, checkTF, limit, editEvent,
      handleSearch, selectedOption, searchValue, groupList, editCheck, DeleteMachineArray
    }

  }
}

</script>
