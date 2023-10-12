import { create } from "dva-core";

let app; // dva实例
let store; // 维持项目所有的state树的对象
let dispatch; // 改变store中state的唯一方法

const createApp = (options) => {
  // 创建app实例
  app = create(options);
  // 确保所有state模块(modal)只注册一次
  if (!global.registered) {
    options.models.forEach((model) => app.model(model));
  }
  global.registered = true;

  // 运行程序
  app.start();
  store = app._store;
  // 用函数返回store，确保每一次store都是新的一个
  app.getStore = () => store;
  dispatch = store.dispatch;
  app.dispatch = dispatch;

  return app;
};

export default createApp;
