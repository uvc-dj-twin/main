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
    const group = await boardService.monitoringDataList(params);
    logger.info(`(board.info.result) ${JSON.stringify(group)}`);

    // const io = req.app.get('io');
    res.status(200).json(group).send();
  } catch (err) {
    next(err);
  }
})

module.exports = router;