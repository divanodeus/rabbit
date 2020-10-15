<template>
  <Layout class="page">
    <template #header>
      <div class="dashboard flex pa2 mx2 mat-elevation-z2">
        <div :span="3" class="count flex-center flex-column ">
          <span class="count-title">本月登记</span>
          <span class="count-number">{{ thisMonth }}</span>
        </div>
        <div :span="3" class="count flex-center flex-column">
          <span class="count-title">本周登记</span>
          <span class="count-number">{{ thisWeek }}</span>
        </div>
        <div :span="3" class="count flex-center flex-column">
          <span class="count-title">本日登记</span>
          <span class="count-number">{{ thisDay }}</span>
        </div>
      </div>
    </template>
    <template>
      <div class="flex height_full mx2">
        <div id="echarts_pie" class="echarts"></div>
        <div></div>
      </div>
    </template>
  </Layout>
</template>
<script>
const throttle = require("lodash/throttle");
const echarts = require("echarts");
require("echarts/theme/macarons");
import { countRegister, countRegisterGroupByCompany } from "@/plugins/service";
import pie from "@/plugins/echarts/pie";
import _dayjs from "@/plugins/dayjs";
import Layout from "@/components/Layout";
export default {
  name: "Home",

  components: {
    Layout
  },

  data() {
    return {
      thisDay: 0,
      thisWeek: 0,
      thisMonth: 0
    };
  },

  created() {
    this.count("thisDay");
    this.count("thisWeek");
    this.count("thisMonth");
  },

  mounted() {
    this.handleEchartsPie();
  },

  methods: {
    count(type) {
      let params = _dayjs[type]();
      countRegister(params)
        .then(result => {
          this[type] = result;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },

    handleEchartsPie() {
      const dom = document.querySelector("#echarts_pie");
      let _echarts = echarts.init(dom, "macarons");
      _echarts.setOption(pie);

      this.handleResizeObserver(_echarts, dom);

      countRegisterGroupByCompany()
        .then(([result]) => {
          _echarts.setOption({
            series: [{ data: result.reverse() }]
          });
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },

    handleResizeObserver(_echarts, dom) {
      const resizeObserver = new ResizeObserver(
        throttle(() => {
          _echarts.resize();
        }, 500)
      );
      resizeObserver.observe(dom);
      this.$once("hook:beforeDestroy", () => {
        resizeObserver.disconnect();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  background-color: #f6f6f6;
}
.dashboard {
  border-radius: 4px;
  background-color: #fff;
  .count {
    color: #f7889c;
    position: relative;
    width: 100px;
    &-title {
      font-size: 14px;
    }
    &-number {
      font-size: 24px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 2px;
      height: 100%;
      background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
    }
  }
}
.echarts {
  height: 100%;
  width: 100%;
}
</style>
