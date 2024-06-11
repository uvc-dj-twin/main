<template>
  <div class="control-section range">
    <div id="component_wrapper">
      <div class="pane">
        <div class="tabs-wrap">
          <div class="wrap">
            <ejs-timepicker id='startPicker' :change='onEnableEndTime' :enabled="startEnable" :readonly="startRead" :placeholder="timeplaceholder" v-model="startVal"></ejs-timepicker>
          </div>
        </div>
        <div class="tabs-wrap" style="clear: both">
          <div class="wrap">
            <ejs-timepicker id='endPicker' :placeholder="timeplaceholder" :enabled="endEnable" :readonly='endRead'  :max="max" :step="step" v-model="endVal" @change='changeValue'></ejs-timepicker>
          </div>
        </div>
        <div class="tabs-wrap">
          <div class="wrap" style="clear: both">
            <ejs-checkbox id="dayRange" label="Business Hours" @change="changeTime"></ejs-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { TimePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";

export default {
  components: { 
    'ejs-timepicker': TimePickerComponent,
    'ejs-checkbox': CheckBoxComponent
  },
  setup(props,{emit}) {
    const waterMark = "Select a time";
    const endEnable = ref(false);
    const startEnable = ref(true);
    const startRead = ref(false);
    const endRead = ref(false);
    const min = ref(new Date());
    const max = ref(); // max 값 추가

    const step = 30;
    const startVal = ref(null);
    const endVal = ref(null);

    const changeValue = (args) => {
      endVal.value = args.value;
      console.log("End Time Changed:", endVal.value);
      emit('update:endTime',args.value)

    };

    const onEnableEndTime = (args) => {
      console.log("Start Time Changed:", args.value);
      startVal.value = args.value;
      if (startVal.value) {
        endEnable.value = true;
        endVal.value = null;
        const value = new Date(startVal.value);
        value.setMinutes(value.getMinutes() + step);
        
        const maxValue = new Date(startVal.value);
        maxValue.setHours(maxValue.getHours() + 1); // startTime의 1시간 후로 max 설정
        max.value = maxValue;
        emit('update:startTime',args.value)
      }
    };

    const changeTime = (args) => {
      if (args.checked) {
        startVal.value = new Date("9/6/2017 9:00");
        endEnable.value = true;
        endVal.value = new Date("9/6/2017 18:00");
        startRead.value = true;
        endRead.value = true;
      } else {
        startVal.value = null;
        endVal.value = null;
        startRead.value = false;
        endRead.value = false;
        endEnable.value = false;
      }
    };

    return {
      waterMark,
      endEnable,
      startEnable,
      startRead,
      endRead,
      min,
      max,
      step,
      startVal,
      endVal,
      changeValue,
      onEnableEndTime,
      changeTime
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
</style>
















<!-- <template>
  <div class="control-section range">
    <div id="component_wrapper">
      <div class="pane">
        <div class="tabs-wrap">
          <div class="wrap">
            <ejs-timepicker id='startPicker' :change='onEnableEndTime' :enabled="startEnable" :readonly="startRead" :placeholder="timeplaceholder" v-model="v1"></ejs-timepicker>
          </div>
        </div>
        <div class="tabs-wrap" style="clear: both">
          <div class="wrap">
            <ejs-timepicker id='endPicker' :placeholder="timeplaceholder" :enabled="endEnable" :readonly='endRead' :min="min" :step="step" :value="endVal" :change='changeValue'></ejs-timepicker>
          </div>
        </div>
        <div class="tabs-wrap">
          <div class="wrap" style="clear: both">
            <ejs-checkbox id="dayRange" label="Business Hours" :change="changeTime"></ejs-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { TimePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";

export default {
  setup() {
    const timeplaceholder = "Select a time";
    const endEnable = ref(false);
    const startEnable = ref(true);
    const startRead = ref(false);
    const endRead = ref(false);
    const min = ref(new Date());
    const isStartTimeChange = ref(true);
    const step = 30;
    const startVal = ref(null);
    const endVal = ref(null);

    const v1=ref(12);

    const changeValue = (args) => {
      endVal.value = args.value;
    };

    const onEnableEndTime = (args) => {
      if (isStartTimeChange.value) {
        endEnable.value = true;
        endVal.value = null;
        // startVal.value = new Date(args.value);
      const startPicker = document.getElementById('startPicker');
      v1.value=args.value;
      console.log("v1",v1.value);
      if (startPicker) {
        startPicker.ej2_instances[0].value = args.value;
      }
      console.log("id로 바꿨는지 확인할 것")
        // value.setMinutes(value.getMinutes() + step);
        // min.value = value;
      } else {
        isStartTimeChange.value = true;
      }
    };

    const changeTime = (args) => {
      isStartTimeChange.value = false;
      if (args.checked) {
        startVal.value = new Date("9/6/2017 11:00");
        endEnable.value = true;
        endVal.value = new Date("9/6/2017 18:00");
        startRead.value = true;
        endRead.value = true;
      } else {
        endVal.value = null;
        startVal.value = null;
        startRead.value = false;
        endRead.value = false;
        endEnable.value = false;
      }
    };

    return {
      timeplaceholder,
      endEnable,
      startEnable,
      startRead,
      endRead,
      min,
      isStartTimeChange,
      step,
      startVal,
      endVal,
      changeValue,
      onEnableEndTime,
      changeTime,

      v1,
    };
  },
  components: { 
    'ejs-timepicker': TimePickerComponent,
    'ejs-checkbox': CheckBoxComponent
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
</style> -->
