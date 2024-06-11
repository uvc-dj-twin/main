const { GroupMachineJoin } = require("../models");

const dao = {

  insert(params) {
    return new Promise((resolve, reject) => {
      GroupMachineJoin.create(params).then((inserted) => {
        const insertedResult = inserted;
        resolve(insertedResult);
      }).catch((err) => {
        reject(err);
      })
    })
  },

  selectOne(params) {
    return new Promise((resolve, reject) => {
      GroupMachineJoin.findOne({
        where: {
          groupId: params.groupId,
          machineId: params.machineId,
        },
      })
        .then((selected) => {
          const result = selected?.toJSON();
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    })
  },

  delete(params) {
    return new Promise((resolve, reject) => {
      GroupMachineJoin.destroy({
        where: {
          groupId: params.groupId,
          machineId: params.machineId,
        },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },

  deleteForce(params) {
    return new Promise((resolve, reject) => {
      GroupMachineJoin.destroy({
        where: {
          groupId: params.groupId,
          machineId: params.machineId,
        },
        force: true,
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
}

module.exports = dao;