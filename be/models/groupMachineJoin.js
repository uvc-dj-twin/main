const Sequelize = require('sequelize');

module.exports = class GroupMachineJoin extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      groupId: {
        type: Sequelize.INTEGER,
        unique: 'groupMachineUnique',
      },
      machineId: {
        type: Sequelize.INTEGER,
        unique: 'groupMachineUnique',
      },
    }, {
      sequelize,
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }
}