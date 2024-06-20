<template>
  <div>
    <div class="flex flex-wrap mt-4" style="margin-right: 56px;">
      <div class="w-full">
        <div class="flex flex-row mt-4">
          <div>
            <!-- <h3 class="font-bold text-5xl relative w-full max-w-full flex-grow flex-1" style="width:300px">
              장비 테이블
            </h3> -->
          </div>
          <div class="flex items-center justify-end w-full h-full">
            <HeaderForm :menu="menu" @handleSearch="handleSearch" />
          </div>

        </div>
        <div v-if="isLoading" class="h-500-px w-screen flex items-center justify-center text-5xl font-bold text-center">
          <div class="spinner" :style="{ transform: `rotate(${rotationDegree}deg)` }"></div>
        </div>
        <div v-else-if="totalRow == 0"
          class="h-600-px w-screen flex items-center justify-center text-5xl font-bold text-center">
          조회 결과가 없습니다.
        </div>


        <div v-else class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg">
                  {{ editCheck ? '접근 권한 수정' : '접근 권한 조회' }}
                </h3>
              </div>

              <ModalMachineAdd @handleAddEquipment="handleAddEquipment" />
              <button
                class="get-started bg-color3 text-white font-bold py-4 px-12 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-color3 active:bg-emerald-600"
                @click="editEvent" style="min-width: 100px; max-width: 200px">
                {{ editCheck ? '권한 저장' : '권한 수정' }}
              </button>
            </div>
          </div>

          <div class="text-left block w-full overflow-x-auto">
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    장비명
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Threshold
                  </th>
                  <th v-for="(group, index) in groupList" :key="index"
                    class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    그룹 {{ group.name }}
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    삭제
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(machine, index) in data.machines" :key="index">
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    {{ machine.name }}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4" style="width: 15%;">
                    <input v-if="editCheck" type="text" v-model="machine.threshold" placeholder="Search here..."
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10" />
                    <div v-else class="px-3 py-3 text-blueGray-600 relative bg-white rounded text-sm outline-none w-full pl-10">{{ machine.threshold }}</div>
                  </td>
                  <td v-for="(group, groupIndex) in machine.groups" :key="groupIndex"
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    <div class="col-lg-12 control-section">
                      <div class="content-wrapper">
                        <div class="container switch-control">
                          <div>
                            <label for="groupA" style="padding: 10px 10px 10px 0"> 권한부여 </label>
                            <input type="checkbox" v-model="group.access" @click="checkTF(index, groupIndex)"
                              :disabled="!editCheck" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button @click="addDeleteMachine(machine.id)"
                      class="bg-color3 text-sm get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-color3"
                      style="text-align: right;">
                      {{ DeleteMachineArray.includes(machine.id) ? '취소' : '삭제' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>


      </div>
    </div>
    <div class="flex relative w-full px-4 max-w-full flex-grow flex-1 text-right justify-center">
      <button @click="handleMinPages" class="mr-2">이전</button>
      <div class="mt-2">
        <button
          class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
          type="button" style="transition: all .15s ease" v-for="(page) in pages" :key="page" :value="page" :class="{
            'hidden': !(Math.floor(page / 10) === Math.floor(currentPage / 10)) &&
              page !== 1 &&
              page !== pages
          }" @click="handlePages">
          {{ page }}
        </button>
      </div>
      <button @click="handleMaxPages" class="ml-2">다음</button>
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

import ModalMachineAdd from "@/components/modals/ModalMachineAdd.vue";

// 감시할 data의 상태를 추가
// 이 예제에서는 'test' 변수의 상태를 감시합니다.


function rippleHandler(e) {
  const rippleSpan = this.nextElementSibling.querySelector('.e-ripple-container');
  rippleSpan && rippleMouseHandler(e, rippleSpan);
}



export default {
  components: {
    HeaderForm,
    ModalMachineAdd,

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
    const totalRow = ref(0);
    const limit = ref(10);
    const selectedOption = ref(menu[0])
    const searchValue = ref('')
    const groupList = ref([])
    const editCheck = ref(false)

    const isLoading = ref(false)
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

    const handleAddEquipment = () => {
      getValue();
    }

    const getValue = () => {
      isLoading.value = true;
      // groups.value = [];
      // users.value = [];


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
          isLoading.value = false;
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          const result = JSON.parse(JSON.stringify(response.data));
          data.value = result
          totalRow.value = Number(data.value.totalRow);
          const total = Number(data.value.totalRow);
          pages.value = total % limit.value === 0 ? total / limit.value : Math.floor(total / limit.value) + 1;
          if (result.machines.length > 0) {
            groupList.value = result.machines[0].groups
          }
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          isLoading.value = false;
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
      if (editCheck.value) {
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
        editCheck.value = !editCheck.value
      }
    }

    const handleMaxPages = () => {
      if (Math.floor(currentPage.value / 10) < Math.floor(totalRow.value / 10)) {
        currentPage.value = currentPage.value + 10
      }
    }
    const handleMinPages = () => {
      if (Math.floor(currentPage.value / 10) >= 1) {
        currentPage.value = currentPage.value - 10
      }
    }


    ////////////////로딩관련 처리////////////////////////
    let rotationDegree = ref(0);
    let rotateInterval;

    const startRotation = () => {
      // 회전 각도 초기화
      rotationDegree.value = 0;
      // 회전 각도를 10도씩 증가시키는 인터벌 설정
      rotateInterval = setInterval(() => {
        rotationDegree.value += 10; // 회전 속도 조절 가능
      }, 100); // 회전 속도 조절 가능
    };

    const stopRotation = () => {
      clearInterval(rotateInterval); // 회전 인터벌 종료
    };

    watch(() => isLoading.value, (newValue) => {
      if (newValue) {
        startRotation(); // 회전 시작
      } else {
        stopRotation(); // 회전 종료
      }
    });



    return {
      menu, columnList, data, pages, handlePages, addDeleteMachine, checkTF, limit, editEvent,
      handleSearch, selectedOption, searchValue, groupList, editCheck, DeleteMachineArray,
      handleMinPages, handleMaxPages, totalRow, currentPage,
      isLoading, rotationDegree, handleAddEquipment
    }

  }
}

</script>

<style scoped>
.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7986cb;
  border-radius: 50%;
}
</style>