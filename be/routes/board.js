const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const boardService = require('../service/boardService');
const { isLoggedIn } = require('../lib/middleware');

router.get('/monitoring-data', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
    };
    logger.info(`(board.info.params) ${JSON.stringify(params)}`);
    const result = await boardService.monitoringDataList(params);
    logger.info(`(board.info.result) ${JSON.stringify(result)}`);

    res.status(200).json(result).send();
  } catch (err) {
    next(err);
  }
})

router.get('/machines', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
    };
    logger.info(`(board.machines.params) ${JSON.stringify(params)}`);
    const result = await boardService.machineList(params);
    logger.info(`(board.machines.result) ${JSON.stringify(result)}`);

    res.status(200).json(result).send();
  } catch (err) {
    next(err);
  }
})

module.exports = router;