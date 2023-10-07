/**
 * @description 广告的接口文件
 */

const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
//

const MOCK_IMG = [
  "https://th.bing.com/th?id=OIP.Chh6O-1fhahYH0uBytAD9gHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
  "https://th.bing.com/th?id=OIP.rNIcMY3-JcKsSLcZztIhPAHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
];

const createTable = async () => {
  /**
   *  @deprecated auto_increment 自增键
   */
  try {
    const createTableSql = `
    create table if not exists ads (
      id int auto_increment,
      imgUrl char(255) not null,
      primary key (id)
    ) engine=innodb;
    `;
    await sqlQuery(createTableSql);
    for (let i = 0; i < MOCK_IMG.length; i++) {
      const insertSql = `insert into ads(id, imgUrl) values(null, '${MOCK_IMG[i]}')`;
      await sqlQuery(insertSql);
    }
  } catch (error) {
    console.log("createTableSql", error);
  }
};
createTable();

// 注册路由
router.get("/advertising", async (req, res) => {
  const strSql = `select * from ads`;
  try {
    const result = await sqlQuery(strSql);
    res.send({
      code: 1,
      message: "请求成功",
      result,
    });
  } catch (error) {
    res.send({
      code: 1,
      message: "失败",
    });
  }
});

module.exports = router;
