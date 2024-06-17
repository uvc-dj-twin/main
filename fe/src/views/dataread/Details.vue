<template>
  <div class="p-8">
    <div class="flex flex-wrap mt-4">
      <div class="w-full ">
       

        <div class=" flex flex-wrap"
        style="justify-content: space-between">

          <div class="button-container">
            <HeaderDataRead></HeaderDataRead>
</div>
          <div>
            
            <EquipmentDropdown :equipmentList="equipmentList ? equipmentList : [] "  :value="selectedEquipmentName" @update:value="handleUpdateEquipment" @click="handleId"></EquipmentDropdown>
            <DefectTypeDropdown :defectTypeList="defectTypeList ? defectTypeList : [] "  :value="selectedDefectType" @update:value="handleUpdateDefect"></DefectTypeDropdown>
          </div>

          <DatePicker  @update:value="handleUpdateDate"></DatePicker>
          <TimePicker  @update:startTime="handleUpdateTimeStart" @update:endTime="handleUpdateTimeEnd"></TimePicker>
      
          <div
          style="display:flex;">
            <button @click="getValue"
              class="text-2xl get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-color1 active:bg-emerald-600"
              style="height:64px"
          >검색</button>
          </div>
          
        </div>
      


        <EquipmentTable  :id="selectedMachine.id" :columnList="columnList" :rowList="testResultArray" :totalRow="totalRow"/>
      </div>
    </div>
    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button
            class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style="transition:all .15s ease"
            v-for="(page, index) in pages"
            :key="index"
            :value="page"
            @click="handlePages"
          >
            {{ page }}
            
          </button>
        </div>
  </div>
</template>
<script>
import EquipmentTable from "@/components/Cards/EquipmentTable.vue";
import HeaderDataRead from "@/components/Headers/HeaderDataRead.vue";

import { inject, ref } from "vue";
import {onMounted} from "vue";

//장비선택
import EquipmentDropdown from '@/components/Dropdowns/EquipmentDropdown.vue';
import DefectTypeDropdown from '@/components/Dropdowns/DefectTypeDropdown.vue';

//날짜 선택
import  DatePicker from "@/components/Calenders/DatePicker.vue";
//시간 선택
import  TimePicker from "@/components/Calenders/TimePicker.vue";


// this.$emit('update:value',args.value.toLocaleDateString())

export default {
  components: {
    HeaderDataRead,
    EquipmentTable,
    DatePicker,
    TimePicker,
    EquipmentDropdown,
    DefectTypeDropdown,
    





//////

    
  },
  setup() {
    //초기화 관련 - 테이블 칼럼, 장비목록, 고장목록
    const columnList=['검사 결과','전류 검사 시간','검사 결과','진동 검사 시간','상세보기']
    const equipmentList = ref(
      [{
        id:1,
        seral_no:'L-SF-04',
        name:'설비1',
        threshold:100,
        defectType:[
          {id:0,
            name:'정상',
          },
          {id:1,
            name:'불량A',
          },
        ]
      },
      {
        id:2,
        seral_no:'L-SF-05',
        name:'설비2',
        threshold:200,
        defectType:[
          {id:0,
            name:'정상',
          },
          {id:2,
            name:'불량B',
          },
        ]
      },
    ]);
    const axios = inject('axios');

    onMounted( //장비목록 불러오는 API GET 실행
    axios
        .get(`/board/machines`, {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
          }
        })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          
          equipmentList.value = response.data
          console.log(equipmentList.value)
        //   equipmentList.value =response.data.map((x)=>x.name)
        //   console.log(equipmentList.value)
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)

        })
      )

      // const equipmentList = ref(machinetList.value.map(equipment => equipment.name));



    //response data에서 가져온 모든 장비 목록
   

    const selectedEquipmentName = ref(); 
    // 사옹자가 선택한 이름을 자식컴포넌트에서 넘겨받은 값을 저장한 변수
    const selectedMachine = ref({
      id: 1,
    }) //
    // selectedEquipmentName 이벤트를 통해 선택된 장비명 selectedEquipmentName을
    // handleId함수에서 .find로 같은 이름을 찾아 해당 장비를 저장

    const defectTypeList = ref()
    // handeleId 이벤트에서 확인된 selectedMachine에 접근해 불량유형들을 map으로 추출해 화면에 표시

    const selectedDefectType =ref(); 
    //화면에 표시된 불량유형 중 선택된 유형을 자식컴포넌트에서 받아와 저장할 변수명-쿼리용

const handleId = ()=>{
  console.log()

  selectedMachine.value = equipmentList.value.find(machine => machine.id === selectedEquipmentName.value);
  console.log(selectedMachine.value )

  defectTypeList.value = selectedMachine.value.defectTypes
  console.log(defectTypeList.value)
}
 // 장비선택 @click이벤트로 막 업데이트된 selectedEquipmentName정보로 머신과 머신의 불량유형저장함수

 

// 달력관련 변수들 
    const selectedDate=ref(1/1/2024); //날짜만 있는 정보 - 미사용
    const datePicker = ref(null);
    const startTime=ref();
    const endTime=ref();

// 조회 시 받아올 데이터 수 
    const totalRow=ref(100);
    // 데이터 수를 받고서 만들 페이지 수
    const pages=ref(0);
    const currentPage=ref(1);
    // 한 페이지 표시 행 수 
    const limits=ref(30);

    // 상세정보 전달 id
    

    const response = { data: testResultArray ,totalRow:100}; 

  // 업데이트 함수들 
    const handleUpdateEquipment = (value) => {
      selectedEquipmentName.value = value;
      
      console.log('부모 컴포넌트에서 선택된 값:', selectedEquipmentName.value);
    };
    
    const handleUpdateDefect = (value) => { //선택 후 바뀐 불량유형값을 확인
      selectedDefectType.value = value;
      console.log('부모 컴포넌트에서 선택된 값:', selectedDefectType.value);
    };
    
    const handleUpdateDate = (value) => { //선택 후 바퀸 달력날짜정보 - 미사용 
      selectedDate.value = value;
      console.log('부모 컴포넌트에서 선택된 값:', value);
    };

    
    const handleUpdateTimeStart = (value) => { //선택 후 바뀐 시작시간값 확인
      startTime.value = value;
      console.log('부모 컴포넌트에서 선택된 시작시간값:', value);
    };



    const handleUpdateTimeEnd = (value) => {//선택 후 바뀐 종료 시간값 확인
      endTime.value = value;
      console.log('부모 컴포넌트에서 선택된 종료시간값:', value);
    };



    const onValueChange = (args)=> { //바뀐 값을 화면 텍스트 확인용, 불필요
      document.getElementById("date_label").textContent =
        args.value.toLocaleDateString();
    }

    //페이지에 붙일 이벤트 - 페이지수만 바꿔서 조회요청 
    const handlePages = (event) => {
      currentPage.value=event.target.value
      getValue()
    } 

    
    const getValue = () => {
  
      const splitDate = selectedDate.value.split('.')
      console.log(splitDate)
      startTime.value.setFullYear(parseInt(splitDate[0].trim()), parseInt(splitDate[1].trim())-1, parseInt(splitDate[2].trim()))
      endTime.value.setFullYear(parseInt(splitDate[0].trim()), parseInt(splitDate[1].trim())-1, parseInt(splitDate[2].trim()))
      // selectedDate.value.setFullYear(2024, selectedDate.value.getMonth()-1, selectedDate.value.getDay()+1)
      console.log(startTime.value)
      // selectedDate.value.setFullYear(2024, selectedDate.value.getMonth()-1, selectedDate.value.getDay()+1)
      console.log(endTime.value)





      console.log("순수날짜 ",selectedDate.value)
      
      console.log("시작시간: ",startTime.value)
      console.log("종료시간: ",endTime.value)
      console.log("장비선택 선택 후 받은 장비객체id: ",selectedMachine.value.id)
      console.log("한 페이지 수 :",limits.value)
      console.log("요청 페이지 정보: ",currentPage.value)
      console.log("불량타입",selectedDefectType.value) 
      console.log("현재 페이지:", currentPage.value)
    
    
      // console.log(startTime.value.setfullyear(2024,11,11))
      // const a=startTime.value.setFullYear(2024, selectedDate.value.getMonth()-1, selectedDate.value.getDay())
      // console.log(a)
      
     
    


    //들어갈 것: 

  //date(날짜선택)
// startTime(시작 시간)
// endTime(종료 시간)
// result(검사결과id, result query가 없으면 All)
// limit(한 페이지에 보일 행 수)
// page(몇 페이지인지)


    // console.log('Response:', response.data)
    // testResultArray.value=response.data
    

    axios
      .get(`/board/machines/details/${selectedMachine.value.id}?startTime=${startTime.value}&endTime=${endTime.value}&result=${selectedDefectType.value}&limit=${limits.value}&page=${currentPage.value}`, {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
        }
      })
      .then((response) => {
        
        // 요청이 성공하면 실행되는 코드
        console.log('Response:', response.data)

        testResultArray.value=response.data.data

        console.log(testResultArray)



        totalRow.value=response.data.totalRow
        console.log(testResultArray.value)
        console.log(totalRow.value)
        console.log(limits.value)
        console.log(totalRow.value/limits.value)
        const total = Number(totalRow.value);
        const limit = Number(limits.value);
        pages.value= total % limit === 0 ? total / limit : Math.floor(total / limit) + 1;
   

    console.log(pages.value)
       
      })
      .catch((error) => {
        // 요청이 실패하면 실행되는 코드
        console.error('Error:', error)

      })
   


   
  };



  const testResultArray=ref([
		{
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },
    {
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },

	])
  

    return {
      columnList, //초기화 칼럼
      equipmentList, // 초기화장비목록

      handleUpdateEquipment, //장비 선택
      handleUpdateDefect, // 불량유형 업데이트
      
      onValueChange, //선택된 날짜 화면표시용 지워도 됨 
      datePicker,
      handleUpdateTimeStart,
      handleUpdateTimeEnd,
      getValue,
      startTime,
      endTime,
      testResultArray,
      totalRow,
      selectedMachine,

      pages,
      handlePages,
      defectTypeList,
      handleId,
      handleUpdateDate,
      
      response
      
    };

  }
};
</script>

<style scoped>

#component_wrapper {
  display: block;
  margin: 0 auto;
  float: none;
  padding: 2% 0;
  max-width: 300px;
}

.control-section.range {
  margin: 30px;
  padding: 3%;
}

.e-bigger .control-section.range {
  margin-top: 60px;
}

.range .tabs-wrap {
  padding: 12px 0px;
}

/* 기간조회와 세부조회 버튼을 감싸는 div 스타일 */
.button-container {
  display: flex;
  flex-direction: row; /* 가로로 정렬 */
  justify-content: center; /* 가운데 정렬 */
  gap: 10px; /* 버튼 사이 간격 */
}

/* 개별 버튼 스타일 */
.button-container button {
  padding: 10px 20px;
  font-size: 16px;
  /* 추가적인 스타일 */
}
</style>


