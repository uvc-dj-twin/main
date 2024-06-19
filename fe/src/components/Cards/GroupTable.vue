<template>
  <div v-if="isLoading"
    class="h-500-px w-screen flex items-center justify-center text-5xl font-bold text-center">
    <div class="spinner" :style="{ transform: `rotate(${rotationDegree}deg)` }"></div>
  </div>
  <div v-else-if="people.length == 0"
    class="h-500-px w-screen flex items-center justify-center text-5xl font-bold text-center">
    조회 결과가 없습니다.
  </div>
  <div v-else class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg">
            {{ editCheck ? '회원 관리 수정' : '회원 관리 조회' }}

          </h3>
        </div>
        <!-- 일괄적용을 위한 드랍다운  -->
        <div v-show="editCheck" class="mx-4">
          <span class="mx-4">선택한 사용자의 변경할 그룹 선택</span>
          <div class="relative inline-block">
            <div @click="toggleDropdown"
              class="w-200-px h-200-px border-0 px-6 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base shadow focus:outline-none focus:ring ease-linear transition-all duration-150 cursor-pointer"
              style="min-width: 200px; max-width: 400px">
              {{ selectedText }}
            </div>
            <div v-if="dropdownOpen" class="absolute bg-white border mt-1 w-full z-10">
              <div v-for="option in props.groupList" :key="option.id" @click="selectOption(option)"
                class="px-6 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                <span>{{ option.name }}</span>
                <button @click.stop="() => { showModal = true; deleteOptionId = option.id }" class="text-red-500">
                  <i class="fas fa-trash-alt"></i> <!-- 삭제 아이콘 -->
                </button>
              </div>
              <div v-if="showModal"
                class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div class="bg-white p-6 rounded shadow-lg" style="width: 30vw; height: 200px;">
                  <!-- 모달 헤더 -->
                  <div class="flex justify-end p-4">
                    <button @click="cancelDelete" class="text-gray-600 hover:text-gray-800">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <!-- 모달 내용 -->
                  <div class="p-6 text-center">
                    <p class="mb-4 text-lg font-semibold">정말 삭제하시겠습니까?</p>
                    <!-- 취소/삭제 버튼 -->
                    <div class="flex justify-center">
                      <button @click="deleteOption" class="px-4 py-2 m-2 bg-red-500 text-white rounded">삭제</button>
                      <button @click="cancelDelete" class="px-4 py-2 bg-gray-100 text-gray-700 rounded m-2">취소</button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!addGroup" @click="handleAddOption"
                class="px-6 py-3 bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center">
                +
              </div>
              <div v-else
                class="px-3 py-3 bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center">
                <input v-model="addGroupName" type="text" class="box-border mr-2" style="width: 70%;" />
                <button style="width: 25%;" @click="handleAddGroup">추가</button>
              </div>
            </div>
          </div>

          <button
            class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-red-600"
            :class="[editCheck ? 'bg-color3 active:bg-emerald-600' : 'bg-red-500 active:bg-red-600']"
            style="min-width: 100px; max-width: 200px" @click="checkGroupAll">일괄 변경</button>
        </div>
        <button
          class="get-started bg-color3 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 active:bg-color3 active:bg-emerald-600"
          style="min-width: 100px; max-width: 200px" @click="handleEdit">{{ editCheck ? '저장' : '수정' }}
        </button>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              선택
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              이름
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              메일
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              현재 그룹
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-3xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              최종 그룹
            </th>


          </tr>
        </thead>
        <tbody>
          <!-- 데이터 배열을 반복하여 각 항목을 생성 -->

          <!-- <tr v-for="person in people" :key="person.id"> -->
          <tr v-for="(person, index) in people" :key="index">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4 text-left flex items-center">
              <input :id="`${index}`" type="checkbox" v-model="checkedArray[index]" @change="checkE"
                :disabled="!editCheck" />
              <!-- <span
                class="ml-3 font-bold"
                :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
              </span> -->
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4">
              <div class="flex items-center">
                <span class="mr-2">{{ person.name }}
                  <br></span>
                <div class="relative w-full">

                </div>
              </div>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4">
              {{ person.email }}
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4">{{
              person.Group?.name }}
              <!-- {{person.currentGroup}} -->
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl whitespace-nowrap p-4">
              <select v-model="selectedGroupArray[index]" @change="checkGroupE" :disabled="!editCheck" class="">
                <!-- <option selected :value="person.currentGroup">  {{ person.currentGroup }} </option> -->

                <option :value="option.id" v-for="option in props.groupList" :key="option">{{ option.name }}</option>

              </select>

            </td>

          </tr>


        </tbody>


      </table>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref, watch } from 'vue';

// import GroupDropdown from '@/components/Dropdowns/GroupDropdown.vue';

// import { defineProps } from 'vue'

export default {




  components: {
    // GroupDropdown
  },
  setup(props, { emit }) {
    const selectedValue = ref();
    onMounted(() => {
      checkedArray.value = (new Array(props.people.length).fill(false));
      selectedGroupArray.value = (new Array(props.people.length).fill(0));
      startRotation();
    });
    const selectedGroupArray = ref([]);
    const checkedArray = ref([]);
    const selectAll = ref('');
    const addGroup = ref(false);
    const addGroupName = ref('');
    const showModal = ref(false);
    const deleteOptionId = ref();


    // 커스텀 드롭다운
    const dropdownOpen = ref(false);
    const selectedText = computed(() => {
      const selectedOption = props.groupList.find(option => option.id === selectedValue.value);
      return selectedOption ? selectedOption.name : '그룹을 선택하세요';
    })

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
      addGroup.value = false
      addGroupName.value = ''
    }

    const selectOption = (option) => {
      selectedValue.value = option.id;
      dropdownOpen.value = false;
      addGroup.value = false;
      addGroupName.value = ''
    }

    const handleAddOption = () => {
      addGroup.value = true;
    }

    const handleAddGroup = () => {
      emit('handleAddGroup', addGroupName.value)
      addGroup.value = false;
      addGroupName.value = ''
    }

    const cancelDelete = () => {
      showModal.value = false
      deleteOptionId.value = -1;
    }

    const deleteOption = () => {
      emit('handleDeleteGroup', deleteOptionId.value)
      showModal.value = false
      deleteOption.value = -1;
    }

    const editCheck = ref(false);
    const handleEdit = () => {
      if (editCheck.value) {
        emit('handleEdit', props.people, selectedGroupArray.value)
        checkedArray.value = (new Array(props.people.length).fill(false));
        selectedGroupArray.value = (new Array(props.people.length).fill(0));
      } else {
        checkedArray.value = (new Array(props.people.length).fill(false));
        selectedGroupArray.value = props.people.map(person => person.Group?.id);
      }
      if (props.people.length > 0) {
        editCheck.value = !editCheck.value
      }
      console.log(editCheck.value)
    }

    const checkE = (event) => {

      const index = Number(event.target.id);
      // const checked = event.target.checked;
      // checkedArray.value[index] = checked;
      console.log(checkedArray.value[index])
    }

    const checkGroupE = (event) => {

      const index = Number(event.target.id);
      // const checked = event.target.checked;
      // checkedArray.value[index] = checked;
      console.log(selectedGroupArray.value[index])
      console.log(selectedGroupArray.value)

    }


    // 전체 체크박스에서 값이 변경되면,
    // 해당 체크박스가 true일 때만 선택된 그룹 값을 변경한다.
    const checkGroupAll = () => {
      console.log(selectedValue.value)
      // 전체 체크박스의 값을 반복하면서,
      checkedArray.value.forEach((checked, index) => {
        // 해당 체크박스가 true일 때,
        if (checked) {
          // 선택된 그룹 값을 변경한다.
          selectedGroupArray.value[index] = selectedValue.value
        }
      })
    }


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
    
    watch(() => props.isLoading, (newValue) => {
      if (newValue) {
        startRotation(); // 회전 시작
      } else {
        stopRotation(); // 회전 종료
      }
    });

    return {
      checkedArray, checkE, props, selectedValue,
      checkGroupE, checkGroupAll, selectAll,
      selectedGroupArray,
      handleEdit, editCheck,
      selectedText, dropdownOpen, toggleDropdown, selectOption, handleAddOption, addGroup, addGroupName, handleAddGroup,
      showModal, cancelDelete, deleteOption, deleteOptionId, rotationDegree,
    };
  },

  props: {
    people: Array,
    groupList: Array,
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
    isLoading: Boolean,
  },
};
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