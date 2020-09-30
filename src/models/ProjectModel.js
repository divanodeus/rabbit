const { DataTypes } = require("sequelize");
const sequelize = require("@/plugins/sequelize");

const Project = sequelize.define("project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 项目
  project: {
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
Project.sync();
module.exports = Project;
