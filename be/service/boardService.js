const logger = require('../lib/logger');
const groupDao = require('../dao/groupDao');
const userDao = require('../dao/userDao');
const machineDao = require('../dao/machineDao');
const sensorDao = require('../dao/sensorDao');

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
          const count = await sensorDao.countTodayPredict({
            serialNo: machine.serialNo,
            measurement: 'current_predictions',
          });
          machine.currentCount = count;
          // const failCount = await sensorDao.countTodayFailPredict({
          //   serialNo: machine.serialNo,
          //   measurement: 'current_predictions',
          // });
          // machine.currentFailCount = failCount;
          return machine;
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
