module.exports = (app) => {
  // path 路径
  // callback 回调
  app.use("/ads", require("./ads"));
  app.use("/city", require("./airportList"));
  app.use("/airTicket", require("./list"));
  app.use(require("./login"));
  app.use("/order", require("./orderList"));
};
