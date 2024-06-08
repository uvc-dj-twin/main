<template>
  <div>
    <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <HeaderForm></HeaderForm>
      <div>필터 관리</div>
      <EquipmentTable :columnList="columnList"/>
      
    </div>
  </div>
  </div>
</template>
<script>
// import CardLineChart from "@/components/Cards/CardLineChart.vue";
// import CardBarChart from "@/components/Cards/CardBarChart.vue";
// import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
// import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import EquipmentTable from "@/components/Cards/EquipmentTable.vue";
import HeaderForm from "@/components/Headers/HeaderForm.vue";




export default {
  components: {
    EquipmentTable,
    HeaderForm
    // CardLineChart,
    // CardBarChart,
    // CardPageVisits,
    // CardSocialTraffic,
  },
  setup() {
  const columnList=['장비명','전류 검사 결과','전류 검사 시간','진동 검사 결과','진동 검사 시간']

  return {
    columnList
  }


  }
};
</script>
