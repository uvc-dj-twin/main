<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            Social traffic
          </h3>
        </div>
        <div
          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
          <button
            class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            See all
          </button>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead class="thead-light">
          <tr>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Referral
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Visitors
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(traffic, index) in socialTraffic" :key="index">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
              {{ traffic.referral }}
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ traffic.visitors }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                <span class="mr-2">{{ traffic.percent }}</span>
                <div class="relative w-full">
                  <div
                    class="overflow-hidden h-2 text-xs flex rounded"
                    :class="traffic.barBgColor"
                  >
                    <div
                      :style="{ width: traffic.percent }"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      :class="traffic.barColor"
                    ></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const socialTraffic = ref([
      { referral: 'Facebook', visitors: '1,480', percent: '60%', barBgColor: 'bg-red-200', barColor: 'bg-red-500' },
      { referral: 'Facebook', visitors: '5,480', percent: '70%', barBgColor: 'bg-emerald-200', barColor: 'bg-emerald-500' },
      { referral: 'Google', visitors: '4,807', percent: '80%', barBgColor: 'bg-purple-200', barColor: 'bg-purple-500' },
      { referral: 'Instagram', visitors: '3,678', percent: '75%', barBgColor: 'bg-lightBlue-200', barColor: 'bg-lightBlue-500' },
      { referral: 'Twitter', visitors: '2,645', percent: '30%', barBgColor: 'bg-orange-200', barColor: 'bg-emerald-500' },
    ]);

    return {
      socialTraffic
    };
  },
};
</script>
