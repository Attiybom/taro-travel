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

# 全局样式设置
## 方式一: webpack（config文件夹）中设置
1. config 文件夹下的index文件
2. baseConfig 对象中 添加sass 对象设置
```js
    sass: {
      // 设置全局样式变量
      data: `$primaryColor: '#0080ff';`,
    },
```
3. 重新配置

## 方式二: app.scss 文件中设置
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

# 全局状态管理
* 库：dva.js
* src/dva.js
* 模块管理 => src/models
