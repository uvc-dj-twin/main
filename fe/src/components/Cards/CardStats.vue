<template>
  <div
    class="text-xl text-center relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg h-full items-center"
  >
    <div class="flex-auto w-full h-full">
      <div class="flex flex-wrap h-full">
        <div class="w-full text-3xl max-w-full h-full flex-col flex items-center">
          <div class="w-full flex flex-column justify-around flex-grow">
            <h5 class="font-semibold text-blueGray-700">
              {{ statSubtitle }}
            </h5>
          </div>
          <div class="w-full flex flex-column justify-around flex-grow" 
          style="white-space:pre">
            <span class="font-semibold text-blueGray-700">
              {{ statDescripiron1 }}
            </span>
            <span class="font-semibold text-blueGray-700">
              {{ statTitle1 }}
            </span>
          </div>


          <div class="w-full flex flex-column justify-around flex-grow">
            <span class="font-semibold  text-blueGray-700">
              {{ statDescripiron2 }}
            </span>
            <span class="font-semibold  text-blueGray-700">
              {{ statTitle2 }}
            </span>
          </div>
    
          <div class="w-full flex flex-column justify-around flex-grow"
          :class="[
                    'bg-' + (warningEquipmentArray?.length > 0 ? 'red-500' : 'white'),
                    'text-' + (warningEquipmentArray?.length > 0 ? 'white' : 'text-blueGray-700')
                    ]"
          @mouseover="hovered=true" @mouseleave="hovered=false"  
          >
            <span class="font-semibold">
              {{ statDescripiron3 }}
            </span>
            <span class="font-semibold">
              {{ statTitle3 }}
              </span>
          </div>
        </div>
        <p v-show="hovered==true && warningEquipmentArray.length > 0"
          class="text-xl">
            이상 장비 : {{ warningEquipmentArray?.join(' ') }}
          </p>
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

import { onMounted,ref } from 'vue';
export default {
  name: "card-stats",
  props: {
    warningEquipmentArray: {
      type: Array,
      // default: () => [],
    },
    statSubtitle: {
      type: String,
      default: "총     수",
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
      default: "총    수",
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
  setup(props) {
    const hovered =ref(false);

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

    onMounted(() => {
      console.log(props.warningEquipmentArray)
    });

    return { props, hovered };
  },
};
</script>
