<template>
  <div>
    <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <HeaderForm :menu="menu" />
      <GroupTable :people="peopleArr" />
      
      
    </div>
  </div>
  </div>
</template>
<script>
import GroupTable from "@/components/Cards/GroupTable.vue";
import HeaderForm from "@/components/Headers/HeaderForm.vue";
import test from "@/data/userlist.js"

export default {
  components: {
    GroupTable,
    HeaderForm,
 
  },
  setup() {
    const menu = ['Mail','Group'];
    const peopleArr =test
      return {peopleArr,menu}
  }
};
</script>
