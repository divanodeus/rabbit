<template>
  <el-container>
    <el-header class="header">
      <el-menu
        router
        class="transparent"
        :default-active="$route.path"
        mode="horizontal"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/home">Rabbit</el-menu-item>
        <el-menu-item index="/statement">报表</el-menu-item>
        <el-menu-item index="/remind">提醒</el-menu-item>
        <el-menu-item index="/manage">管理</el-menu-item>
      </el-menu>
      <Poetry></Poetry>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Poetry from "@/components/Poetry";
export default {
  name: "Home",
  components: { Poetry }
};
</script>
<style lang="less" scoped>
.header {
  background: #f7889c linear-gradient(-90deg, #a050d7 0, #f7889c 100%);
  background-color: #f7889c;
  border-top-color: #a050d7;
  border-bottom-color: #ffebf8;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
