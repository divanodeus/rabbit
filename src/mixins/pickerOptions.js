import _dayjs from "@/plugins/dayjs";

const pickerOptins = {
  data() {
    return {
      pickerOptions: {
        firstDayOfWeek: 1,
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", _dayjs.thisDay());
            }
          },
          {
            text: "本周",
            onClick(picker) {
              picker.$emit("pick", _dayjs.thisWeek());
            }
          },
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", _dayjs.thisMonth());
            }
          },
          {
            text: "上一周",
            onClick(picker) {
              picker.$emit("pick", _dayjs.lastWeek());
            }
          },
          {
            text: "上一个月",
            onClick(picker) {
              picker.$emit("pick", _dayjs.lastMonth());
            }
          }
        ]
      }
    };
  }
};

export default pickerOptins;
