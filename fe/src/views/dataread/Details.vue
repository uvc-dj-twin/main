<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <!-- <HeaderStats></HeaderStats> -->
        <h1>장비와 날짜, 조회시각을 선택하세요</h1>

        <!-- <IndexDropdownVue></IndexDropdownVue> 상단 인덱스 드랍다운용
        <NotificationDropdown></NotificationDropdown> 알람아이콘 클릭 드랍다운용
        <PagesDropdown></PagesDropdown> //인덱스와 같은 듯 함
        <TableDropdown></TableDropdown> // : 클릭 드랍다운용  -->
        <!-- <user-dropdown> </user-dropdown> //프로필 아이콘 클릭 드랍다운용 -->

        <div class="flex">
          
<EquipmentDropdownVue></EquipmentDropdownVue>
        <DatePicker></DatePicker>
        <TimePicker></TimePicker>

        </div>
      


        <RealTimeCard />
      </div>
    </div>
  </div>
</template>
<script>
import RealTimeCard from "@/components/Cards/RealTimeCard.vue";





//장비선택
import EquipmentDropdownVue from '@/components/Dropdowns/EquipmentDropdown.vue';
//날짜 선택
import  DatePicker from "@/components/Calenders/DatePicker.vue";
//시간 선택
import  TimePicker from "@/components/Calenders/TimePicker.vue";





export default {
  components: {
    RealTimeCard,
    DatePicker,
    TimePicker,
    EquipmentDropdownVue,



   

//////

    
  },
  setup() {
    const onValueChange = (args)=> {
      document.getElementById("date_label").textContent =
        args.value.toLocaleDateString();
    }


    ///

  ///


  

    return {onValueChange};

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
</style>

