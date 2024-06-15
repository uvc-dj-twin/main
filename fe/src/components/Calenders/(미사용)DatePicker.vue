<template>
  <div class="col-lg-12 control-section">
      <div class="control_wrapper calendar-default">
          <div id="container" style="overflow:auto">
                <ejs-calendar id="calendar" :change="onValueChange"></ejs-calendar>
              <span id="date_label"> Selected Value: </span>
  
          </div>
      </div>
  </div>
  </template>
  
  <script>
  
  import { CalendarComponent } from "@syncfusion/ej2-vue-calendars";
  
  export default {
    props: {
    
    },
      components: { 'ejs-calendar': CalendarComponent },
    methods: {
      onValueChange: function(args) {
        document.getElementById("date_label").textContent =
          "Selected Value: " + args.value.toLocaleDateString();
          this.$emit('update:value',args.value.toLocaleDateString())
      }
    }
  };
  </script>
<!-- 
setup(props, { emit }) {
  const selectedValue = ref(props.value);
  const handleChange = () => {
    // 선택된 값을 부모 컴포넌트로 emit
    emit('update:value', selectedValue.value);
  }; -->
  
  
  <style scoped>
  #date_label {
    display: block;
    width: 248px;
    color: rgba(0, 0, 0, 0.58);
    margin-left: 5px;
  }
  
  .control_wrapper.calendar-default {
    max-width: 300px;
    margin: 0 auto;
  }
  
  body.fluent-dark #date_label,
  body.bootstrap5-dark #date_label,
  body.tailwind-dark #date_label,
  body.material-dark #date_label,
  body.material3-dark #date_label,
  body.fabric-dark #date_label,
  body.bootstrap-dark #date_label,
  body.highcontrast #date_label {
      color: white;
  } 
  </style>