import Taro from "@tarojs/taro";

import { objectToString } from "./utils";

const tools = {
  /**
   * @description 请求方法
   */
  request: (opts) => {
    const {
      url = "",
      params = {}, //请求参数
      method = "GET",
      ...rest // 剩余参数
    } = opts;

    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        data: params,
        method,
        ...rest,
      })
        .then((res) => {
          const { data } = res;
          if (data?.code === 1) {
            resolve(data);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  /**
   * @description 页面loading 组件
   */
  showLoading: (params = "") => {
    let dptOpts = {
      title: "加载中...",
      mask: true, //防止触摸穿透
    };

    if (typeof params === "string") {
      dptOpts.title = params;
    } else if (typeof params === "object") {
      dptOpts = {
        ...dptOpts,
        ...params,
      };
    }

    return Taro.showLoading(dptOpts);
  },

  hideLoading: () => {
    Taro.hideLoading();
  },

  /**
   * @description 消息提示框
   */
  showToast: (params) => {
    let dptOption = {
      title: "消息提示框",
      icon: "none",
      mask: true,
      duration: 3000,
    };

    if (typeof params === "string") {
      dptOption.title = params;
    } else if (typeof params === "object") {
      dptOption = {
        ...dptOption,
        ...params,
      };
    } else {
      throw new Error("参数类型错误，应传入字符串或对象");
    }

    return Taro.showToast(dptOption);
  },

  /**
   *
   * @description 封装路由跳转
   * @param url 页面路径
   * @param data 页面参数
   */
  navigateTo: ({ url, data }) => {
    const searchStr = objectToString(data);
    return Taro.navigateTo({
      url: `${url}?${searchStr}`,
    });
  },

  /**
   * @description 缓存
   * @param time 缓存有效时间, 单位有效时间
   */

  setStorageSyncWithTime: (key, value, time) => {
    try {
      const curTime = Date.now();
      const expireTime = curTime + time * 1000; // time单位为秒，因此要*1000转换为毫秒

      Taro.setStorageSync(key, {
        [key]: value,
        expireTime,
      });
    } catch (err) {
      console.log("setStorageSyncWithTime", err);
    }
  },
  getStorageSyncWithTime: (key) => {
    try {
      const result = Taro.getStorageSync(key);
      const { expireTime } = result;
      if (Date.now() > expireTime) {
        // 已过期
        Taro.removeStorageSync(key);
      } else {
        return result[key];
      }
    } catch (error) {
      console.log("getStorageSyncWithTime", error);
    }
  },

  /**
   * @description 执行方法前，先判断是否需要重定向登录
   */

  doLogin: (fn) => {
    const user = tools.getStorageSyncWithTime("userInfo");
    if (!user?.userPhone) {
      tools.navigateTo({
        url: "/pages/login/login",
      });
    } else {
      fn?.();
    }
  },

  isAlipay: Taro.ENV_TYPE.ALIPAY === Taro.getEnv(),
  isH5: Taro.ENV_TYPE.WEB === Taro.getEnv(),
};

export default tools;
