<template>
  <el-tabs v-model="activeName" tab-position="left" class="page">
    <el-tab-pane label="公司管理" name="company">
      <MaintainManage type="company"></MaintainManage>
    </el-tab-pane>
    <el-tab-pane label="部门管理" name="department">
      <MaintainManage type="department"></MaintainManage>
    </el-tab-pane>
    <el-tab-pane label="项目管理" name="project">
      <MaintainManage type="project"></MaintainManage>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import MaintainManage from "@/components/MaintainManage";
export default {
  name: "Manage",

  components: {
    MaintainManage
  },

  data() {
    return {
      activeName: "company"
    };
  }
};
</script>
