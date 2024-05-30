const logger = require('../lib/logger');
const userDao = require('../dao/userDao');
const hashUtil = require('../lib/hashUtil');

const service = {
  // user 입력
  async reg(params) {
    let inserted = null;
    let hashPassword = null;
    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
      logger.debug(
        `userService.reg - hashPassword: ${JSON.stringify(params.password)}`,
      );
    } catch (err) {
      logger.error(`(userService.reg) - hashPassword: ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    const newParams = {
      ...params,
      password: hashPassword,
    };
    try {
      inserted = await userDao.insert(newParams);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(userService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  
};

module.exports = service;
