import dayjs from "dayjs";

export const ERR_MSG = "网络异常，请稍后重试";

// 日历最小和最大日期
export const MIN_DATE = dayjs().format(`YYYY-MM-DD`);
export const MAX_DATE = dayjs().add(60, "day").format("YYYY-MM-DD");
