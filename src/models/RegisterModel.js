const { DataTypes } = require("sequelize");
const sequelize = require("@/plugins/sequelize");
const Company = require("./CompanyModel");

const Register = sequelize.define("register", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 时间
  dateTime: {
    type: DataTypes.DATEONLY
  },
  // 项目
  project: {
    type: DataTypes.STRING
  },
  // 事由
  cause: {
    type: DataTypes.STRING
  },
  // 文件类型
  sealContents: {
    type: DataTypes.STRING
  },
  // 份数
  copies: {
    type: DataTypes.INTEGER
  },
  // 经办人
  transactor: {
    type: DataTypes.STRING
  },
  // 经办人所属部门
  department: {
    type: DataTypes.STRING
  },
  // 对方单位
  partyB: {
    type: DataTypes.STRING
  },
  // 备注
  remark: {
    type: DataTypes.STRING
  }
});

Register.belongsToMany(Company, { through: "register_company" });
Company.belongsToMany(Register, { through: "register_company" });

module.exports = Register;
