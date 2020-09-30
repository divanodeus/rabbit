<template>
  <div class="poetry" @contextmenu="getPoetry">{{ poetry }}</div>
</template>
<script>
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
    }
  }
};
</script>
<style lang="less" scoped>
.poetry {
  color: #fff;
  font-size: 14px;
  user-select: none;
  padding-right: 20px;
}
</style>
