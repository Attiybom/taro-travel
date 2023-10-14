const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.post("/order", async (req, res) => {
  try {
    const { userPhone, orderInfo } = req.body;
    const { dptCityName, arrCityName, dptTimeStr, dptTime, price } = orderInfo;

    const createOrderTableSql = `
      create table if not exists order_list (
        id int auto_increment,
        userPhone char(11) not null,
        dptCityName char(50) not null,
        arrCityName char(50) not null,
        dptTimeStr char(50) not null,
        dptTime char(50) not null,
        price decimal not null,
        primary key (id)
      ) engine=innodb;
    `;
    await sqlQuery(createOrderTableSql);
    console.log("sss");
    // 插入数据
    const insertSql = `insert into order_list(id, userPhone, dptCityName, arrCityName, dptTimeStr, dptTime, price) values (null, '${userPhone}', '${dptCityName}', '${arrCityName}', '${dptTimeStr}', '${dptTime}', '${price}')`;

    await sqlQuery(insertSql);

    res.send({
      code: 1,
      mes: "预定成功！",
    });
  } catch (error) {
    console.log("orderList", error);
    res.send({
      code: -1,
      mes: "请求失败",
      result: error,
    });
  }
});

module.exports = router;
