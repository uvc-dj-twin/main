<template>
  <div
    class="
    text-xl text-center relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg h-full items-center"
  style="height: inherit;margin-bottom: 22px;width: 50vw;"
    >
    <div class="flex-auto">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="font-semibold text-xl text-blueGray-700">
             장비명: {{ machineName }}
          </h5>
            <br>
          <span class="font-semibold text-blueGray-700">
            serial-No: {{ serialNo }}
          </span>
          <br>
          <span class="font-semibold text-blueGray-700">
          이상률: {{ totalResult }} 
          </span>
          <br>
          <span class="font-semibold text-blueGray-700">
          시작일: {{ startDate }} 
          </span>
          <br>
          <span class="font-semibold text-blueGray-700">
          종료일:  {{ endDate }}
          </span>
        </div>
        <!-- <div class="text-3xl relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
            :class="[statIconColor]"
          >
            <i :class="[statIconName]"></i>
          </div>
        </div> -->
      </div>
     
  
    </div>
  </div>
</template>

<script>
export default {
  name: "machine-info",
  props: {
   machineName : {
      type: String,
      default: "설비1",
    },
    serialNo: {
      type: String,
      default: "L-SF-04",
    },
    totalResult: {
      type: String,
      default: "10%",
    },
    startDate: {
      type: String,
      default: "2024-06-01",
    },
    endDate: {
      type: String,
      default: "2024-06-06",
    },

    // can be any of the text color utilities
    // from tailwindcss
  
  
  },
  setup() {

    // const {data} = props
    // const dailyCount =ref();
    // const dailyState =ref();
    // dailyCount.value = data.dailyCount;
    // dailyState.value = data.dailyState;

    // Watch for changes in the prop and update the ref accordingly
    // const percent = ref(props.statPercent);

    // watch(() => props.statPercent, (newVal) => {
    //   percent.value = newVal;
    // });

    return {  };
  },
};
</script>
