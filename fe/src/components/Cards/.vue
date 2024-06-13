<template>
  <div
    class="text-xl text-center relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="font-semibold text-xl text-blueGray-700">
            {{ statSubtitle }}
          </h5>
            <br>
          <span class="font-semibold text-blueGray-700">
            {{ statDescripiron1 }}
          </span>
          <br>
          <span class="font-semibold text-blueGray-700">
            {{ statTitle1 }}
          </span>
          <br>



          <span class="font-semibold  text-blueGray-700">
            {{ statDescripiron2 }}
          </span>
          <br>
          <span class="font-semibold  text-blueGray-700">
            {{ statTitle2 }}
          </span>
    
          <br>
          <span class="font-semibold  text-blueGray-700">
            {{ statDescripiron3 }}
          </span>
          <br>
          <span class="font-semibold text-blueGray-700">
            {{ statTitle3 }}
          </span>
         
          
          
        </div>
        <div class="text-3xl relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
            :class="[statIconColor]"
          >
            <i :class="[statIconName]"></i>
          </div>
        </div>
      </div>
     
  
    </div>
  </div>
</template>

<script>
export default {
  name: "card-stats",
  props: {
    statSubtitle: {
      type: String,
      default: "총 수",
    },
    statTitle1: {
      type: String,
      default: "111",
    },
    statTitle2: {
      type: String,
      default: "222",
    },
    statTitle3: {
      type: String,
      default: "333",
    },

    // can be any of the text color utilities
    // from tailwindcss
  
    statDescripiron1: {
      type: String,
      default: "총 수",
    },
    statDescripiron2: {
      type: String,
      default: "정상 수",
    },
    statDescripiron3: {
      type: String,
      default: "이상 수",
    },
    statIconName: {
      type: String,
      default: "far fa-chart-bar",
    },
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: {
      type: String,
      default: "bg-red-500",
    },
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
