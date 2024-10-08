const { Op } = require("sequelize");
const { Code } = require("../models/index");

const dao = {
  info(params) {
    return new Promise((resolve, reject) => {
      Code.findOne(
        {
          where: {
            machineId: params.machineId,
            code: params.code || 0
          }
        }
      )
        .then((selected) => {
          resolve(selected?.toJSON());
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  listByMachine(params) {
    return new Promise((resolve, reject) => {
      Code.findAll(
        {
          where: {
            machineId: params.machineId,
          }
        }
      )
        .then((selected) => {
          const result = selected.map(code => code?.toJSON());
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  infoByIdAndMachineId(params) {
    return new Promise((resolve, reject) => {
      Code.findOne(
        {
          where: {
            id: params.id,
            machineId: params.machineId,
          }
        }
      )
        .then((selected) => {
          resolve(selected?.toJSON());
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = dao;
