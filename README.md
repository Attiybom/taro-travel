# 微信小程序打开
执行dev:weapp => 打包生成对应的原生小程序文件(dist文件夹)
再通过微信小程序打开打包后的文件夹，可以查看项目

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
