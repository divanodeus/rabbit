<template>
  <Layout class="page">
    <template #header>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="3">
          <Count type="thisDay"></Count>
        </el-col>
        <el-col :span="3">
          <Count type="thisWeek"></Count>
        </el-col>
        <el-col :span="3">
          <Count type="thisMonth"></Count>
        </el-col>
        <el-col :span="3">
          <Count type="lastWeek"></Count>
        </el-col>
        <el-col :span="3">
          <Count type="lastMonth"></Count>
        </el-col>
        <el-col :span="3">
          <Count type="all"></Count>
        </el-col>
      </el-row>
    </template>
    <template>
      <Pie></Pie>
    </template>
  </Layout>
</template>
<script>
import Layout from "@/components/Layout";
import Count from "@/components/Count";
import Pie from "@/components/Pie";
export default {
  name: "Home",

  components: {
    Layout,
    Count,
    Pie
  },

  data() {
    return {
      thisDay: 0,
      thisWeek: 0,
      thisMonth: 0
    };
  },

  created() {},

  mounted() {},

  methods: {}
};
</script>
<style lang="less" scoped>
.page {
  background-image: linear-gradient(
    to top,
    #1e3c72 0%,
    #1e3c72 1%,
    #2a5298 100%
  );
}
// dashboard
</style>
