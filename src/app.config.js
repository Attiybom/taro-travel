// eslint-disable-next-line no-undef
export default defineAppConfig({
  /**
   * @description pages 添加页面路由
   */
  pages: [
    "pages/index/index",
    "pages/order/order",
    "pages/airportList/airportList",
    "pages/calendar/calendar",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "彼岸",
    navigationBarTextStyle: "black",
  },
  /**
   * @description tabBar => 底部导航栏
   */
  tabBar: {
    color: "#7F8389", // 默认颜色
    selectedColor: "#07c160",
    borderStyle: "black",
    backgroundColor: "#fff",
    list: [
      //对应的路由
      {
        pagePath: "pages/index/index",
        iconPath: "assets/images/index-unselected.png",
        selectedIconPath: "assets/images/index-selected.png",
        text: "首页",
      },
      {
        pagePath: "pages/order/order",
        iconPath: "assets/images/order-unselected.png",
        selectedIconPath: "assets/images/order-selected.png",
        text: "我的订单",
      },
    ],
  },
  permission: {
    "scope.userLocation": {
      desc: "为了更好的服务体验，我们希望获取你的位置",
    },
  },
  // 解决bug: routeDone with a webviewId
  lazyCodeLoading: "requiredComponents",
});
