const express = require("express");

module.exports = (app) => {
  // path 路径
  // callback 回调
  app.use("/ads", require("./ads"));
};
