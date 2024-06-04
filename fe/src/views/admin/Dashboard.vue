<template>
  <div>
    <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <HeaderStats></HeaderStats>
      <RealTimeCard />
      
    </div>
  </div>
  </div>
</template>
<script>
// import CardLineChart from "@/components/Cards/CardLineChart.vue";
// import CardBarChart from "@/components/Cards/CardBarChart.vue";
// import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
// import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import RealTimeCard from "@/components/Cards/RealTimeCard.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";


export default {
  components: {
    HeaderStats,
    RealTimeCard,
    // CardLineChart,
    // CardBarChart,
    // CardPageVisits,
    // CardSocialTraffic,
  },
};
</script>
