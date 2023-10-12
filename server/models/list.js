const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
const dayjs = require("dayjs");

/**
 * 得到一个两数之间的随机整数 - 模拟机票价格
 */
const randomPrice = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
};

// const request = require("request");
/**
 * 创建机票列表mysql
 */

// request(
//   "https://www.brown77.cn/list/singleList",
//   { json: true },
//   async (err, res, body) => {
//     const createFlightTableSql = `
//      create table flight_list(
//       id INT PRIMARY KEY,
//       arrTime DATETIME,
//       airCompanyName VARCHAR(255),
//       airIcon VARCHAR(255),
//       price DECIMAL(10,2),
//       dptTimeStr VARCHAR(10),
//       arrTimeStr VARCHAR(10)
//      ) engine=innodb;
//     `;

//     await sqlQuery(`drop table if exists flight_list`);
//     await sqlQuery(createFlightTableSql);
//     for (let i = 0; i < body.result.length; i++) {
//       const {
//         id,
//         arrTime,
//         airCompanyName,
//         airIcon,
//         price,
//         dptTimeStr,
//         arrTimeStr,
//       } = body.result[i];
//       const insertFlightDataSql = `
//       INSERT INTO flight_list(id, arrTime, airCompanyName, airIcon, price, dptTimeStr, arrTimeStr)
//       VALUES (${id}, STR_TO_DATE('${arrTime}', '%Y-%m-%dT%H:%i:%s.000Z'), '${airCompanyName}', '${airIcon}', ${price}, '${dptTimeStr}', '${arrTimeStr}');
//     `;
//       await sqlQuery(insertFlightDataSql);
//     }
//   }
// );

router.get("/singleList", async (req, res) => {
  // param from req.query
  const { dptAirportName, dptCityName, arrCityName, arrAirportName, dptDate } =
    req.query;

  const strSql = `select * from flight_list`;
  try {
    const result = await sqlQuery(strSql);
    const resultList = result.map((item) => {
      return {
        ...item,
        dptAirportName,
        dptCityName,
        arrCityName,
        arrAirportName,
        dptTime: dptDate, //模拟日期选择
        price: randomPrice(300, 1000),
        dptTimeStr: dayjs(item.dptTime).format("HH:mm"),
        arrTimeStr: dayjs(item.arrTime).format("HH:mm"),
      };
    });
    res.send({
      code: 1,
      message: "请求成功",
      result: resultList,
    });
  } catch (error) {
    res.send({
      code: -1,
      message: "请求失败",
    });
  }
});

module.exports = router;
