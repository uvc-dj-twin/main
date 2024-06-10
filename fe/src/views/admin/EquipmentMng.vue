<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <HeaderForm></HeaderForm>
        <div>필터 관리</div>
        <button @click="handlePages">테스트</button>
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
                  <th v-for="(column, index) in columnList" :key="index"
                      class="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      :class="[
                        color === 'light'
                          ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                          : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                      ]">{{ column }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in data.machineList" :key="index">
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    {{ row.장비명 }}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    <input type="text" v-model="row.threshold" placeholder="Search here..."
                           class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10" />
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    <div class="col-lg-12 control-section">
                      <div class="content-wrapper">
                        <div class="container switch-control">
                          <div>
                            <label for="groupA" style="padding: 10px 70px 10px 0"> 권한부여 </label>
                            <input type="checkbox" v-model="row.GroupA" @click="checkTF(index, 'GroupA')" placeholder="Search here..."/>

                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4">
                    <div class="col-lg-12 control-section">
                      <div class="content-wrapper">
                        <div class="container switch-control">
                          <div>
                            <label for="groupB" style="padding: 10px 70px 10px 0"> 권한부여 </label>
                            <input type="checkbox" v-model="row.GroupB" @click="checkTF(index, 'GroupB')" placeholder="Search here..."/>

                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-left"
                      style="text-align: left;">
                    <div class="col-lg-12 control-section">
                      <div class="content-wrapper">
                        <div class="container switch-control">
                          <div>
                            <label for="groupC" style="padding: 10px 70px 10px 0"> 권한부여 </label>
                         <input type="checkbox" v-model="row.GroupC" @click="checkTF(index, 'GroupC')" placeholder="Search here..."/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button @click="reqAccess(index)">저장</button>
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
              type="button" style="transition: all .15s ease" v-for="(page, index) in pages" :key="index" @click="handlePages(page)">
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
  const columnList=['장비명','Threshold','그룹A','그룹B','그룹C','저장']
  const pages=ref(0);
  const limits=ref(30);
  const totalRow=ref(10);




  const data = ref({totalRow:100,
    machineList:[
      {id:1,
        장비명:'설비1',
        threshold:10,
        GroupA:true,
        GroupB:true,
        GroupC:true,
        },
        {id:2,
        장비명:'설비1',
        threshold:10,
        GroupA:true,
        GroupB:true,
        GroupC:true,
        },
        {id:3,
        장비명:'설비1',
        threshold:10,
        GroupA:true,
        GroupB:true,
        GroupC:true,
        },    {id:4,
        장비명:'설비1',
        threshold:10,
        GroupA:true,
        GroupB:true,
        GroupC:true,
        },]
      })

      const checkTF= (index,groupName)=>{
  console.log(data.value.machineList[index][groupName])
}

      const reqAccess = (i) =>{
        console.log(data.value.machineList[i]['장비명']) // 인식됨
        console.log(data.value.machineList[i]['GroupA']) // 인식됨
        console.log(data.value.machineList[i]['GroupB']) // 인식됨
        console.log(data.value.machineList[i]['GroupC']) // 인식됨
      }

       //페이지에 붙일 이벤트 - 페이지수만 바꿔서 조회요청 
    const handlePages = (page) => {
      pages.value=page
      getValue()
    } 

    
    const getValue = () => {
    
      
      
      console.log(limits.value)
      console.log(pages.value)
      

      



      // data.value.machineList=data;
      // data.value.machineList=data;




      
    

    //들어갈 것: 

// id(회원)
// 장비명:string
// 그룹명:string
// limit(한 페이지에 보일 행 수)
// page(몇 페이지인지)


    // console.log('Response:', response.data)
    // testResultArray.value=response.data
    

    // axios)
    //   .get(`http://192.168.0.64:3000/dataread/details/${id}?장비명=${equipmentName.value}&그룹명=${groupName.value}`, {
    //     headers: {
    //       authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
    //     }
    //   })
    //   .then((response) => {
    //     // 요청이 성공하면 실행되는 코드
    //     console.log('Response:', response.data)
    //     dailyTrend.value=response.data.dailyTrend
    //     totalCount.value=response.data.totalCount
    //     defectCount.value=response.data.defectCount
    //     showGraph.value=true
    //   })
    //   .catch((error) => {
    //     // 요청이 실패하면 실행되는 코드
    //     console.error('Error:', error)
    //     showGraph.value=true

    //   })
    console.log(totalRow.value)
    console.log(limits.value)
    console.log(totalRow.value/limits.value)


    const total = Number(totalRow.value);
    const limit = Number(limits.value);
    pages.value= total % limit === 0 ? total / limit : Math.floor(total / limit) + 1;
   

    console.log(pages.value)
  };

    

      return {
    columnList,data,pages,handlePages,reqAccess,checkTF
  }


  }


  }

</script>
