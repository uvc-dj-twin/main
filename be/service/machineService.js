const groupDao = require("../dao/groupDao");
const groupMachineJoinDao = require("../dao/groupMachineJoinDao");
const machineDao = require("../dao/machineDao");
const logger = require("../lib/logger");

const service = {
  async list(params) {
    let result = {};

    try {
      machines = await machineDao.selectByNameLike(params);
      groups = await groupDao.list();
      result.totalRow = machines.totalRow;
      result.machines = machines.machines.map(machine => {
        machineGroups = [];
        for (const group of groups) {
          const exists = machine.Groups.some(mg => mg.id === group.id);
          machineGroups.push({
            id: group.id,
            name: group.name,
            access: exists,
          })
        }
        const { Groups, ...rest } = machine;
        return { ...rest, groups: machineGroups };
      })
      logger.debug(`(machineService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async editList(params) {
    let result = {};

    try {
      for (const machine of params.machines) {
        await machineDao.update({
          id: machine.id,
          name: machine.name,
          threshold: machine.threshold,
        });
        for (const group of machine.groups) {
          if (group.access === true) {
            const exist = await groupMachineJoinDao.selectOne({ machineId: machine.id, groupId: group.id });
            if (!exist) {
              await groupMachineJoinDao.insert({ machineId: machine.id, groupId: group.id });
            }
          } else if (group.access === false) {
            const exist = await groupMachineJoinDao.selectOne({ machineId: machine.id, groupId: group.id });
            if (exist) {
              await groupMachineJoinDao.deleteForce({ machineId: machine.id, groupId: group.id });
            }
          }
        }

      }
    } catch (err) {
      logger.error(`(machineService.editList) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  }
}

module.exports = service;