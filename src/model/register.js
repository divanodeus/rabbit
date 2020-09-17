const Sequelize = require("sequelize");
import sequelize from "@/plugins/sequelize";

const register = sequelize.define("register", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "ID"
  },
  // 公司
  company: {
    type: Sequelize.STRING
  },
  // 事由
  cause: {
    type: Sequelize.STRING
  },
  // 时间
  dateTime: {
    type: Sequelize.STRING,
    field: "data_time"
  },
  // 经办人
  transactor: {
    type: Sequelize.STRING
  },
  // 盖章内容
  sealContents: {
    type: Sequelize.STRING,
    field: "seal_contents"
  },
  // 份数
  copies: {
    type: Sequelize.INTEGER
  },
  // 对方单位
  partyB: {
    type: Sequelize.STRING,
    field: "party_b"
  },
  // 项目
  project: {
    type: Sequelize.STRING
  },
  // 部门
  department: {
    type: Sequelize.STRING
  },
  // 备注
  remark: {
    type: Sequelize.STRING
  }
});

export default register;
