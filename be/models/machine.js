const Sequelize = require("sequelize");

module.exports = class Machine extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        serialNo: {
          type: Sequelize.STRING(200),
          unique: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        threshold: {
          type: Sequelize.INTEGER,
        }
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
    db.Machine.belongsToMany(db.Group, { through: db.GroupMachineJoin, foreignKey: 'machineId', otherKey: 'groupId', as: 'Groups' });
  }

  static machinesListAttributes = ['id', 'serialNo', 'name', 'threshold' ]

};
