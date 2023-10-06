// eslint-disable-next-line import/no-commonjs
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("taro-express-server start!");
});
