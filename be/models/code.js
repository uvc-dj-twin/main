const Sequelize = require("sequelize");

module.exports = class Code extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        machineId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'uniqueMachineAndCode'
        },
        code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'uniqueMachineAndCode'
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
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
    db.Code.belongsTo(db.Machine, {foreignKey: { name: "machineId" },onDelete: "SET NULL",as: "Machine",});
  }

};
