<template>
  <el-dialog :visible.sync="visible" :before-close="close" @open="init">
    <template #title>
      <el-switch
        v-model="disabled"
        v-show="!isNewRecord"
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
      <el-form-item :label="name">
        <el-input
          v-model="form.name"
          :clearable="isNewRecord"
          :placeholder="name"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          :clearable="isNewRecord"
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
        {{ isNewRecord ? "新 增" : "修 改" }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: "MaintainForm",

  props: {
    visible: Boolean,
    data: Object,
    type: String
  },

  data() {
    return {
      form: {},
      disabled: true,
      isNewRecord: false
    };
  },

  computed: {
    name() {
      const typeMap = {
        company: "公司",
        department: "部门",
        project: "项目"
      };
      return typeMap[this.type];
    }
  },

  methods: {
    init() {
      this.form = this.data.toJSON();
      this.isNewRecord = this.data.isNewRecord;
      this.disabled = !this.isNewRecord;
      if (this.isNewRecord) {
        this.form.effective = true;
      }
    },
    confirm() {
      if (!this.form.name) {
        this.$message.warning(`请输入${this.name}名称！`);
        return;
      }
      const typeText = this.isNewRecord ? "新增" : "修改";
      this.$confirm(
        `请认真核对${typeText}数据！是否确认${typeText}？`,
        "警告",
        {
          type: "warning"
        }
      ).then(res => {
        if (res) {
          this.form[this.type] = this.form.name;
          this.data
            .set(this.form)
            .save()
            .then(() => {
              this.$message.success(`${typeText}成功！`);
              this.$emit("reload");
              this.close();
            })
            .catch(error => {
              if (error.name === "SequelizeUniqueConstraintError") {
                this.$message.error(
                  `已经有相同名称的${name}存在，请勿重复添加！`
                );
              } else {
                this.$message.error(error.message);
              }
            });
        }
      });
    },
    close() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
