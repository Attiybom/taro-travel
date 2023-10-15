import { defineConfig } from '@tarojs/cli'
import path from "path";

import devConfig from "./dev";
import prodConfig from "./prod";

// 获取当前客户端类型
const TARO_ENV = process.env.TARO_ENV

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
// eslint-disable-next-line no-unused-vars
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: "taro_demo",
    date: "2023-10-3",
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    // 编译输出的路径
    outputRoot: `dist/${TARO_ENV}`,
    plugins: [],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: "react",
    compiler: { type: "webpack5", prebundle: { enable: false } },
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    sass: {
      // 设置全局样式变量
      data: `$primaryColor: '#0080ff';`,
    },
    alias: {
      // 设置路径
      "@/components": path.resolve(__dirname, "..", "src/components"),
      "@/common": path.resolve(__dirname, "..", "src/common"),
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 1024, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    h5: {
      esnextModules: ["taro-ui", "taro-skeleton"],
      publicPath: "/",
      staticDirectory: "static",
      output: {
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].js",
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };
  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
