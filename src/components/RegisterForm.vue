<template>
  <el-dialog :visible.sync="visible" :before-close="close" @open="init">
    <div slot="title">
      <el-switch
        v-model="disabled"
        active-text="开启修改"
        :active-value="false"
        :inactive-value="true"
      >
      </el-switch>
    </div>
    <el-form
      :model="form"
      :disabled="disabled"
      size="mini"
      label-position="right"
      label-width="100px"
      label-suffix="："
    >
      <el-form-item label="公司">
        <el-input v-model="form.company" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="事由">
        <el-input v-model="form.cause" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-input v-model="form.dateTime" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="经办人">
        <el-input v-model="form.transactor" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="盖章内容">
        <el-input
          v-model="form.sealContents"
          placeholder="请输入公司"
        ></el-input>
      </el-form-item>
      <el-form-item label="份数">
        <el-input v-model="form.copies" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="对方单位">
        <el-input v-model="form.partyB" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="项目">
        <el-input v-model="form.project" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="form.department" placeholder="请输入公司"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder="请输入公司"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" v-show="!disabled">
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "RegisterForm",

  props: {
    visible: Boolean,
    data: Object
  },

  data() {
    return {
      form: {},
      disabled: true
    };
  },

  methods: {
    init() {
      this.disabled = true;
      this.form = this.data.toJSON();
    },
    close() {
      this.$emit("update:visible", false);
    },
    confirm() {
      this.$emit("confirm", this.form);
    }
  }
};
</script>
