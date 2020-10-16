import dayjs from "dayjs";
require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");

const _dayjs = {
  thisDay() {
    const start = dayjs()
      .startOf("day")
      .toDate();
    const end = dayjs()
      .endOf("day")
      .toDate();
    return [start, end];
  },

  thisWeek() {
    const start = dayjs()
      .startOf("week")
      .toDate();
    const end = dayjs()
      .endOf("week")
      .toDate();
    return [start, end];
  },

  thisMonth() {
    const start = dayjs()
      .startOf("month")
      .toDate();
    const end = dayjs()
      .endOf("month")
      .toDate();
    return [start, end];
  },

  lastWeek() {
    const start = dayjs()
      .subtract(1, "week")
      .startOf("week")
      .toDate();
    const end = dayjs()
      .subtract(1, "week")
      .endOf("week")
      .toDate();
    return [start, end];
  },

  lastMonth() {
    const start = dayjs()
      .subtract(1, "months")
      .startOf("month")
      .toDate();
    const end = dayjs()
      .subtract(1, "months")
      .endOf("month")
      .toDate();
    return [start, end];
  },

  getDates(key) {
    switch (key) {
      case "thisDay":
        return this.thisDay();
      case "thisWeek":
        return this.thisWeek();
      case "thisMonth":
        return this.thisMonth();
      case "lastWeek":
        return this.lastWeek();
      case "lastMonth":
        return this.lastMonth();
      default:
        return null;
    }
  }
};

export default _dayjs;
