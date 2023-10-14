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


/**
 * @description 登录注册接口
 */

export const loginReq = (data) => {
  return tools.request({
    url: `${API_PRE}/login`,
    params: data,
    method: 'POST'
  })
}


/**
 * @description 订单预定接口
 */

export const orderReq = (data) => tools.request({
  url: `${API_PRE}/order/order`,
  params: data,
  method: 'POST'
})
