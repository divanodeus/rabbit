const Sequelize = require("sequelize");
import sequelize from "@/plugins/sequelize";

const company = sequelize.define("company", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "ID"
  },
  name: {
    type: Sequelize.STRING,
    field: "NAME"
  },
  age: {
    type: Sequelize.INTEGER,
    field: "AGE"
  },
  address: {
    type: Sequelize.STRING(50),
    field: "ADDRESS"
  },
  salary: {
    type: Sequelize.REAL,
    field: "SALARY"
  }
});

export default company;
