import moment from "moment";

const pickerOptins = {
  data() {
    return {
      pickerOptions: {
        firstDayOfWeek: 1,
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const start = moment().toDate();
              const end = moment().toDate();
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "本周",
            onClick(picker) {
              const start = moment()
                .day(1)
                .toDate();
              const end = moment()
                .day(7)
                .toDate();
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "本月",
            onClick(picker) {
              const start = moment()
                .date(1)
                .toDate();
              const end = moment()
                .date(1)
                .add(1, "months")
                .subtract(1, "days")
                .toDate();
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "上一周",
            onClick(picker) {
              const start = moment()
                .day(-6)
                .toDate();
              const end = moment()
                .day(0)
                .toDate();
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "上一个月",
            onClick(picker) {
              const start = moment()
                .date(1)
                .subtract(1, "months")
                .toDate();
              const end = moment()
                .date(1)
                .subtract(1, "days")
                .toDate();
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  }
};

export default pickerOptins;
