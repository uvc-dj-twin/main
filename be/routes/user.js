const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../service/userService');
const CustomError = require('../error/CustomError');
const { isLoggedIn } = require('../lib/middleware');

// 회원 등록
router.post('/', async (req, res, next) => {
  try {
    const params = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (
      !params.email
      || !params.password
      || !params.name
      || !params.phone
    ) {
      throw new CustomError(400, 'Bad Request');
    } else {
      const result = await userService.reg(params);
      logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.sendStatus(201);
    }
  } catch (err) {
    next(err);
  }
});

// 마이페이지 정보 조회
router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    }
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    // 로그인 본인인지 확인
    if (Number(req.user.id) === Number(req.params.id)) {
      const result = await userService.info(params);
      logger.info(`(user.info.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } else {
      const err = new CustomError(403, 'Forbidden');
      logger.error(err.toString());
    }
  } catch (err) {
    next(err);
  }
});

// 마이페이지 정보 수정
router.patch('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
      password: req.body.password,
      phone: req.body.phone,
    }
    logger.info(`(user.update.params) ${JSON.stringify(params)}`);

    // 로그인 본인인지 확인
    if (Number(req.user.id) === Number(req.params.id)) {
      const result = await userService.edit(params);
      logger.info(`(user.update.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } else {
      const err = new CustomError(403, 'Forbidden');
      logger.error(err.toString());
    }
  } catch (err) {
    next(err);
  }
});

// 마이페이지 정보 수정
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    }
    logger.info(`(user.delete.params) ${JSON.stringify(params)}`);

    // 로그인 본인인지 확인
    if (Number(req.user.id) === Number(req.params.id)) {
      const result = await userService.delete(params);
      logger.info(`(user.delete.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } else {
      const err = new CustomError(403, 'Forbidden');
      logger.error(err.toString());
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
