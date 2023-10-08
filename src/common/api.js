import tools from "./tools";

const API_PRE = "http://localhost:3000";
/**
 * @description 获取首页轮播图图片
 */
export const adsReq = (data) =>
  tools.request({
    url: `${API_PRE}/ads/advertising`,
    params: data,
  });
