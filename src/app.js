import { Component } from "react";
import "./app.scss";

// 引入dva全局状态管理
import createApp from "./dva";
import models from "./models";

import { Provider } from "react-redux";

const dvaApp = createApp({
  initState: {}, //初始值
  models, //模块
});
const store = dvaApp.getStore();
class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
