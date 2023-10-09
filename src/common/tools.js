import Taro from "@tarojs/taro";

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
};

export default tools;
