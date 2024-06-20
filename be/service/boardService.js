const path = require('path');
const logger = require('../lib/logger');
const userDao = require('../dao/userDao');
const machineDao = require('../dao/machineDao');
const sensorDao = require('../dao/sensorDao');
const codeDao = require('../dao/codeDao');
const groupMachineJoinDao = require('../dao/groupMachineJoinDao');
const { makeWav } = require('../lib/wavUtil');
const CustomError = require('../error/CustomError');

const microISOString = (timestamp) => {
  const millisecondsTime = new Date(timestamp / 1000).toISOString();
  const micro = timestamp.toString().slice(-3);

  return millisecondsTime.replace("Z", `${micro}Z`);
}

const service = {
  // 설비 하나 조회
  async monitoringMachineDataList(params) {
    let result = null;

    try {
      // 권한 체크
      const userInfo = await userDao.selectInfo({ id: params.id });
      const groupMachineInfo = await groupMachineJoinDao.selectOne({
        groupId: userInfo.Group.id,
        machineId: params.machineId,
      })
      if (!groupMachineInfo) {
        reject(new CustomError(403, 'Forbidden'));
      } else {
        // 장비 정보
        const machine = await machineDao.selectById({ id: params.machineId });
        let machineInfo = {};
        machineInfo.equipmentId = machine.id;
        machineInfo.equipmentSerialNo = machine.serialNo;
        machineInfo.equipmentName = machine.name;
        machineInfo.thresholdCount = machine.threshold;

        // 장비 데이터
        const currentCount = await sensorDao.countTodayPredict({
          serialNo: machine.serialNo,
          measurement: 'current_predictions',
        });
        machineInfo.currentCount = currentCount;

        const currentFailCount = await sensorDao.countTodayFailPredict({
          serialNo: machine.serialNo,
          measurement: 'current_predictions',
        });
        machineInfo.currentFailCount = currentFailCount;
        machineInfo.currentRatioPercent = (currentFailCount / currentCount) * 100;

        const vibrationCount = await sensorDao.countTodayPredict({
          serialNo: machine.serialNo,
          measurement: 'vibration_predictions',
        });
        machineInfo.vibrationCount = vibrationCount;

        const vibrationFailCount = await sensorDao.countTodayFailPredict({
          serialNo: machine.serialNo,
          measurement: 'vibration_predictions',
        });
        machineInfo.vibrationFailCount = vibrationFailCount;
        machineInfo.vibrationRatioPercent = (vibrationFailCount / vibrationCount) * 100;

        const currentLastPredict = await sensorDao.lastPredict({
          serialNo: machine.serialNo,
          measurement: 'current_predictions',
        })
        const currentResultInfo = await codeDao.info({ machineId: machine.id, code: currentLastPredict.code })
        console.log(`${machine.id}: `, currentResultInfo);
        if (currentResultInfo) {
          machineInfo.currentResult = currentResultInfo.name;
          machineInfo.currentTime = currentLastPredict.time;
          machineInfo.currentRms = currentLastPredict.rms;
        } else {
          machineInfo.currentResult = null;
          machineInfo.currentTime = null;
          machineInfo.currentRms = null;
        }

        const vibrationLastPredict = await sensorDao.lastPredict({
          serialNo: machine.serialNo,
          measurement: 'vibration_predictions',
        })
        const vibrationResultInfo = await codeDao.info({ machineId: machine.id, code: vibrationLastPredict.code })
        if (vibrationResultInfo) {
          machineInfo.vibrationResult = vibrationResultInfo.name;
          machineInfo.vibrationTime = vibrationLastPredict.time;
          machineInfo.vibrationRms = vibrationLastPredict.rms;
        } else {
          machineInfo.vibrationResult = null;
          machineInfo.vibrationTime = null;
          machineInfo.vibrationRms = null;
        }
        machineInfo.thresholdPercent = (Math.max(currentFailCount, vibrationFailCount) / machine.threshold) * 100;

        console.log(currentLastPredict);

        // 상세 데이터
        // 데이터 수
        const dataPerOnce = 120;
        let current = {
          data: [],
        }
        const currentStartTime = microISOString(currentLastPredict.startTime);
        for (const item of ['x', 'y', 'z']) {
          const currentData = await sensorDao.detailsData({
            serialNo: machine.serialNo,
            startTime: currentStartTime,
            endTime: currentLastPredict.time,
            field: item,
            measurement: 'currents',
          })
          console.log(currentData);
          const length = currentData.length;
          const offset = length / dataPerOnce;
          let data = [];
          for (let i = 0; i < dataPerOnce; i++) {
            const index = Math.floor(i * offset);
            data.push(currentData[index]?._value);
          }
          current.data.push(data);
        }

        let vibration = {
          data: [],
        }
        const vibrationStartTime = microISOString(vibrationLastPredict.startTime);
        const vibrationData = await sensorDao.detailsData({
          serialNo: machine.serialNo,
          startTime: vibrationStartTime,
          endTime: vibrationLastPredict.time,
          field: 'x',
          measurement: 'vibrations',
        })
        const length = vibrationData.length;
        const offset = length / dataPerOnce;
        let data = [];
        for (let i = 0; i < dataPerOnce; i++) {
          const index = Math.floor(i * offset);
          data.push(vibrationData[index]?._value);
        }
        vibration.data.push(data);

        result = {
          ...machineInfo,
          currentData: current,
          vibrationData: vibration,
        }
      }

    } catch (err) {
      logger.error(`(boardService.monitoringMachineDataList) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 조회
  async monitoringDataList(params) {
    let result = null;

    try {
      const userInfo = await userDao.selectInfo(params);
      const groupId = userInfo.Group.id;
      const machines = await machineDao.selectByGroupId({ groupId: groupId })
      const machinesWithCount = await Promise.all(
        machines.map(async (machine) => {
          let machineInfo = {};
          machineInfo.equipmentId = machine.id;
          machineInfo.equipmentSerialNo = machine.serialNo;
          machineInfo.equipmentName = machine.name;
          machineInfo.thresholdCount = machine.threshold;
          const currentCount = await sensorDao.countTodayPredict({
            serialNo: machine.serialNo,
            measurement: 'current_predictions',
          });
          machineInfo.currentCount = currentCount;

          const currentFailCount = await sensorDao.countTodayFailPredict({
            serialNo: machine.serialNo,
            measurement: 'current_predictions',
          });
          machineInfo.currentFailCount = currentFailCount;
          machineInfo.currentRatioPercent = (currentFailCount / currentCount) * 100;

          const vibrationCount = await sensorDao.countTodayPredict({
            serialNo: machine.serialNo,
            measurement: 'vibration_predictions',
          });
          machineInfo.vibrationCount = vibrationCount;

          const vibrationFailCount = await sensorDao.countTodayFailPredict({
            serialNo: machine.serialNo,
            measurement: 'vibration_predictions',
          });
          machineInfo.vibrationFailCount = vibrationFailCount;
          machineInfo.vibrationRatioPercent = (vibrationFailCount / vibrationCount) * 100;

          const currentLastPredict = await sensorDao.lastPredict({
            serialNo: machine.serialNo,
            measurement: 'current_predictions',
          })
          const currentResultInfo = await codeDao.info({ machineId: machine.id, code: currentLastPredict.code })
          console.log(`${machine.id}: `, currentResultInfo);
          if (currentResultInfo) {
            machineInfo.currentResult = currentResultInfo.name;
            machineInfo.currentTime = currentLastPredict.time;
            machineInfo.currentRms = currentLastPredict.rms;
          } else {
            machineInfo.currentResult = null;
            machineInfo.currentTime = null;
            machineInfo.currentRms = null;
          }

          const vibrationLastPredict = await sensorDao.lastPredict({
            serialNo: machine.serialNo,
            measurement: 'vibration_predictions',
          })
          const vibrationResultInfo = await codeDao.info({ machineId: machine.id, code: vibrationLastPredict.code })
          if (vibrationResultInfo) {
            machineInfo.vibrationResult = vibrationResultInfo.name;
            machineInfo.vibrationTime = vibrationLastPredict.time;
            machineInfo.vibrationRms = vibrationLastPredict.rms;
          } else {
            machineInfo.vibrationResult = null;
            machineInfo.vibrationTime = null;
            machineInfo.vibrationRms = null;
          }

          machineInfo.thresholdPercent = (Math.max(currentFailCount, vibrationFailCount) / machine.threshold) * 100;

          return machineInfo;
        })
      );
      result = machinesWithCount;
      logger.debug(`(boardService.monitoringDataList) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(boardService.monitoringDataList) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 설비 목록 조회
  async machineList(params) {
    let result = null;

    try {
      const userInfo = await userDao.selectInfo(params);
      const groupId = userInfo.Group.id;
      const machines = await machineDao.selectByGroupId({ groupId: groupId })
      const machinesResult = await Promise.all(
        machines.map(async (machine) => {
          let machineInfo = {};

          machineInfo.id = machine.id;
          machineInfo.serialNo = machine.serialNo;
          machineInfo.name = machine.name;
          machineInfo.threshold = machine.threshold;
          const codes = await codeDao.listByMachine({ machineId: machine.id })
          const codesResult = codes.map(code => { return { id: code.id, name: code.name } });
          machineInfo.defectTypes = codesResult;

          return machineInfo;
        })
      );
      result = machinesResult;
    } catch (err) {
      logger.debug(`(boardService.machineList) ${JSON.stringify(result)}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async machineStatistics(params) {
    let result = null;

    let isOneDay = false;
    let startDate = new Date(params.startDate);
    startDate.setHours(0, 0, 0, 0);
    let endDate = new Date(params.endDate);
    endDate.setHours(0, 0, 0, 0);
    if (startDate.getTime() === endDate.getTime()) {
      isOneDay = true;
      console.log('isOneDay:', isOneDay);
    }
    endDate = new Date(endDate.setDate(endDate.getDate() + 1));

    try {
      const machineInfo = await machineDao.selectById({ id: params.machineId });

      // 시간 설정
      params.startDate.setHours(0, 0, 0, 0);

      // dailyTrend
      let dailyTrend = {
        data: [],
        labels: [],
      };

      for (; params.startDate < endDate;
        isOneDay ? params.startDate.setHours(params.startDate.getHours() + 1) : params.startDate.setDate(params.startDate.getDate() + 1)) {
        if (params.startDate > new Date(Date.now())) {
          break;
        }
        const startUTC = new Date(params.startDate.getTime());
        let endUTC = new Date(startUTC)
        endUTC = isOneDay ? new Date(endUTC.setHours(endUTC.getHours() + 1)) : new Date(endUTC.setDate(endUTC.getDate() + 1));
        const currentStat = await sensorDao.countFailPredict({
          serialNo: machineInfo.serialNo,
          startDate: startUTC.toISOString(),
          endDate: endUTC.toISOString(),
          measurement: 'current_predictions',
        })
        const vibrationStat = await sensorDao.countFailPredict({
          serialNo: machineInfo.serialNo,
          startDate: startUTC.toISOString(),
          endDate: endUTC.toISOString(),
          measurement: 'vibration_predictions',
        })

        dailyTrend.data.push(currentStat + vibrationStat);
        dailyTrend.labels.push(isOneDay ? startUTC.getHours() : startUTC.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }));
      }

      // totalCount
      let totalCount = {
        data: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      }

      for (let currentDate = new Date(startDate); currentDate < endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        let currentEndDate = new Date(currentDate);
        currentEndDate.setDate(currentEndDate.getDate() + 1);
        console.log('####', currentDate.getUTCDay(), ' ~ ', currentEndDate.getUTCDay())

        const currentTotal = await sensorDao.countPredict({
          serialNo: machineInfo.serialNo,
          startDate: currentDate.toISOString(),
          endDate: currentEndDate.toISOString(),
          measurement: 'current_predictions',
          code: 0,
        })
        const vibrationTotal = await sensorDao.countPredict({
          serialNo: machineInfo.serialNo,
          startDate: currentDate.toISOString(),
          endDate: currentEndDate.toISOString(),
          measurement: 'vibration_predictions',
          code: 0,
        })

        const currentFailTotal = await sensorDao.countFailPredict({
          serialNo: machineInfo.serialNo,
          startDate: currentDate.toISOString(),
          endDate: currentEndDate.toISOString(),
          measurement: 'current_predictions',
        })
        const vibrationFailTotal = await sensorDao.countFailPredict({
          serialNo: machineInfo.serialNo,
          startDate: currentDate.toISOString(),
          endDate: currentEndDate.toISOString(),
          measurement: 'vibration_predictions',
        })

        // 한국시간 기준 요일이므로 +1일 된 요일
        let index = currentEndDate.getUTCDay() - 1;
        if (index < 0) {
          index = 6;
        }

        totalCount.data[0][index] += currentTotal + vibrationTotal;
        totalCount.data[1][index] += currentFailTotal + vibrationFailTotal;
      }

      // defectCount
      let defectCount = {
        data: [],
        labels: [],
      }

      const defectTypes = await codeDao.listByMachine({ machineId: params.machineId })

      for (const defectType of defectTypes) {
        if (defectType.code != 0) {
          const currentDefectCount = await sensorDao.countPredict({
            serialNo: machineInfo.serialNo,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            measurement: 'current_predictions',
            code: defectType.code,
          })
          const vibrationDefectCount = await sensorDao.countPredict({
            serialNo: machineInfo.serialNo,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            measurement: 'vibration_predictions',
            code: defectType.code,
          })
          defectCount.data.push(currentDefectCount + vibrationDefectCount);
          defectCount.labels.push(defectType.name);
        }
      }

      result = {
        dailyTrend: dailyTrend,
        totalCount: totalCount,
        defectCount: defectCount,
      };
    } catch (err) {
      logger.debug(`(boardService.machineStatistics) ${JSON.stringify(result)}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async machineDetails(params) {
    let result = {};

    try {
      const machineInfo = await machineDao.selectById({ id: params.machineId });

      // code 찾기
      let resultCode = -1;
      let resultCodeName = '';
      if (params.codeId != -1) {
        const codeInfo = await codeDao.infoByIdAndMachineId({ id: params.codeId, machineId: params.machineId })
        if (codeInfo) {
          resultCode = codeInfo.code;
          resultCodeName = codeInfo.name;
        }
      }

      const currentResults = await sensorDao.predictList({
        serialNo: machineInfo.serialNo,
        startDate: params.startTime,
        endDate: params.endTime,
        measurement: 'current_predictions',
      });

      const vibrationResults = await sensorDao.predictList({
        serialNo: machineInfo.serialNo,
        startDate: params.startTime,
        endDate: params.endTime,
        measurement: 'vibration_predictions',
      });

      let resultMap = {};

      const defectTypes = await codeDao.listByMachine({ machineId: params.machineId })

      let codeMap = {};

      defectTypes.forEach(({ code, name }) => {
        codeMap[code] = name;
      })

      const kstOffset = 9 * 60 * 60 * 1000;

      currentResults.forEach(({ _code, _time, _rms }) => {
        const time = new Date(new Date(_time).getTime() + kstOffset).toISOString().replace('Z', '').replace('T', ' ');
        const value = codeMap[_code];
        if (!resultMap[time]) {
          resultMap[time] = {
            currentResult: value,
            currentTime: time,
            currentRms: _rms,
            vibrationResult: "",
            vibrationTime: "",
            vibrationRms: null,
          };
        } else {
          resultMap[time].currentResult = value;
          resultMap[time].currentTime = time;
          resultMap[time].currentRms = _rms;
        }
      });

      vibrationResults.forEach(({ _code, _time, _rms }) => {
        const time = new Date(new Date(_time).getTime() + kstOffset).toISOString().replace('Z', '').replace('T', ' ');
        const value = codeMap[_code];
        if (!resultMap[time]) {
          resultMap[time] = {
            currentResult: "",
            currentTime: "",
            currentRms: null,
            vibrationResult: value,
            vibrationTime: time,
            vibrationRms: _rms
          };
        } else {
          resultMap[time].vibrationResult = value;
          resultMap[time].vibrationTime = time;
          resultMap[time].vibrationRms = _rms;
        }
      });


      let mergedResults = Object.values(resultMap);

      if (resultCode != -1) {
        mergedResults = mergedResults.filter(data =>
          data.currentResult === resultCodeName || data.vibrationResult === resultCodeName
        );
      }

      mergedResults.sort((a, b) => {
        const timeA = new Date(a.currentTime || a.vibrationTime).getTime();
        const timeB = new Date(b.currentTime || b.vibrationTime).getTime();
        return timeA - timeB;
      });

      const start = (params.page - 1) * params.limit;
      console.log(params.limit);
      const end = Number(start) + Number(params.limit);
      const paginatedResults = mergedResults.slice(start, end);

      result.data = paginatedResults;
      result.totalRow = mergedResults.length;
    } catch (err) {
      logger.debug(`(boardService.machineDetails) ${JSON.stringify(result)}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async machineDetailsData(params) {
    let result = null;
    let wavFilePath = null;

    try {
      const machineInfo = await machineDao.selectById({ id: params.machineId });

      // 데이터 수
      const dataPerOnce = 120;

      // 전류
      const currentResult = await sensorDao.nearestPredict({
        serialNo: machineInfo.serialNo,
        time: params.time,
        measurement: 'current_predictions',
      })

      let current = {
        data: [],
      }
      const currentStartTime = microISOString(currentResult._value);
      for (const item of ['x', 'y', 'z']) {
        const currentData = await sensorDao.detailsData({
          serialNo: machineInfo.serialNo,
          startTime: currentStartTime,
          endTime: currentResult._time,
          field: item,
          measurement: 'currents',
        })
        const length = currentData.length;
        const offset = length / dataPerOnce;
        let data = [];
        for (let i = 0; i < dataPerOnce; i++) {
          const index = Math.floor(i * offset);
          data.push(currentData[index]._value);
        }
        current.data.push(data);
      }

      // 진동
      const vibrationResult = await sensorDao.nearestPredict({
        serialNo: machineInfo.serialNo,
        time: params.time,
        measurement: 'vibration_predictions',
      })
      let vibration = {
        data: [],
      }
      const vibrationStartTime = microISOString(vibrationResult._value);
      const vibrationData = await sensorDao.detailsData({
        serialNo: machineInfo.serialNo,
        startTime: vibrationStartTime,
        endTime: vibrationResult._time,
        field: 'x',
        measurement: 'vibrations',
      })
      const length = vibrationData.length;
      const offset = length / dataPerOnce;
      let data = [];
      for (let i = 0; i < dataPerOnce; i++) {
        const index = Math.floor(i * offset);
        data.push(vibrationData[index]._value);
      }
      const fullData = vibrationData.map(data => data._value);
      const timestamp = Date.now();
      const wavPath = path.resolve(__dirname, '../public', 'sounds', `vibration${timestamp}.wav`);
      wavFilePath = await makeWav(fullData, wavPath);
      vibration.data.push(data);

      result = {
        current: current,
        vibration: vibration,
        filePath: wavFilePath,
      };

    } catch (err) {
      logger.debug(`(boardService.machineDetailsData) ${JSON.stringify(result)}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

};

module.exports = service;
