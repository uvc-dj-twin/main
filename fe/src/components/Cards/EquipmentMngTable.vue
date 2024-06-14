<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    
  >
    <div  class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
          
          >
            장비 테이블 
          </h3>
        </div>
      </div>
    </div>
    <div v-if="true" class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="w-full max-w-full items-center margin-left-auto bg-transparent border-collapse"
      >
        <thead>
          <tr>
            
         
            <th v-for="(column ,index) in props.columnList" :key="index"
            class="text-3xl align-middle border border-solid py-3 text-l uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-middle"

           
            >
              {{ column }}
            </th>
          
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in props.rowList" :key="index">
            <td
            class="text-xl border-t-0  align-middle border-l-0 border-r-0 whitespace-nowrap p-4"

            >   {{ 
          row.currentResult

        }}
              <i class="fas fa-circle text-orange-500 mr-2"></i> 
            </td>
          
            <td
            class="text-xl border-t-0  align-middle border-l-0 border-r-0 whitespace-nowrap p-4"

            >
          {{ 
          row.currentTime

          }}
            </td>
          
            <td
            class="text-xl border-t-0  align-middle border-l-0 border-r-0 whitespace-nowrap p-4"

            >
              <i class="fas fa-circle text-orange-500 mr-2"></i> {{ row.vibrationResult }}
            >

            </td>
          
            <td
            class="text-xl border-t-0  align-middle border-l-0 border-r-0 whitespace-nowrap p-4"

            >{{ row.vibrationTime }} 
            </td>
            <td
            class="text-xl border-t-0  align-middle border-l-0 border-r-0 whitespace-nowrap p-4"

              style="text-align: left;"
            >
            <ModalGraph/>
                        </td>
          </tr>
        </tbody>

        
    
      </table>
    </div>
    <div v-else class="h-600-px w-screen flex items-center justify-center text-5xl font-bold text-center">
      조회를 진행해주세요</div>
  </div>
</template>
<script>
import { ref } from "vue";
import ModalGraph from "@/components/modals/ModalGraph.vue"
// import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";
const columns=ref([]);

export default {
  components: {
    ModalGraph
  },
  setup(props) {
    return {
      columns,props
      
    };
  },
  
  props: {
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
