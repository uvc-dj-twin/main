<template>
  <div>
    <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <HeaderForm></HeaderForm>
      <GroupTable />
      
    </div>
  </div>
  </div>
</template>
<script>
import GroupTable from "@/components/Cards/GroupTable.vue";
import HeaderForm from "@/components/Headers/HeaderForm.vue";


export default {
  components: {
    GroupTable,
    HeaderForm,
 
  },
};
</script>
