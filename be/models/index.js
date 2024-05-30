const { sequelize } = require('./connection');
const Department = require('./department');

const db = {};

db.sequelize = sequelize;

// model 생성
// db.Department = Department;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});

module.exports = db;