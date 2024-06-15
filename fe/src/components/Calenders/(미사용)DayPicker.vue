<template>
  <div class="col-lg-12 control-section">
    <div id="wrapper">
      <ejs-datepicker :placeholder="waterMarkText" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { DatePickerComponent } from "@syncfusion/ej2-vue-calendars";

export default {
  components: {
    "ejs-datepicker": DatePickerComponent,
  },
  setup() {
    const waterMarkText = ref("Choose a date");

    const onValueChange =  function(args) {
        document.getElementById("date_label").textContent =
          "Selected Value: " + args.value.toLocaleDateString();
          this.$emit('update:value',args.value.toLocaleDateString())
      }

    return {
      waterMarkText,onValueChange
    };
  },
};
</script>

<style scoped>
#wrapper {
  max-width: 246px;
  margin: 30px auto;
  padding-top: 15px;
}
</style>
