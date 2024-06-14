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
  <footer class="text-white	bg-color2 block py-4" style="bottom:0; width:100%;">
    <div class="container px-4">
      <!-- 푸터 상단의 가로줄 -->
      <hr class="mb-4 border-b-1 border-blueGray-200" />
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <!-- 저작권 정보 섹션 -->
        <div class="w-full md:w-4/12 px-4">
          <div class="text-sm text-white font-semibold py-1 md:text-left text-center"
          style="display: flex; align-items: center;">
            <p style="margin-right: 10px;">
              Copyright © {{ date }}
            </p>
            <a
              href="https://camp.flexing.ai/"
              class="text-white hover:text-blueGray-700 text-sm font-semibold py-1 flex items-center"
              style="display: flex; align-items: center; text-decoration: none;">
              <p style="margin-right: 10px;">
                DJ-Twin
              </p>
              <img
                alt="..."
                class="rounded-full align-middle border-none shadow-lg"
                :src="logoSrc"
                style="height: 48px; width: 48px;"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>


<script>
import { ref } from 'vue'; // Vue 3의 ref를 가져옵니다.
import logo from "@/assets/img/logo.jpg";

export default {
  setup() {
    // 현재 연도를 저장하는 반응형 변수 date를 선언합니다.
    const date = ref(new Date().getFullYear());
    const logoSrc =logo;

    // 반환된 객체 안에 date를 포함하여 템플릿에서 사용할 수 있도록 합니다.
    return {
      date,
      logoSrc
    };
  },
};
</script>
