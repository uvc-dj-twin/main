const { Op } = require("sequelize");
const { Machine, Group } = require("../models/index");

const dao = {
  selectBySerialNo(params) {
    return new Promise((resolve, reject) => {
      Machine.findOne({
        where: {
          serialNo: params.serialNo,
        },
      })
       .then((selected) => {
          const result = selected.toJSON();
          resolve(result);
        })
       .catch((err) => {
          reject(err);
        });
    })
  },

  selectByGroupId(params) {
    return new Promise((resolve, reject) => {
      Machine.findAll({
        include: [{
          model: Group,
          as: 'Groups',
          where: {
            id: params.groupId,
          },
          through: {
            attributes: []
          }
        }]
      })
        .then((selected) => {
          const result = selected.map(machine => machine.toJSON());
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = dao;
