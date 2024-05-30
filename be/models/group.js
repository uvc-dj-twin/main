const Sequelize = require("sequelize");

module.exports = class Group extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(150),
          allowNull: false,
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
    db.Group.hasMany(db.User, { foreignKey: { name: 'groupId' }, onDelete: 'SET NULL', as: 'User' });
    db.Group.belongsToMany(db.Machine, { through: db.GroupMachineJoin, foreignKey: 'groupId', otherKey: 'machineId', as: 'Machines' });
  }

};
