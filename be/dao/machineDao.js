const { Op } = require("sequelize");
const { Machine, Group } = require("../models/index");

const dao = {
  selectByGroupId(params) {
    console.log(params.groupId)
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
