module.exports = (app) => {
  // path 路径
  // callback 回调
  app.use("/ads", require("./ads"));
  app.use("/city", require("./airportList"));
  app.use("/airTicket", require("./list"));
};
