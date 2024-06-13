<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div  class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            장비 테이블 
          </h3>
        </div>
      </div>
    </div>
    <div v-if="true" class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            
         
            <th v-for="(column ,index) in props.columnList" :key="index"
              class="px-6 align-middle border border-solid py-3 text-3xl  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              {{ column }}
            </th>
          
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in props.rowList" :key="index">
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl  whitespace-nowrap p-4"
            >   {{ 
          row.currentResult

        }}
              <i :class="[row.vibrationResult === '정상' ? 'text-emerald-500' : 'text-orange-500']" class="fas fa-circle mr-2"> </i> 
            </td>
          
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl  whitespace-nowrap p-4"
            >
          {{ 
          row.currentTime

        

          }}
            </td>
          
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl  whitespace-nowrap p-4"
            >
              <i :class="[row.vibrationResult === '정상' ? 'text-emerald-500' : 'text-orange-500']" class="fas fa-circle 500 mr-2"></i> {{ row.vibrationResult }}
            

            </td>
          
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl  whitespace-nowrap p-4"
            >{{ row.vibrationTime }} 
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-3xl  whitespace-nowrap p-4 text-left"
              style="text-align: left;"
            >
            <ModalGraph :data="{id:props.id ,date:row.vibrationTime}"/> 
                        </td>
          </tr>
        </tbody>

        
    
      </table>
    </div>
    <div v-else class="h-600-px w-screen flex items-center justify-center text-3xl font-bold text-center">
      조회를 진행해주세요</div>
  </div>
</template>
<script>
import { ref } from "vue";
import ModalGraph from "@/components/modals/ModalGraph.vue"
// import axios from "axios";
// import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";
const columns=ref([]);
const targetGraph =ref();

// const currentGraphData=ref();
// const vibrationGraphData=ref()


export default {
  components: {
    ModalGraph
  },
  setup(props) {
    return {
      columns,props,targetGraph
    };
  },
  
  props: {
    id:{
      type:Number,
      default: 1
    },
    columnList:{
      type:Array,
    },
    rowList:{
      type:Array,
      default () {
        [	{
        "currentResult": "정상",
        "currentTime": "2024-06-07T02:27:21Z",
        "vibrationResult": "정상",
        "vibrationTime": "2024-06-07T02:27:26Z",
    },]
      }
    },
   
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
};
</script>
