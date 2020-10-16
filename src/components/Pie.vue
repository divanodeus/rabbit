<template>
  <div id="echarts_pie" class="echarts"></div>
</template>
<script>
const throttle = require("lodash/throttle");
const echarts = require("echarts");
require("echarts/theme/macarons");
import { countRegisterGroupByCompany } from "@/plugins/service";
import EventBus from "@/plugins/eventBus";
export default {
  name: "Pie",

  data() {
    return {
      echartsInstance: null
    };
  },

  mounted() {
    this.initEchartsPie();
    EventBus.$on("refreshEcharts", target => {
      this.refreshEchartsPie(target);
    });
  },

  beforeDestroy() {
    EventBus.$off("refreshEcharts");
  },

  methods: {
    initEchartsPie() {
      const dom = document.querySelector("#echarts_pie");
      this.echartsInstance = echarts.init(dom, "macarons");

      this.handleResizeObserver(dom);
      this.refreshEchartsPie();
    },

    refreshEchartsPie(dates) {
      countRegisterGroupByCompany(dates)
        .then(result => {
          let config = this.getConfig();
          let selected = {};
          result.forEach((element, index) => {
            selected[element.name] = index < 10;
          });
          config.series[0].data = result;
          config.legend.selected = selected;
          this.echartsInstance.setOption(config);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },

    handleResizeObserver(dom) {
      const resizeObserver = new ResizeObserver(
        throttle(() => {
          this.echartsInstance.resize();
        }, 500)
      );
      resizeObserver.observe(dom);
      this.$once("hook:beforeDestroy", () => {
        resizeObserver.disconnect();
      });
    },

    getConfig() {
      const color = "#efefef";
      const inactiveColor = "#9099ab";
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          inactiveColor: inactiveColor,
          textStyle: {
            color: color
          },
          pageIconColor: color,
          pageIconInactiveColor: inactiveColor,
          pageTextStyle: {
            color: color
          }
        },
        series: [
          {
            name: "数量和比例",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
.echarts {
  height: 100%;
  width: 100%;
}
</style>
