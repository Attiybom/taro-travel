// eslint-disable-next-line import/no-commonjs
const express = require("express");

const app = express();

const models = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

models(app);

app.listen(3000, () => {
  console.log("taro-express-server running in 3000");
});
