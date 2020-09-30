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
      <el-form-item label="公司" v-if="this.type === 'company'">
        <el-input
          v-model="form.company"
          :clearable="isAdd"
          placeholder="公司"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" v-if="this.type === 'department'">
        <el-input
          v-model="form.department"
          :clearable="isAdd"
          placeholder="部门"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目" v-if="this.type === 'project'">
        <el-input
          v-model="form.project"
          :clearable="isAdd"
          placeholder="项目"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          :clearable="isAdd"
          placeholder="备注"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否生效">
        <el-switch v-model="form.effective"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button v-show="!disabled" type="primary" size="mini" @click="confirm">
        {{ isAdd ? "新 增" : "修 改" }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script>
const typeMap = {
  company: "公司",
  department: "部门",
  project: "项目"
};
export default {
  name: "MaintainForm",

  props: {
    visible: Boolean,
    isAdd: Boolean,
    data: Object,
    type: String
  },

  data() {
    return {
      form: {},
      disabled: true
    };
  },

  methods: {
    init() {
      this.form = this.data.toJSON();
      this.disabled = !this.isAdd;
      if (this.isAdd) {
        this.form.effective = true;
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
      ).then(res => {
        if (res) {
          this.dataTrim();
          this.data
            .set(this.form)
            .save()
            .then(() => {
              this.$message.success(`${typeText}成功！`);
              this.$emit("reload");
              this.close();
            })
            .catch(error => {
              console.log(error);
              if (error.name === "SequelizeUniqueConstraintError") {
                this.$message.error(
                  `已经有相同名称的${typeMap[this.type]}存在，请勿重复添加！`
                );
              } else {
                this.$message.error(`${typeText}失败！`);
              }
            });
        }
      });
    },
    dataTrim() {
      this.form[this.type] = this.form[this.type].trim();
    },
    close() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
