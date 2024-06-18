const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const { isLoggedIn, isRightRole } = require('../lib/middleware');
const machineService = require('../service/machineService');
const groupService = require('../service/groupService');
const userService = require('../service/userService');
const CustomError = require('../error/CustomError');

router.patch('/users/:id/approval', isLoggedIn, isRightRole(['admin']), async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      userId: req.params.id,
    };
    logger.info(`(admin.users.approval.params) ${JSON.stringify(params)}`);
    const result = await userService.approve(params);
    logger.info(`(admin.users.approval.result) ${JSON.stringify(result)}`);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
})

router.get('/machines', isLoggedIn, isRightRole(['admin']), async (req, res, next) => {
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

router.post('/machines', isLoggedIn, isRightRole(['admin']), async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      serialNo: req.body.serialNo,
      name: req.body.name,
      threshold: req.body.threshold,
    };
    logger.info(`(admin.machines.create.params) ${JSON.stringify(params)}`);
    const result = await machineService.create(params);
    logger.info(`(admin.machines.create.result) ${JSON.stringify(result)}`);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
})

router.patch('/machines', isLoggedIn, isRightRole(['admin']), async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      machines: req.body.machines,
      deletedMachines: req.body.deletedMachines,
    };
    logger.info(`(admin.machines.update.params) ${JSON.stringify(params)}`);
    const result = await machineService.editList(params);
    logger.info(`(admin.machines.update.result) ${JSON.stringify(result)}`);

    res.status(200).send();
  } catch (err) {
    next(err);
  }
})

router.get('/groups/users', isLoggedIn, isRightRole(['admin']), async (req, res, next) => {
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

router.patch('/groups/users', isLoggedIn, isRightRole(['admin']), async (req, res, next) => {
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

router.post('/groups', isLoggedIn, isRightRole(['admin']), async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      groupName: req.body.name,
    };
    logger.info(`admin.groups.params ${JSON.stringify(params)}`);
    const result = await groupService.createGroup(params);
    logger.info(`admin.groups.params ${JSON.stringify(result)}`);

    res.status(201).send();
  } catch (err) {
    next(err);
  }
})

router.delete('/groups/:id', isLoggedIn, isRightRole(['admin']), async (req, res, next) => {
  try {
    const params = {
      id: req.user.id,
      groupId: req.params.id,
    }
    logger.info(`admin.groups.delete.params ${JSON.stringify(params)}`);
    const result = await groupService.deleteGroup(params);
    logger.info(`admin.groups.delete.params ${JSON.stringify(result)}`);

    res.status(200).send();
  } catch (err) {
    next(err);
  }
})

module.exports = router;