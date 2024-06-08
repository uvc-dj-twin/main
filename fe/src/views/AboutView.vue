<script>
import axios from 'axios'
import { inject, onMounted, ref, setup } from 'vue'

const dailyCount = ref()
const dailyState = ref()
const realtimeResult = ref([])

const setDailyInfo = () => {
  let totalCount = 0
  let failCount = 0

  realtimeResult.value.forEach((equipment) => {
    totalCount += equipment.currentCount + equipment.vibrationCount
    failCount += equipment.currentFailCount + equipment.vibrationFailCount
  })

  const totalEquipments = realtimeResult.value.length
  const equipmentsWithFailures = realtimeResult.value.filter(
    (equipment) =>
      equipment.currentFailCount + equipment.vibrationFailCount >= equipment.thresholdCount
  ).length

  dailyCount.value = {
    totalCount: totalCount,
    passCount: totalCount - failCount,
    failCount: failCount
  }
  dailyState.value = {
    totalCount: totalEquipments,
    passCount: totalEquipments - equipmentsWithFailures,
    failCount: equipmentsWithFailures
  }
}

const changeData = (data) => {
  const index = realtimeResult.value.findIndex((item) => item.equipmentId === data.equipmentId)
  // 해당 객체가 존재하는 경우 업데이트
  if (index !== -1) {
    const newData = {
      ...realtimeResult.value[index]
    }
    newData.equipmentName = data.equipmentName
    newData.equipmentSerialNo = data.equipmentSerialNo
    newData.thresholdCount = data.thresholdCount
    const type = data.type === 'currents' ? 'current' : 'vibration'
    newData[`${type}Count`] = data.count
    newData[`${type}FailCount`] = data.failCount
    newData[`${type}Result`] = data.result
    newData[`${type}Time`] = new Date(data.time / 1000)
    newData[`${type}RatioPercent`] = data.ratioPercent
    newData.thresholdPercent =
      (Math.max(newData.currentFailCount, newData.vibrationFailCount) / newData.thresholdCount) *
      100
    realtimeResult.value[index] = newData
    setDailyInfo()
    console.log('Updated realtimeResult:', realtimeResult.value[index])
  } else {
    console.log(`Equipment with ID ${data.equipmentId} not found.`)
  }
}

export default {
  setup() {
    onMounted(() => {
      const socket = inject('socket')
      axios
        .get('http://192.168.0.64:3000/board/monitoring-data', {
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOm51bGwsImlhdCI6MTcxNzU0NzIxNSwiZXhwIjoxNzQ2MzQ3MjE1fQ.WGAr3joPF9jBCuHFG3OqfXRnZe5wIjw4smLU4e6TSdQ'
          }
        })
        .then((response) => {
          // 요청이 성공하면 실행되는 코드
          console.log('Response:', response.data)
          realtimeResult.value = response.data
          setDailyInfo()

          // console.log(socket)
          socket.on('currents', (data) => {
            changeData(data)
          })
          socket.on('vibrations', (data) => {
            changeData(data)
          })
        })
        .catch((error) => {
          // 요청이 실패하면 실행되는 코드
          console.error('Error:', error)
        })
    })
  }
}

// console.log(currents.value)
</script>


