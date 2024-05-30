const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../service/userService');

router.post("/sign-in", async (req, res, next) => {
  try {
    const params = {
      email: req.body.email,
      password: req.body.password,
    };
    logger.info(`(user.login.params) ${JSON.stringify(params)}`);
    const result = await userService.login(params);
    logger.info(`(user.login.params) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (error) {
    next(err);
  }
})

module.exports = router;