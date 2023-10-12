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

/**
 * @description 获取城市接口列表
 */

export const airportListReq = (data) =>
  tools.request({
    url: `${API_PRE}/city/airportList`,
    params: data,
  });

/**
 * @description 获取机票列表
 */
export const airTicketListReq = (data) =>
  tools.request({
    url: `${API_PRE}/airTicket/singleList`,
    params: data,
  });
