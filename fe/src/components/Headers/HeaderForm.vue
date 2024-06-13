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
  <div class="">
    <div class="mx-auto my-8 py-8 w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">

          <!-- New Users Card -->
          <div class="w-full xl:w-8/12">

            <!-- Search bar -->
            <form class="flex items-center lg:ml-auto mr-3 my-8 w-full" action="/search" method="get"
              @submit.prevent="handleSubmit">
              <div class="relative flex w-full items-stretch">
                <div class="flex-grow relative" style="flex-grow: 2;">
                  <select
                    class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state" name="q" v-model="selectedValue">
                    <option :value="option" v-for="(option, index) in menu" :key="index">{{ option }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <input type="text" placeholder="Search here..."
                  class="flex-grow border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                  style="flex-grow: 1;"
                  v-model="searchValue" />
                <button class="absolute right-0 top-0 mt-3 mr-4" type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </form>


          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; // Vue 3의 ref 함수 가져오기
// import { defineProps } from 'vue';
import { onMounted } from 'vue';

export default {
  components: {
    // CardStats, // CardStats 컴포넌트 등록
  },
  props: {
    menu: Array,
  },
  setup(props, { emit }) {
    const selectedValue = ref('');
    const searchValue = ref('');


    const handleSubmit = () => {
      emit('handleSearch', selectedValue.value, searchValue.value);
    }

    onMounted(() => {
      selectedValue.value = props.menu[0];
    });
    // 각 카드의 데이터를 저장하는 반응형 변수들 선언
    const totalStat = ref({

    });

    const newUsersStat = ref({

    });

    const salesStat = ref({

    });

    const performanceStat = ref({

    });

    return {
      // 템플릿에서 사용할 변수들 반환
      totalStat,
      newUsersStat,
      salesStat,
      performanceStat,
      selectedValue,
      searchValue,
      handleSubmit,
    };

  },
};
</script>
