const Code = require('./code');
const { sequelize } = require('./connection');
const Group = require('./group');
const GroupMachineJoin = require('./groupMachineJoin');
const Machine = require('./machine');
const User = require('./user');

const db = {};

db.sequelize = sequelize;


// model 생성
db.User = User
db.Group = Group
db.Machine = Machine
db.GroupMachineJoin = GroupMachineJoin
db.Code = Code

console.log(Object.keys(db));
// model init
Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});

// model 관계 설정
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;