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
