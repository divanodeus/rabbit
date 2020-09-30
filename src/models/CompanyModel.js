const { DataTypes } = require("sequelize");
const sequelize = require("@/plugins/sequelize");

const Company = sequelize.define("company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 公司
  company: {
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
module.exports = Company;
