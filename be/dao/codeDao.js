const { Op } = require("sequelize");
const { Code } = require("../models/index");

const dao = {
  info(params) {
    return new Promise((resolve, reject) => {
      Code.findOne(
        {
          where: {
            machineId: params.machineId,
            code: params.code
          }
        }
      )
        .then((selected) => {
          resolve(selected);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = dao;
