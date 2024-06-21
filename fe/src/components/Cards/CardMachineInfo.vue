<template>
  <div
    class="
    text-xl text-center relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg h-full items-center"
  style="height: 32vh; margin-bottom: 22px;width: 50vw;"
    >
    <div class="flex-auto">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1 flex items-start flex-col">
          <h5 class="font-semibold text-xl text-blueGray-700">
            
             장비명: {{ props.infoData.name }} 
             <br>
             <br>
             serial-No: {{props.infoData.serialNo}}  <br>
             이상률: {{ props.infoData.totalRatio }} %  <br>
             시작일: {{ props.infoData.startDate }}  <br>
             종료일:  {{ props.infoData.endDate }} 
             <br>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "machine-info",
  props: {
    infoData:{
      type: Object,
      default: () => ({
        "name": "machineName",
        "totalRatio": 10,
        "serialNo": 'L-SF-04',
        "startDate": "startDate",
        "endDate": "endDate",

      }),
    },
   

    // can be any of the text color utilities
    // from tailwindcss
  
  
  },
  setup(props) {
    console.log(props)

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

    return { props };
  },
};
</script>
