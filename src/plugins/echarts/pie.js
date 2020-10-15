const config = {
  backgroundColor: "#000000",
  title: {
    text: "数量以及占比",
    left: "center",
    top: 20,
    textStyle: {
      color: "#ccc"
    }
  },

  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
    {
      name: "统计数量",
      type: "pie",
      radius: "55%",
      center: ["50%", "50%"],
      roseType: "radius",
      label: {
        color: "rgba(255, 255, 255, 0.3)"
      },
      labelLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)"
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        // color: "#c23531",
        shadowBlur: 200,
        shadowColor: "rgba(0, 0, 0, 0.5)"
      },
      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: function() {
        return Math.random() * 200;
      }
    }
  ]
};

export default config;
