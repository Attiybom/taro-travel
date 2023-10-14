const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.post("/login", async (req, res) => {
  try {
    // req.body
    const { nickName, userPhone, password } = req.body;
    // 如果表不存在则创表
    const createTableSql = `
    create table if not exists user_table (
      id int auto_increment,
      userPhone char(11) not null,
      password char(10) not null,
      nickName char(50) not null,
      primary key (id)
    ) engine=innodb;
    `;
    await sqlQuery(createTableSql);

    // 查询
    const sqlStr = `select userPhone from user_table where userPhone=${userPhone}`;
    const result = await sqlQuery(sqlStr);
    if (result.length) {
      // 有对应的用户数据 => 登录操作
      const getUserInfoSql = `select nickName, password from user_table where userPhone=${userPhone}`;
      const userInfoRes = await sqlQuery(getUserInfoSql);
      if (userInfoRes.length && userInfoRes[0].password === password) {
        // 信息对的上
        // 登录成功
        if (nickName !== userInfoRes[0]["nickName"]) {
          const updateSql = `update user_table set nickName='${nickName}' where userPhone=${userPhone}`;
          await sqlQuery(updateSql);
        }
        res.send({
          code: 1,
          mes: "登录成功",
          result: {
            nickName,
            userPhone,
          },
        });
      } else {
        res.send({
          code: 2,
          mes: "密码错误",
        });
      }
    } else {
      // 注册流程
      const insertSql = `insert into user_table(id, nickName, userPhone, password) values (null, '${nickName}',  '${userPhone}', '${password}')`;
      await sqlQuery(insertSql);
      res.send({
        code: 1,
        mes: "注册且登录成功",
        result: {
          nickName,
          userPhone,
        },
      });
    }
  } catch (error) {
    console.log("login-error", error);
    res.send({
      code: -1,
      mes: "登录失败",
      result: error,
    });
  }
});

module.exports = router;
