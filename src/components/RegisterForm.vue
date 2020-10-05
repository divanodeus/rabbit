<template>
  <el-dialog :visible.sync="visible" :before-close="close" @open="init">
    <template #title>
      <el-switch
        v-model="disabled"
        v-show="!isAdd"
        active-text="开启修改"
        :active-value="false"
        :inactive-value="true"
      >
      </el-switch>
    </template>
    <el-form
      :model="form"
      :disabled="disabled"
      size="mini"
      label-position="right"
      label-width="100px"
      label-suffix="："
    >
      <el-form-item label="时间">
        <el-date-picker
          v-model="form.dateTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="公司">
        <el-select
          v-model="chosenCompanies"
          multiple
          filterable
          placeholder="请选择"
          value-key="id"
        >
          <el-option
            v-for="item in companies"
            :key="item.id"
            :label="item.company"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目">
        <el-select
          v-model="form.project"
          filterable
          default-first-option
          placeholder="请选择"
        >
          <el-option
            v-for="item in projects"
            :key="item.id"
            :value="item.project"
          >
          </el-option>
        </el-select>
        <!-- <el-autocomplete
          v-model="form.project"
          :clearable="isAdd"
          placeholder="项目"
          value-key="project"
          :fetch-suggestions="filterProject"
        ></el-autocomplete> -->
      </el-form-item>
      <el-form-item label="事由">
        <el-input
          v-model="form.cause"
          :clearable="isAdd"
          placeholder="事由"
        ></el-input>
      </el-form-item>
      <el-form-item label="文件类型">
        <el-radio-group v-model="form.sealContents">
          <el-radio label="合同">合同</el-radio>
          <el-radio label="协议">协议</el-radio>
          <el-radio label="其它">其它</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="份数">
        <el-input-number v-model="form.copies" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="经办人">
        <el-input
          v-model="form.transactor"
          :clearable="isAdd"
          placeholder="经办人"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-autocomplete
          v-model="form.department"
          :clearable="isAdd"
          placeholder="经办人所属部门"
          value-key="department"
          :fetch-suggestions="filterDepartment"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="对方单位">
        <el-input
          v-model="form.partyB"
          :clearable="isAdd"
          placeholder="对方单位"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          :autosize="{ minRows: 2, maxRows: 6 }"
          type="textarea"
          placeholder="备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button v-show="!disabled" type="primary" size="mini" @click="confirm">
        {{ isAdd ? "新 增" : "修 改" }}
      </el-button>
      <el-button v-show="disabled" type="danger" size="mini" @click="destroy">
        删 除
      </el-button>
    </template>
  </el-dialog>
</template>
<script>
const sequelize = require("@/plugins/sequelize");
export default {
  name: "RegisterForm",

  props: {
    visible: Boolean,
    isAdd: Boolean,
    data: Object
  },

  computed: {
    companies() {
      return this.$store.state.companies;
    },
    departments() {
      return this.$store.state.departments;
    },
    projects() {
      return this.$store.state.projects;
    }
  },

  data() {
    return {
      form: {},
      disabled: true,
      chosenCompanies: []
    };
  },

  methods: {
    init() {
      console.log(this.departments);
      this.form = this.data.toJSON();
      this.disabled = !this.isAdd;
      if (this.isAdd) {
        this.chosenCompanies = [];
      } else {
        this.chosenCompanies = this.data.companies;
      }
    },
    confirm() {
      const typeText = this.isAdd ? "新增" : "修改";
      this.$confirm(
        `请认真核对${typeText}数据！是否确认${typeText}？`,
        "警告",
        {
          type: "warning"
        }
      ).then(async res => {
        if (res) {
          try {
            await sequelize.transaction(async t => {
              await this.data.set(this.form).save({ transaction: t });
              await this.data.setCompanies(this.chosenCompanies, {
                transaction: t
              });
              this.$message.success(`${typeText}成功！`);
              this.$emit("reload");
              this.close();
            });
          } catch (error) {
            console.log(error);
            this.$message.error(`${typeText}失败！`);
          }
        }
      });
    },
    destroy() {
      this.$confirm("请确认本数据！是否确认删除？", "警告", {
        type: "warning"
      }).then(async res => {
        if (res) {
          try {
            await sequelize.transaction(async t => {
              await this.data.setCompanies([], { transaction: t });
              await this.data.destroy({ transaction: t });
            });
            this.$message.success("删除成功！");
            this.$emit("reload");
            this.close();
          } catch (error) {
            console.log(error);
            this.$message.error("删除失败！");
          }
        }
      });
    },
    close() {
      this.$emit("update:visible", false);
    },
    filterProject(keywords, cb) {
      if (keywords) {
        var results = this.projects.filter(data => {
          return data.project.includes(keywords);
        });
        cb(results);
      } else {
        cb(this.projects);
      }
    },
    filterDepartment(keywords, cb) {
      if (keywords) {
        var results = this.departments.filter(data => {
          return data.department.includes(keywords);
        });
        cb(results);
      } else {
        cb(this.departments);
      }
    }
  }
};
</script>
