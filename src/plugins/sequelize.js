const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    // timestamps: false,
    freezeTableName: true
  },
  storage: "rabbit.db"
});

module.exports = sequelize;
