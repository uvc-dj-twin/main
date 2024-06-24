const { Op } = require("sequelize");
const { User, Group } = require("../models/index");

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

  // 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      User.findByPk(params.id, {
        attributes: User.getPrivateIncludeAttributes(),
        include: [
          {
            model: Group,
            as: 'Group',
            attributes: ["id", "name"]
          }
        ]
      })
        .then((selectedInfo) => {
          resolve(selectedInfo?.toJSON());
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      User.update(params, {
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

  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      User.destroy({
        where: { id: params.id },
      })
        .then((deleted) => {
          resolve({ deletedCount: deleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // email로 조회
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
  },

  selectByEmailAndGroupNameLike(params) {
    const offset = (params.page - 1) * params.limit;
    const where = {};
    if (params.userEmail) {
      where.email = {
        [Op.like]: `%${params.userEmail}%`
      }
    }
    if (params.userName) {
      where.name = {
        [Op.like]: `%${params.userName}%`
      }
    }
    const groupWhere = {};
    let groupRequired = false;
    if (params.groupName) {
      groupWhere.name = {
        [Op.like]: `%${params.groupName}%`
      }
      groupRequired = true;
    }
    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        include: [
          {
            model: Group,
            as: 'Group',
            attributes: ['id', 'name'],
            where: groupWhere,
            required: groupRequired,
          }
        ],
        attributes: User.getUserGroupListAttributes(),
        where: where,
        limit: params.limit,
        offset: offset,
        order: [['id', 'ASC']],
      })
        .then((selected) => {
          const result = {
            totalRow: selected.count,
            users: selected.rows.map(user => user?.toJSON()),
          }
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    })
  },

  approve(params) {
    return new Promise((resolve, reject) => {
      User.update(params, {
        where: { id: params.id },
      })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

};

module.exports = dao;
