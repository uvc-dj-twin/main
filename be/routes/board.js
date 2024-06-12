const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const boardService = require('../service/boardService');
const { isLoggedIn } = require('../lib/middleware');
const CustomError = require('../error/CustomError');

router.get('/monitoring-data', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
    };
    logger.info(`(board.info.params) ${JSON.stringify(params)}`);
    const result = await boardService.monitoringDataList(params);
    logger.info(`(board.info.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
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

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
})

router.get('/machines/statistics/:id', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      machineId: req.params.id,
      startDate: new Date(req.query.startDate),
      endDate: new Date(req.query.endDate),
    };
    if (req.query.startDate === null || req.query.endDate === null) {
      throw new CustomError(400, 'Bad Request');
    } else {
      logger.info(`(board.machines.statistics.params) ${JSON.stringify(params)}`);
      const result = await boardService.machineStatistics(params);
      logger.info(`(board.machines.statistics.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    }

  } catch (err) {
    next(err);
  }
})

router.get('/machines/details/:id/data', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      machineId: req.params.id,
      time: new Date(req.query.time),
    }
    if (!req.params.id || !req.query.time) {
      throw new CustomError(400, 'Bad Request');
    } else {
      logger.info(`(board.machines.details.data.params) ${JSON.stringify(params)}`);
      const result = await boardService.machineDetailsData(params);
      logger.info(`(board.machines.details.data.result) ${JSON.stringify(result)}`);
  
      res.status(200).json(result);
    }
    
  } catch (err) {
    next(err);
  }
})

router.get('/machines/details/:id', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      machineId: req.params.id,
      startTime: new Date(req.query.startTime),
      endTime: new Date(req.query.endTime),
      codeId: req.query.result || -1,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
    }
    if (!req.params.id || !req.query.startTime || !req.query.endTime) {
      throw new CustomError(400, 'Bad Request');
    } else {
      logger.info(`(board.machines.details.params) ${JSON.stringify(params)}`);
      const result = await boardService.machineDetails(params);
      logger.info(`(board.machines.details.result) ${JSON.stringify(result)}`);

      res.status(200).json(result);
    }

  } catch (err) {
    next(err);
  }
})


module.exports = router;