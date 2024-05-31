<!-- 
변경된 부분 및 주석 설명:
템플릿 부분 (<template>):
푸터 컴포넌트:

<footer> 태그로 푸터 컴포넌트를 정의합니다.
:class 바인딩을 사용하여 absolute 속성에 따라 클래스가 동적으로 변경됩니다.
푸터 상단의 가로줄:

<hr> 태그로 푸터 상단에 가로줄을 추가합니다.
저작권 정보 섹션:

현재 연도를 표시하는 텍스트와 "Creative Tim"에 대한 링크가 포함됩니다.
{{ date }}로 현재 연도를 표시합니다.
링크 섹션:

"Creative Tim", "About Us", "Blog", "MIT License"에 대한 링크가 포함된 목록을 만듭니다.
스크립트 부분 (<script>):
Vue 3의 Composition API 사용:

ref와 computed를 사용하여 반응형 변수를 선언합니다.
현재 연도 저장:

date 변수는 현재 연도를 저장합니다.
동적 클래스 계산:

footerClass는 props.absolute 값에 따라 푸터의 클래스를 동적으로 계산합니다.
setup 함수:

Composition API의 setup 함수 안에서 반응형 변수 date와 footerClass를 선언하고 반환합니다.
반환된 객체 안에 date와 footerClass를 포함하여 템플릿에서 사용할 수 있도록 합니다. -->




<template>
  <!-- 푸터 컴포넌트, absolute 속성에 따라 위치와 스타일이 동적으로 변경 -->
  <footer
    class="pb-6"
    :class="[
      absolute ? 'absolute w-full bottom-0 bg-blueGray-800' : 'relative',
    ]"
  >
    <div class="container mx-auto px-4">
      <!-- 푸터 상단의 가로줄 -->
      <hr class="mb-6 border-b-1 border-blueGray-600" />
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <!-- 저작권 정보 섹션 -->
        <div class="w-full md:w-4/12 px-4">
          <div class="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
            Copyright © {{ date }}
            <a
              href="https://www.creative-tim.com?ref=vn-footer-small"
              class="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
            >
              Creative Tim
            </a>
          </div>
        </div>
        <!-- 링크 섹션 -->
        <div class="w-full md:w-8/12 px-4">
          <ul class="flex flex-wrap list-none md:justify-end justify-center">
            <li>
              <a
                href="https://www.creative-tim.com?ref=vn-footer-small"
                class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
              >
                Creative Tim
              </a>
            </li>
            <li>
              <a
                href="https://www.creative-tim.com/presentation?ref=vn-footer-small"
                class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="http://blog.creative-tim.com?ref=vn-footer-small"
                class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="https://github.com/creativetimofficial/vue-notus/blob/main/LICENSE.md?ref=vn-footer-small"
                class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
              >
                MIT License
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, computed } from 'vue'; // Vue 3의 ref와 computed를 가져옵니다.

export default {
  props: {
    // absolute 속성을 정의합니다. Boolean 타입이며 기본값은 false입니다.
    absolute: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // 현재 연도를 저장하는 반응형 변수 date를 선언합니다.
    const date = ref(new Date().getFullYear());

    // absolute 속성에 따라 동적으로 클래스 이름을 설정하는 반응형 변수 footerClass를 선언합니다.
    const footerClass = computed(() => 
      props.absolute ? 'absolute w-full bottom-0 bg-blueGray-800' : 'relative'
    );

    // 반환된 객체 안에 date와 footerClass를 포함하여 템플릿에서 사용할 수 있도록 합니다.
    return {
      date,
      footerClass,
    };
  },
};
</script>
