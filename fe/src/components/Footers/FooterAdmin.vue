<!-- 변경된 부분 및 주석 설명:
템플릿 부분 (<template>):
푸터 컴포넌트:

<footer> 태그로 푸터 컴포넌트를 정의합니다.
푸터 상단의 가로줄:

<hr> 태그로 푸터 상단에 가로줄을 추가합니다.
저작권 정보 섹션:

현재 연도를 표시하는 텍스트와 "Creative Tim"에 대한 링크가 포함됩니다.
{{ date }}로 현재 연도를 표시합니다.
링크 섹션:

"Creative Tim", "About Us", "Blog", "MIT License"에 대한 링크가 포함된 목록을 만듭니다.
스크립트 부분 (<script>):
Vue 3의 Composition API 사용:

ref를 사용하여 반응형 변수인 date를 선언합니다.
현재 연도 저장:

date 변수는 현재 연도를 저장합니다.
setup 함수:

Composition API의 setup 함수 안에서 반응형 변수 date를 선언하고 반환합니다.
반환된 객체 안에 date를 포함하여 템플릿에서 사용할 수 있도록 합니다.
이 코드는 Composition API를 사용하여 현재 연도를 표시하고, 이를 푸터 템플릿에서 사용합니다. 각 섹션은 주석으로 명확히 설명되어 있습니다. -->

<template>
  <!-- 푸터 컴포넌트 -->
  <footer class="block py-4">
    <div class="container mx-auto px-4">
      <!-- 푸터 상단의 가로줄 -->
      <hr class="mb-4 border-b-1 border-blueGray-200" />
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <!-- 저작권 정보 섹션 -->
        <div class="w-full md:w-4/12 px-4">
          <div class="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
            Copyright © {{ date }}
            <a
              href="https://www.creative-tim.com?ref=vn-footer-admin"
              class="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
            >
            DJ-Twin
            </a>
          </div>
        </div>
        <!-- 링크 섹션 -->
        <!-- <div class="w-full md:w-8/12 px-4">
          <ul class="flex flex-wrap list-none md:justify-end justify-center">
            <li>
              <a
                href="https://www.creative-tim.com?ref=vn-footer-admin"
                class="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
              >
                Creative Tim
              </a>
            </li>
            <li>
              <a
                href="https://www.creative-tim.com/presentation?ref=vn-footer-admin"
                class="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="http://blog.creative-tim.com?ref=vn-footer-admin"
                class="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="https://github.com/creativetimofficial/vue-notus/blob/main/LICENSE.md?ref=vn-footer-admin"
                class="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
              >
                MIT License
              </a>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'; // Vue 3의 ref를 가져옵니다.

export default {
  setup() {
    // 현재 연도를 저장하는 반응형 변수 date를 선언합니다.
    const date = ref(new Date().getFullYear());

    // 반환된 객체 안에 date를 포함하여 템플릿에서 사용할 수 있도록 합니다.
    return {
      date,
    };
  },
};
</script>
