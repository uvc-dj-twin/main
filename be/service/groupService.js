const logger = require('../lib/logger');
const groupDao = require('../dao/groupDao');

const service = {
  // 조회
  async selectBySerialNo(params) {
    let result = null;

    try {
      result = await groupDao.selectBySerialNo(params);
      logger.debug(`(groupService.selectBySerialNo) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(groupService.selectBySerialNo) ${err.toString()}`);
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
