# 微信小程序打开
1. 执行dev:weapp => 打包生成对应的原生小程序文件(dist文件夹)
2. 再通过微信小程序打开打包后的文件夹，可以查看项目1.
3. 每次更新代码，微信小程序需要重新编译才能更新
# 打包后出现的bug
```js
Error: module 'vendors-node_modules_taro_weapp_prebundle_react-dom_js.js' is not defined, require args is './vendors-node_modules_taro_weapp_prebundle_react-dom_js.js'
```
* 解决方案
在./config/index文件中，
```js
    // 原本
    compiler: 'webpack5',
    // 改后
    compiler: { type: "webpack5", prebundle: { enable: false } },
```

# 全局设置
## 全局样式设置
### 方式一: webpack（config文件夹）中设置
1. config 文件夹下的index文件
2. baseConfig 对象中 添加sass 对象设置
```js
    sass: {
      // 设置全局样式变量
      data: `$primaryColor: '#0080ff';`,
    },
```
3. 重新配置

### 方式二: app.scss 文件中设置
```js
// 配置
// app.scss
.color-red {
  color: red;
}
// 使用
// flight => tab => index
<SwiperItem className="color-red">111</SwiperItem>
```

## 全局路径配置
```js
// vscode 配置 - jsconfig.js
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["./src/components/*"],
      "@/common/*": ["./src/common/*"]
    }
```

## 装饰器配置
```js
// vscode 配置 jsconfig.json
    "experimentalDecorators": true, //加上
// eslint 配置

"parserOptions": {
  "ecmaFeatures" : {
    "legacyDecorators": true, // 允许使用修饰符
  }
}

```

# 全局状态管理
* 库：dva.js
* dva实例注册 => src/dva.js => export default createApp
* 模块管理 => src/models => index 统一导出models数组
* app引入
```js
import { Provide } from 'react-redux'
import createApp from './src/dva.js'
import models from './src/models'

const store = createApp({
  initialState: {},
  models
})
```
* store属性提供 配置
```js
import {connect} from 'react-redux'

const mapStoreToProps = store => store.flightIndex
export default connect(mapStoreToProps)(FlightContent)
```


## Taro 路由
### 封装路由跳转方法


## taro-ui配置
* 安装taro-ui
* h5常见问题: You may need an appropriate loader to handle this file type
需要在 config/index.js 文件中添加如下配置项：
```js
// config/index.js
h5: {
  esnextModules: ['taro-ui']
}
```

## 微信地址获取（todo）
### 微信逆地址解析

## 页面分享功能
1. 右上角菜单“转发”
2. Button组件openType='share'
3. 在当前页面设置onShareAppMessage
* onShareAppMessage只有在页面才能触发，组件无法触发
```js
// 封装装饰器实现页面分享功能

const withShare = (opts) => {
  // 返回react高阶组件
  /**
   * WrapperComponent withShare包裹的组件
   * @{param}
   */
  return (WrapperComponent) => {
    class MyComponent extends WrapperComponent {
      onShareAppMessage() {
        console.log(this.props);
        return {
          ...opts,
          path: `/${this.props.tid}`,
        };
      }
    }

    return MyComponent;
  };
};

export default withShare;

```


## 微信小程序登录
参考 小程序登录文档： https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
### 登录接口 - 参数解析
```js
// express 新增两个中间件

// 当请求体content-type 时application/json时,并映射到req.body上

app.use(express.json());
// 当请求体content-type 时application/x-www-form-urlencoded时
app.use(express.urlencoded({ extended: false }));


```
### 登录接口设计
1. 创建mysql表
2. 用户输入相关信息，接受并对比数据库中是否存在
  *  如果存在，则说明登录操作 => 登录成功/失败
  *  如果不村子，则说明注册操作 => 提示
3. 登录成功后，将用户信息存到storage中 => setStorageSync
4. 后续操作需要从storage中获取信息并携带过去 => getStorageSync
5. 最后removeStorageSync
