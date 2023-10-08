const mysql = require("mysql2");

const options = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "taro-express-mysql",
};

// 创建数据库链接
const connection = mysql.createConnection(options);
connection.connect((err) => {
  if (err) {
    console.log("mysql-error:", err);
    return;
  }
  console.log("数据库链接成功！");
});

// 执行mysql查询命令
// connection.query("SELECT * FROM user_table", (err, res, fields) => {
//   console.log("mysql-res", res);
// });

/**
 *
 * @description 封装mysql查询方法
 */

const sqlQuery = (strSQL) => {
  return new Promise((resolve, reject) => {
    connection.query(strSQL, (err, res, fields) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(res);
    });
  });
};

module.exports = sqlQuery;
