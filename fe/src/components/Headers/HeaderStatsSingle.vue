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
이 코드는 Composition API를 사용하여 각 카드의 데이터를 반응형 변수로 관리하고,
  이를 카드 컴포넌트에 전달하여 동적으로 표시합니다. 각 변수와 로직은 주석으로 명확히 설명되어 있습니다.


 props전달방법:props 정의(기본값 권장) 및 setup(props) 후 return props처리 후 template에서 변수명=props.정의명.속성
 props: {
   
 }
 -->

<template>
  <!-- Header -->
  <div class="relative">
    <div class="py-8 mx-auto w-full border-b-2 border-solid"
    style="height:400px">
     
          <div class="flex flex-wrap justify-between w-full xl:w-3/12 items-center"
          style="display: flex; height: 350px;flex-direction: column-reverse;">


          <CardStatsSingle1 title="검사 수" :data="totalStat"/>
          <CardStatsSingle title="Threshold"/>
          <CardStatsSingle title="작업시작시간"/>
          <CardStatsSingle title="작업신호" />
        </div>
        </div>
    </div>
 
</template>

<script>
import { ref } from 'vue';
import CardStatsSingle1 from '@/components/Cards/CardStatsSingle1.vue';
import CardStatsSingle from '@/components/Cards/CardStatsSingle.vue';

export default {
  components: {
  
    CardStatsSingle1,
    CardStatsSingle
  },
  props: {
    dailyCount: {
      type: Object,
      default: () => ({ totalCount: 0, passCount: 0, failCount: 0 }),
    },
    testChartData: {
      type: Object,
      required: true,
    },
    machineChartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const totalStat = ref({
      statSubtitle: "금일 검사 현황",
      content1: props.dailyCount.totalCount,
      content2: props.dailyCount.passCount,
      content3: props.dailyCount.failCount,
      // statDescripiron1: "금일 총 검사",
      // statDescripiron2: "금일 정상판정",
      // statDescripiron3: "금일 이상판정",
      // statIconName: "far fa-chart-bar",
      // statIconColor: "bg-red-500",
    });

    return {
      totalStat,
      props,
    };
  },
};
</script>

