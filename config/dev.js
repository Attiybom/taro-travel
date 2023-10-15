
export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {
    devServer: {
      proxy: [
        {
          context: ["/"], // 代理本地所有接口
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      ],
    },
  },
};
