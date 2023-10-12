import dayjs from "dayjs";

import { MIN_DATE, MAX_DATE } from "./constant";

/**
 * @description 将对象解析成url参数
 */
export const objectToString = (obj) => {
  let searchKeys = [];
  if (typeof obj === "object" && Object.keys(obj).length) {
    for (let key in obj) {
      searchKeys.push(`${key}=${obj[key]}`);
    }
  }

  return searchKeys.join("&");
};

/**
 * @description 星期转化
 *
 */
export const weekDay = (date = "") => {
  const day = dayjs(date).day();
  switch (day) {
    case 1:
      return "周一";
    case 2:
      return "周二";
    case 3:
      return "周三";
    case 4:
      return "周四";
    case 5:
      return "周五";
    case 6:
      return "周六";
    case 0:
      return "周日";
    default:
      return "";
  }
};

/**
 *
 * @description 格式化时间
 */

export const formatDateList = () => {
  let minStr = dayjs(MIN_DATE).valueOf();
  const maxStr = dayjs(MAX_DATE).valueOf();
  const dayStr = 1000 * 60 * 60 * 24; // 一天
  let res = [];
  for (; minStr <= maxStr; minStr += dayStr) {
    res.push({
      dateStr: dayjs(minStr).format("YYYY-MM-DD"),
      day: dayjs(minStr).format("M-DD"),
      week: weekDay(minStr),
    });
  }
  return res;
};
