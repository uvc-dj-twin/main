const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../service/userService');
const CustomError = require('../error/CustomError');
const tokenUtil = require('../lib/tokenUtil');

router.post("/sign-in", async (req, res, next) => {
  try {
    const params = {
      email: req.body.email,
      password: req.body.password,
    };
    logger.info(`(user.login.params) ${JSON.stringify(params)}`);
    const {refreshToken, ...result} = await userService.login(params);
    logger.info(`(user.login.params) ${JSON.stringify(result)}`);

    res.cookie('refreshToken', refreshToken, { httpOnly: true })
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
})

router.post("/token", async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) {
      throw new CustomError(401, 'Unauthorized')
    } else {
      const decoded = tokenUtil.verifyRefreshToken(refreshToken);
      const accessToken = tokenUtil.makeToken(decoded);
      res.status(200).json({token: accessToken});
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;