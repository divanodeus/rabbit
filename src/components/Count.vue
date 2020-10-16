<template>
  <div class="dashboard mat-elevation-z4" @click="clickEvent">
    <div class="title">{{ title }}</div>
    <div class="number">{{ number }}</div>
    <div class="export-icon" @click.stop="exportEvent">
      <i :class="[loading ? 'el-icon-loading' : 'el-icon-top-right']"></i>
    </div>
  </div>
</template>
<script>
const { ipcRenderer } = require("electron");
import { countRegister, queryRegister } from "@/plugins/service";
import dayjs from "@/plugins/dayjs";
import EventBus from "@/plugins/eventBus";
export default {
  name: "Count",

  props: {
    type: String
  },

  computed: {
    title() {
      const m = {
        thisDay: "今日",
        thisWeek: "本周",
        thisMonth: "本月",
        lastWeek: "上周",
        lastMonth: "上月",
        all: "总计"
      };
      return m[this.type];
    }
  },

  data() {
    return {
      number: 0,
      params: null,
      loading: false
    };
  },

  created() {
    this.search();
  },

  methods: {
    search() {
      this.params = dayjs.getDates(this.type);
      countRegister(this.params).then(res => {
        this.number = res;
      });
    },
    clickEvent() {
      EventBus.$emit("refreshEcharts", this.params);
    },
    exportEvent() {
      if (this.number === 0) {
        this.$message.info(`${this.title}没有可以导出的数据`);
        return;
      }
      if (!this.loading) {
        this.loading = true;
        queryRegister({ dateTime: this.params })
          .then(res => {
            if (res.length) {
              const data = JSON.parse(JSON.stringify(res));
              ipcRenderer.invoke("exportXLSX", data).then(res => {
                if (res) {
                  ipcRenderer.once("export_success", () => {
                    this.$message.success("导出成功！");
                    this.loading = false;
                  });
                } else {
                  this.loading = false;
                }
              });
            }
          })
          .catch(error => {
            this.$message.error(error.message);
            this.loading = false;
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.dashboard {
  position: relative;

  display: flex;

  height: 60px;
  padding: 2px 28px 2px 8px;

  cursor: pointer;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  &:hover {
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
  .number {
    font-size: 28px;

    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
  }
  .title {
    font-size: 14px;
    line-height: 21px;

    color: #ccc;
  }
  .export-icon {
    font-size: 14px;
    line-height: 21px;

    position: absolute;
    top: 0;
    right: 0;

    width: 28px;

    text-align: center;

    color: #ccc;
    border-radius: 2px;
    &:hover {
      color: #fff;
      background-color: rgb(205, 52, 219);
    }
  }
}
</style>
