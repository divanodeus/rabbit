<template>
  <div class="poetry" @dblclick="getPoetry" @contextmenu="copy">
    {{ poetry }}
  </div>
</template>
<script>
const { clipboard } = require("electron");
export default {
  name: "Poetry",

  data: () => ({
    poetry: ""
  }),

  mounted() {
    this.getPoetry();
    this.timer = setInterval(() => {
      this.getPoetry();
    }, 1000 * 60 * 60 * 6);
  },

  destroyed() {
    if (this.timer) clearInterval(this.timer);
  },

  methods: {
    getPoetry() {
      fetch("https://v1.jinrishici.com/all.json")
        .then(data => data.json())
        .then(res => {
          this.poetry = `${res.content} —— ${res.author} 《${res.origin}》`;
        });
    },

    copy() {
      clipboard.writeText(this.poetry);
      this.$message.success("复制成功！");
    }
  }
};
</script>
<style lang="less" scoped>
.poetry {
  font-size: 14px;

  overflow: hidden;

  padding-right: 20px;

  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: #fff;

  -webkit-app-region: no-drag;
}
</style>
