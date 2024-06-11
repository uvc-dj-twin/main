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
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(50),
          allowNull: false,
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
    db.User.belongsTo(db.Group, { foreignKey: { name: "groupId" }, onDelete: "SET NULL", as: "Group", });
  }

  static getPrivateIncludeAttributes() {
    return ["id", "name", "email", "phone", "role"];
  }

  static getUserGroupListAttributes() {
    return ['id', 'email', 'name'];
  }

};
