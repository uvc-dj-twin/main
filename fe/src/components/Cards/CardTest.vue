<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <!-- Stat Subtitle: 이 카드의 부제목, 예를 들어 "Traffic" -->
          <h5 class="text-blueGray-400 uppercase font-bold text-xs">
            {{ statSubtitle }} <!-- 이 카드의 부제목 -->
            <!-- text-blueGray-400: 텍스트가 파란색 격자 pattern color -->
            <!-- uppercase: 텍스트가 대문자 -->
            <!-- font-bold: 텍스트가 두껍게-rendered -->
            <!-- text-xs: 텍스트의 font-size가 작음 -->
          </h5>
          <!-- Stat Title: 이 카드의 제목, 예를 들어 "350,897" -->
          <span class="font-semibold text-xl text-blueGray-700">
            {{ statTitle }} <!-- 이 카드의 제목 -->
            <!-- font-semibold: 텍스트가 두껍게-rendered with a normal weight -->
            <!-- text-xl: 텍스트의 font-size가 큼 -->
            <!-- text-blueGray-700: 텍스트가 파란색 격자 pattern color -->
          </span>
        </div>
        <div class="relative w-auto pl-4 flex-initial">
          <!-- Stat Icon Color: 이 카드의 아이콘의 배경 색상을 정의, 예를 들어 "bg-red-500" -->
            <!-- 이 카드의 아이콘의 배경 색상을 정의 -->
            <!-- bg-red-500: 배경이 빨간색 -->
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
            :class="[statIconColor]" 
          
          >
            <!-- Stat Icon Name: 이 카드의 아이콘을 정의하는 class name, 예를 들어 "far fa-chart-bar" -->
            <i :class="[statIconName]"></i>
            <!-- far fa-chart-bar: 아이콘으로 chart-bar를 사용 -->
          </div>
        </div>
      </div>
      <p class="text-sm text-blueGray-400 mt-4">
        <!-- Stat Percent: 이 카드의 퍼센테이지, 예를 들어 "3.48%" -->
        <span class="mr-2" :class="[statPercentColor]">
          <!-- Stat Arrow: 이 카드의 퍼센테이지 방향을 정의, 예를 들어 "up" or "down" -->
          <i
            :class="[
              statArrow === 'up' ? `fas fa-arrow-up` : `fas fa-arrow-down`,
            ]"
          ></i>
          {{ statPercent }}% <!-- 이 카드의 퍼센테이지 -->
          <!-- text-sm: 텍스트의 font-size가 작음 -->
          <!-- text-blueGray-400: 텍스트가 파란색 격자 pattern color -->
        </span>
        <!-- Stat Descripiron: 이 카드의 설명, 예를 들어 "Since last month" -->
        <span class="whitespace-nowrap">{{ statDescripiron }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "card-stats",
  props: {
    statSubtitle: {
      type: String,
      default: "Traffic",
      // 카드의 부제목, 예를 들어 "Traffic"
    },
    statTitle: {
      type: String,
      default: "350,897",
      // 카드의 제목, 예를 들어 "350,897"
    },
    statArrow: {
      default: "up",
      validator: function (value) {
        // The value must match one of these strings
        return ["up", "down"].indexOf(value) !== -1;
      },
      // 이 카드의 퍼센테이지 방향을 정의, 예를 들어 "up" or "down"
    },
    statPercent: {
      type: String,
      default: "3.48",
      // 이 카드의 퍼센테이지, 예를 들어 "3.48%"
    },
    // can be any of the text color utilities
    // from tailwindcss
    statPercentColor: {
      type: String,
      default: "text-emerald-500",
      // 이 카드의 퍼센테이지 색상을 정의, 예를 들어 "text-emerald-500"
    },
    statDescripiron: {
      type: String,
      default: "Since last month",
      // 이 카드의 설명, 예를 들어 "Since last month"
    },
    statIconName: {
      type: String,
      default: "far fa-chart-bar",
      // 이 카드의 아이콘을 정의하는 class name, 예를 들어 "far fa-chart-bar"
    },
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: {
      type: String,
      default: "bg-red-500",
      // 이 카드의 아이콘의 배경 색상을 정의, 예를 들어 "bg-red-500"
    },
  },
};
</script>



