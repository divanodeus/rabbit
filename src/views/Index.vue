<template>
  <el-container class="app">
    <el-header :class="{ 'mat-elevation-z4': $route.name === 'Home' }">
      <el-menu
        router
        class="transparent flex-none"
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
      <div class="flex justify-end align-center mr5">
        <Poetry></Poetry>
        <span class="window_button" @click="windowMin">
          <i class="el-icon-minus"></i>
        </span>
        <span class="window_button" @click="windowMax">
          <i class="el-icon-copy-document"></i>
        </span>
        <span class="window_button" @click="windowClose">
          <i class="el-icon-close"></i>
        </span>
      </div>
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
const { ipcRenderer } = require("electron");
import Poetry from "@/components/Poetry";
export default {
  name: "Home",
  components: { Poetry },
  methods: {
    windowMin() {
      ipcRenderer.send("windowMin");
    },
    windowMax() {
      ipcRenderer.send("windowMax");
    },
    windowClose() {
      ipcRenderer.send("windowClose");
    }
  }
};
</script>
