<template>
  <el-container class="app">
    <el-header>
      <el-menu
        router
        class="transparent"
        :default-active="$route.path"
        mode="horizontal"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/home">Rabbit</el-menu-item>
        <el-menu-item index="/register">登记</el-menu-item>
        <el-menu-item index="/remind">提醒</el-menu-item>
        <el-menu-item index="/manage">管理</el-menu-item>
      </el-menu>
      <Poetry></Poetry>
    </el-header>
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
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
