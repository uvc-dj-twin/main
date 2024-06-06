const logger = require('../lib/logger');
const groupDao = require('../dao/groupDao');
const userDao = require('../dao/userDao');
const machineDao = require('../dao/machineDao');
const sensorDao = require('../dao/sensorDao');
const codeDao = require('../dao/codeDao');

const service = {
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
          const currentResultInfo = await codeDao.info({machineId: machine.id, code: currentLastPredict.code})
          machineInfo.currentResult = currentResultInfo.name;
          machineInfo.currentTime = currentLastPredict.time;

          const vibrationLastPredict = await sensorDao.lastPredict({
            serialNo: machine.serialNo,
            measurement: 'vibration_predictions',
          })
          const vibrationResultInfo = await codeDao.info({machineId: machine.id, code: vibrationLastPredict.code})
          machineInfo.vibrationResult = vibrationResultInfo.name;
          machineInfo.vibrationTime = vibrationLastPredict.time;

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

};

module.exports = service;
