const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
// const request = require("request");
// const tools = require("../../src/common/tools");
/**
 * 创建机场城市列表mysql
 */

// request(
//   "https://www.brown77.cn/city/airportList",
//   { json: true },
//   async (err, res, body) => {
//     const createAirportTableSql = `
//      create table airport_list(
//       id int not null auto_increment,
//       cityName char(50) not null,
//       cityId int not null,
//       firstLetter char(50) not null,
//       airportName char(50) not null,
//       primary key (id)
//      ) engine=innodb;
//     `;

//     await sqlQuery(`drop table if exists airport_list`);
//     await sqlQuery(createAirportTableSql);
//     for (let i = 0; i < body.result.length; i++) {
//       const { id, cityId, firstLetter, airportName, cityName } = body.result[i];
//       const insertAirportDataSql = `
//       insert into airport_list(id, cityName, cityId, firstLetter, airportName) values (${id}, '${cityName}', ${cityId}, '${firstLetter}', '${airportName}')
//     `;
//       await sqlQuery(insertAirportDataSql);
//     }
//   }
// );

router.get("/airportList", async (req, res) => {
  const queryAirportSql = `select * from airport_list`;
  try {
    const result = await sqlQuery(queryAirportSql);
    res.send({
      code: 1,
      msg: "请求成功",
      result,
    });
  } catch (error) {
    console.log('error', error)
    res.send({
      code: -1,
      msg: "请求失败",
      error
    });
  }

});

module.exports = router;
