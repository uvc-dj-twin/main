<template>
  <div
    class="border-style text-xl text-center relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg h-full items-center"
    style="
    width:-webkit-fill-available;
    border-radius: 10%;
    border: 1px solid;
    "
    >
    <div class="flex-auto">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="font-bold text-6xl text-blueGray-700">
            {{ title }}
          </h5>
            <br>
          <span class="text-5xl font-semibold text-blueGray-700">
            {{ content1? content1 : "" }} 1
          </span>
          <br>
          <span class="text-5xl font-semibold text-blueGray-700">
            {{ content2? content1 : "" }} 2
          </span>
          <br>

          <span class="text-5xl font-semibold text-blueGray-700">
            {{ content3? content1 : "" }} 3
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
  name: "card-stats2",
  props: {
    title: {
      type: String,
      default: "제목",
    },
    content1: {
      type: String,
      default: "",
    },
    content2: {
      type: String,
      default: "",
    },
    content3: {
      type: String,
      default: "",
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
