const logger = require('../lib/logger');
const userDao = require('../dao/userDao');
const hashUtil = require('../lib/hashUtil');
const CustomError = require('../error/CustomError');
const tokenUtil = require('../lib/tokenUtil');

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
        reject(new CustomError(400, 'Bad Request'));
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },

  // 조회
  async info(params) {
    let result = null;

    try {
      result = await userDao.selectInfo(params);
      logger.debug(`(userService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 수정
  async edit(params) {
    let result = null;

    if (params.password) {
      params.password = await hashUtil.makePasswordHash(params.password);
      logger.debug(
        `userService.edit - hashPassword: ${JSON.stringify(params.password)}`,
      );
    }

    try {
      result = await userDao.update(params);
      logger.debug(`(userService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 삭제
  async delete(params) {
    let result = null;

    try {
      result = await userDao.delete(params);
      logger.debug(`(userService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async login(params) {
    let selected = null;
    let token = null;

    // 사용자 조회
    try {
      selected = await userDao.selectUser(params);

      if (!selected) {
        throw new CustomError('401', '일치하는 유저 정보가 없습니다')
      }
    } catch (err) {
      logger.error(`(userService.login): ${err.message}`)
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // params.password와 조회된 password랑 비교
    try {
      const checkPassword = await hashUtil.checkPasswordHash(
        params.password,
        selected.password,
      );
      // 패스워드 불일치시 에러
      if (!checkPassword) {
        const err = new Error(
          'userService.login, 패스워드가 일치하지 않습니다.',
        );
        throw err;
      }
    } catch (err) {
      logger.error(`(userService.login): ${err.message}`)
      return new Promise((resolve, reject) => {
        reject(new CustomError('401', '일치하는 유저 정보가 없습니다'))
      })
    }

    // 토큰발급
    try {
      token = await tokenUtil.makeToken({
        id: selected.id,
        name: selected.name,
        role: selected.role,
      });
      if (!token) {
        const err = new Error('userService.login, 토큰 발급 실패.');
        throw err;
      }
    } catch (err) {
      logger.error(`(userService.login): ${err.message}`)
      return new Promise((resolve, reject) => {
        reject(new CustomError('401', '일치하는 유저 정보가 없습니다'))
      })
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve({
        token: token,
        id: selected.id,
        name: selected.name,
      });
    });
  },

  async editGroup(params) {
    let result = null;

    try {
      for (const user of params.users) {
        await userDao.update({ id: user.id, groupId: user.groupId });
      }
      logger.debug(`(userService.editGroup) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.editGroup) ${err.toString()}`);
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
