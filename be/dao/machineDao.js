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
          const result = selected?.toJSON();
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
          const result = selected.map(machine => machine?.toJSON());
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  selectById(params) {
    return new Promise((resolve, reject) => {
      Machine.findOne({
        where: {
          id: params.id,
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

  selectByNameLike(params) {
    const offset = (params.page - 1) * params.limit;
    const where = {};
    if (params.name) {
      where.name = {
        [Op.like]: `%${params.name}%`
      }
    }
    const groupWhere = {};
    if (params.groupName) {
      groupWhere.name = {
        [Op.like]: `%${params.groupName}%`
      }
    }
    return new Promise((resolve, reject) => {
      Machine.findAndCountAll({
        include: [
          {
            model: Group,
            through: {
              attributes: []
            },
            as: 'Groups',
            where: groupWhere,
            required: false,
          }
        ],
        attributes: Machine.machinesListAttributes,
        where: where,
        limit: params.limit,
        offset: offset,
      })
        .then((selected) => {
          const result = {
            totalRow: selected.count,
            machines: selected.rows.map(machine => machine?.toJSON()),
          }
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    })
  },

  create(params) {
    return new Promise((resolve, reject) => {
      Machine.create(params)
        .then((selected) => {
          resolve(selected?.toJSON());
        })
        .catch((err) => {
          reject(err);
        });
    })
  },

  update(params) {
    return new Promise((resolve, reject) => {
      Machine.update(params, {
        where: { id: params.id },
      })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  delete(params) {
    return new Promise((resolve, reject) => {
      Machine.destroy({
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
