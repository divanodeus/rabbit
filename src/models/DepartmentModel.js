const { DataTypes } = require("sequelize");
const sequelize = require("@/plugins/sequelize");
const pinyin = require("pinyin");

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
    unique: true,
    set(value) {
      this.setDataValue("department", value);
      this.setDataValue(
        "pinyin",
        pinyin(value, {
          style: pinyin.STYLE_NORMAL
        }).join(" ")
      );
    }
  },
  pinyin: {
    type: DataTypes.STRING
  },
  // 是否生效
  effective: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  // 备注
  remark: {
    type: DataTypes.STRING
  },
  // 虚拟字段
  name: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.department;
    }
  }
});

module.exports = Department;
