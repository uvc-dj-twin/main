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
  },

  list() {
    return new Promise((resolve, reject) => {
      Group.findAll()
        .then((selected) => {
          resolve(selected.map(group => group?.toJSON()));
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createGroup(params) {
    return new Promise((resolve, reject) => {
      Group.create(params)
        .then((selected) => {
          resolve(selected?.toJSON());
        })
        .catch((err) => {
          reject(err);
        });
    })
  },

  deleteGroup(params) {
    return new Promise((resolve, reject) => {
      Group.destroy({
        where: {
          id: params.id,
        },
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
