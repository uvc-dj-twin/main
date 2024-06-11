const logger = require('../lib/logger');
const groupDao = require('../dao/groupDao');
const userDao = require('../dao/userDao');

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

  async userList(params) {
    let result = null;

    try {
      const users = await userDao.selectByEmailAndGroupNameLike(params);
      result = users;
      const groups = await groupDao.list();
      result.groups = groups;
      logger.debug(`(groupService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(groupService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  }

};

module.exports = service;
