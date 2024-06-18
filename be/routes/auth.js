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

const parseCookies = (cookieHeader) => {
  // 쿠키 문자열이 없으면 빈 객체 반환
  if (!cookieHeader) {
    return {};
  }

  // 쿠키 문자열을 세미콜론으로 분리하고 각 부분을 처리
  return cookieHeader.split(';').reduce((cookies, cookie) => {
    // 각 쿠키 부분의 공백을 제거하고 '='로 분리
    const [name, ...rest] = cookie.trim().split('=');
    const value = rest.join('=');

    // 쿠키 이름과 값을 객체에 저장
    cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {});
}

router.post("/token", async (req, res, next) => {
  console.log('tokennnnnnn');
  try {
    const cookies = parseCookies(req.headers.cookie);
    const refreshToken = cookies.refreshToken;
    console.log(refreshToken);
    if (refreshToken == null) {
      throw new CustomError(401, 'Unauthorized')
    } else {
      const decoded = tokenUtil.verifyRefreshToken(refreshToken);
      console.log(decoded);
      const accessToken = tokenUtil.makeToken({
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
      });
      res.status(200).json({token: accessToken});
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;