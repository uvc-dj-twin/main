const { Op } = require("sequelize");
const { Machine, Group } = require("../models/index");

const dao = {
  selectBySerialNo(params) {
    return new Promise((resolve, reject) => {
      Group.findAll({
        include: [{
          model: Machine,
          as: 'Machines',
          where: {
            serialNo: params.serialNo,
          },
          through: {
            attributes: []
          }
        }]
      })
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
