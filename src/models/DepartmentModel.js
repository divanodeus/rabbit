const { DataTypes } = require("sequelize");
const sequelize = require("@/plugins/sequelize");

const Department = sequelize.define("department", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 部门
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // 是否生效
  effective: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  // 备注
  remark: {
    type: DataTypes.STRING
  }
});
Department.sync();
module.exports = Department;
