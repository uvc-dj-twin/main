<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <HeaderForm></HeaderForm>
        <div></div>
        <button @click="handlePages"> </button>
        <button @click="handlePages"> 테스트 조회버튼 </button>
        <button @click="editEvent"> 테스트 수정,삭제버튼  </button>

        


        
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
          :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
        >
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  class="font-semibold text-lg"
                  :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
                >
                  장비 테이블
                </h3>
              </div>
            </div>
          </div>
          <div v-if="true" class="block w-full overflow-x-auto">
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th> 장비명 </th>
                  <th>Threshold</th>
                  <th v-for="(group, index) in data.machines[0].groups" :key="index"
                      class="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      :class="[
                        color === 'light'
                          ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                          : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                      ]">그룹 {{ group.name }}</th>
                      <th>저장</th>
                </tr>
              </thead>
              <tbody>
                 <!-- // v-for 시작 한 행에 대한 정보 -->
                <tr v-for="(machine, index) in data.machines" :key="index">
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    {{ machine.name }}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    <input type="text" v-model="machine.threshold" placeholder="Search here..."
                           class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10" />
                  {{ machine.threshold }}
                          </td>
                  <td v-for="(group,groupIndex) in machine.groups" :key="groupIndex" 
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    <div class="col-lg-12 control-section">
                      <div class="content-wrapper">
                        <div class="container switch-control">
                          <div>
                            <label for="groupA" style="padding: 10px 70px 10px 0"> 권한부여 </label>
                            <input type="checkbox" v-model="group.access" @click="checkTF(index, groupIndex)" placeholder="Search here..."/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <!-- <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    <div class="col-lg-12 control-section">
                      <div class="content-wrapper">
                        <div class="container switch-control">
                          <div>
                            <label for="groupB" style="padding: 10px 70px 10px 0"> 권한부여 </label>
                            <input type="checkbox" v-model="machine.groups[1]" @click="checkTF(index, 'GroupB')" placeholder="Search here..."/>

                          </div>
                        </div>
                      </div>
                    </div>
                  </td> -->
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-left"
                      style="text-align: left;">
                    <div class="col-lg-12 control-section">
                      <div class="content-wrapper">
                        <div class="container switch-control">
                          <!-- <div>
                            <label for="groupC" style="padding: 10px 70px 10px 0"> 권한부여 </label>
                         <input type="checkbox" v-model="row.GroupC" @click="checkTF(index, 'GroupC')" placeholder="Search here..."/>
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button @click="addDeleteMachine(machine.id)">삭제</button>
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
      <button class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
              type="button" style="transition: all .15s ease" v-for="(page) in pages" :key="page" value="page" @click="handlePages">
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
import { ref,watch } from "vue";

import { rippleMouseHandler } from "@syncfusion/ej2-buttons";

import axios from "axios";

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
    const DeleteMachineArray = ref([]);
    
  const columnList=['장비명','Threshold','그룹A','그룹B','그룹C','저장']
  const pages=ref(0);
  const currentPage=ref(1);
  const limit=ref(30);
  const name=ref('설비')
const groupName=ref('1번')

    const handlePages = (event) => {
      currentPage.value=event.target.value
      console.log("현재 장비명:",name.value)
      console.log("현재 그룹명:",groupName.value)
      getValue()
    } 
    
const getValue=() => {
  console.log("axios 시작")
  

  axios
    .get(`http://192.168.0.64:3000/admin/machines?name=설비`, {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
      }
    })
    .then((response) => {
      // 요청이 성공하면 실행되는 코드
      console.log('Response:', response.data)
      const result = JSON.parse(JSON.stringify(response.data));

      data.value= result
      console.log(data.value)

      data.value.



  console.log(data.value.totalRow/limit.value)


  const total = Number(data.value.totalRow);
  const limit = Number(limit.value);
  pages.value= total % limit === 0 ? total / limit : Math.floor(total / limit) + 1;
 

  console.log(pages.value)
    })
    .catch((error) => {
      // 요청이 실패하면 실행되는 코드
      console.error('Error:', error)

    })

};





  const data = ref({
  "totalRow": 2,
  "machines": [
    {
      "id": 10,
      "serialNo": "L-EF-00",
      "name": "설비10",
      "threshold": 100,
      "groups": [
        {
          "id": 3,
          "name": "1번",
          "access": true
        },
        {
          "id": 2,
          "name": "9번",
          "access": true
        },
        {
          "id": 4,
          "name": "2번",
          "access": false
        }
      ]
    },
    {
      "id": 15,
      "serialNo": "L-EF-99",
      "name": "설비10",
      "threshold": 100,
      "groups": [
        {
          "id": 3,
          "name": "1번",
          "access": true
        },
        {
          "id": 2,
          "name": "9번",
          "access": true
        },
        {
          "id": 4,
          "name": "2번",
          "access": false
        }
      ]
    },
    {
      "id": 20,
      "serialNo": "L-SF-09",
      "name": "설비20",
      "threshold": 550,
      "groups": [
        {
          "id": 3,
          "name": "1번",
          "access": true
        },
        {
          "id": 2,
          "name": "9번",
          "access": true
        },
        {
          "id": 4,
          "name": "2번",
          "access": false
        }
      ]
    }
  ]
})

      const checkTF= (index,groupIndex)=>{
  console.log(`${data.value.machines[index].name}기계의 ${data.value.machines[index].groups[groupIndex].name}그룹 권한설정 상태: ,${data.value.machines[index].groups[groupIndex].access}값을 변경함`)
}

  ////// 삭제할 장비를 삭제배열에 추가 혹은 취소하는 기능을 하는 각 행의 삭제버튼 클릭 시 실행되는 함수
      const addDeleteMachine = (selectedId) =>{
        DeleteMachineArray.value = DeleteMachineArray.value.includes(selectedId) 
    ? DeleteMachineArray.value.filter(id => id !== selectedId) 
    : [...DeleteMachineArray.value, selectedId];
      }

      const editEvent = ()=>{
        console.log("axios 시작")
  

  axios
    .patch(`http://192.168.0.64:3000/admin/machines`, {
      
        machines: data.value.machines,
        deleteMachines: DeleteMachineArray.value
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
     
    })
    .catch((error) => {
      // 요청이 실패하면 실행되는 코드
      console.error('Error:', error)

    })

  }



      return {
    columnList,data,pages,handlePages,addDeleteMachine,checkTF,limit,editEvent
  }


  }


  }

</script>
