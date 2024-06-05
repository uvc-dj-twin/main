<!-- 변경된 부분 및 주석 설명:
템플릿 부분 (<template>):
카드 컴포넌트:
각 카드(card-stats)에 데이터 바인딩을 위해 : 기호를 사용하여 props를 전달합니다.
예를 들어 totalStat의 데이터를 card-stats에 전달합니다.
스크립트 부분 (<script>):
Vue 3의 Composition API 사용:

ref를 사용하여 반응형 변수 선언.
각 카드의 데이터 저장:

totalStat, newUsersStat, salesStat, performanceStat 변수들은 각 카드에 표시될 데이터를 저장합니다.
이 데이터들은 객체 형태로 선언되며, 각각의 필드에 필요한 값을 설정합니다.
setup 함수:

Composition API의 setup 함수 안에서 반응형 변수들을 선언하고 반환합니다.
이 코드는 Composition API를 사용하여 각 카드의 데이터를 반응형 변수로 관리하고, 이를 카드 컴포넌트에 전달하여 동적으로 표시합니다. 각 변수와 로직은 주석으로 명확히 설명되어 있습니다.
 -->

<template>
  <!-- Header -->
  <div class="relative md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
        
          <!-- New Users Card -->
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              :statSubtitle="totalStat.statSubtitle"
              :statTitle1="totalStat.statTitle1"
              :statTitle2="totalStat.statTitle2"
              :statTitle3="totalStat.statTitle3"
              
              
              :statDescripiron="totalStat.statDescripiron1"
              :statDescripiron2="totalStat.statDescripiron2"

              :statDescripiron3="totalStat.statDescripiron3"

              :statIconName="totalStat.statIconName"
              :statIconColor="totalStat.statIconColor"
            />
          </div>
           <!-- Traffic Card -->
           <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              :statSubtitle="newUsersStat.statSubtitle"
              :statTitle1="newUsersStat.statTitle1"
              :statTitle2="newUsersStat.statTitle2"
              :statTitle3="newUsersStat.statTitle3"
              :statArrow="newUsersStat.statArrow"
              :statPercent="newUsersStat.statPercent"
              :statIconName="newUsersStat.statIconName"
              :statIconColor="newUsersStat.statIconColor"
            />
          </div>
    
        </div>
      </div>
    </div>
    <button @click="editCount">버튼</button>
  </div>
</template>

<script>
import { ref } from 'vue'; // Vue 3의 ref 함수 가져오기
import CardStats from "@/components/Cards/CardStats.vue"; // CardStats 컴포넌트 가져오기

export default {
  components: {
    CardStats, // CardStats 컴포넌트 등록
  },
  props: {
    dailyCount: Object,
    dailyState: Object,

  },
  setup(props) {
  
    console.log(props)
    console.log(props)

    const editCount = () => {
      totalStat.value.statTitle1="999"
      totalStat.value.statTitle2="999"
      totalStat.value.statTitle3="999"
    }

    const totalStat = ref({
      statSubtitle: "금일 검사 현황11",
      statTitle1: props.dailyCount.totalCount,
      statTitle2: props.dailyCount.passCount,
      statTitle3: props.dailyCount.failCount,
      
      statDescripiron1: "금일 총 검사",
      statDescripiron2: "금일 정상판정",
      statDescripiron3: "금일 이상판정",
      
      statIconName: "far fa-chart-bar",
      statIconColor: "bg-red-500"
    });

    const newUsersStat = ref({
      statSubtitle: "금일 장비 현황",
      statTitle1: props.dailyState.totalCount,
      statTitle2: props.dailyState.passCount,
      statTitle3: props.dailyState.failCount,
      
      statIconName: "fas fa-chart-pie",
      statIconColor: "bg-orange-500"
    });

    const salesStat = ref({
      statSubtitle: "SALES",
      statTitle: "924",
      statArrow: "down",
      statPercent: "1.10",
      statPercentColor: "text-orange-500",
      statDescripiron: "Since yesterday",
      statIconName: "fas fa-users",
      statIconColor: "bg-pink-500"
    });

    const performanceStat = ref({
      statSubtitle: "PERFORMANCE",
      statTitle: "49,65%",
      statArrow: "up",
      statPercent: "12",
      statPercentColor: "text-emerald-500",
      statDescripiron: "Since last month",
      statIconName: "fas fa-percent",
      statIconColor: "bg-emerald-500"
    });

    return {
      totalStat,
      newUsersStat,
      salesStat,
      performanceStat,
      editCount,
    };
  },
};
</script>
