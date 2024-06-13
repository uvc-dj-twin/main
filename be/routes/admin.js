const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const { isLoggedIn } = require('../lib/middleware');
const machineService = require('../service/machineService');
const groupService = require('../service/groupService');
const userService = require('../service/userService');
const CustomError = require('../error/CustomError');

router.get('/machines', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      name: req.query.name,
      groupName: req.query.group,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
    };
    logger.info(`(admin.machines.list.params) ${JSON.stringify(params)}`);
    const result = await machineService.list(params);
    logger.info(`(admin.machines.list.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
})

router.patch('/machines', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      machines: req.body.machines,
    };
    logger.info(`(admin.machines.update.params) ${JSON.stringify(params)}`);
    const result = await machineService.editList(params);
    logger.info(`(admin.machines.update.result) ${JSON.stringify(result)}`);

    res.status(200).send();
  } catch (err) {
    next(err);
  }
})

router.get('/groups/users', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      userEmail: req.query.userEmail,
      userName: req.query.userName,
      groupName: req.query.group,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
    };
    logger.info(`(admin.groups - users.list.params) ${JSON.stringify(params)}`);
    const result = await groupService.userList(params);
    logger.info(`(admin.groups - users.list.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
})

router.patch('/groups/users', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      users: req.body.users,
    };
    logger.info(`(admin.groups - users.update.params) ${JSON.stringify(params)}`);
    const result = await userService.editGroup(params);
    logger.info(`(admin.groups - users.update.result) ${JSON.stringify(result)}`);

    res.status(200).send();
  } catch (err) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      next(new CustomError(400, 'Bad Request'));
    } else {
      next(err);
    }
  }
})

module.exports = router;