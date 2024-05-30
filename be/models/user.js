const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(200),
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(50),
        },
        role: {
          type: Sequelize.STRING(20),
        },
        isApproved: {
          type: Sequelize.BOOLEAN
        },
      },
      {
        sequelize,
        underscored: true, // true: underscored, false: camelCase
        timestamps: true, // createAt, updatedAt
        paranoid: true, // deletedAt
      }
    );
  }

  static associate(db) {
  }

};
