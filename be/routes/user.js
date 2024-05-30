const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../service/userService');
const CustomError = require('../error/CustomError');

// 등록
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
      // 비즈니스 로직 호출
      const result = await userService.reg(params);
      logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.sendStatus(201);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
