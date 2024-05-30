const { sequelize } = require('./connection');
const User = require('./user');

const db = {};

db.sequelize = sequelize;

db.User = User

// model 생성
// db.Department = Department;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});

module.exports = db;