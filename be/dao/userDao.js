const { Op } = require("sequelize");
const { User } = require("../models/index");

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params)
        .then((inserted) => {
          // password는 제외하고 리턴함
          const { password, ...newInserted } = JSON.parse(
            JSON.stringify(inserted)
          );
          resolve(newInserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: { email: params.email },
      })
        .then((selectedInfo) => {
          resolve(selectedInfo);
        })
        .catch((err) => {
          reject(err);
        });
    })
  }

};

module.exports = dao;
