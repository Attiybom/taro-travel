const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
// const request = require("require");
const tools = require("../../src/common/tools");
/**
 * 创建机场城市列表mysql
 */

// request(
//   "https://www.brown77.cn/city/airportList",
//   { json: true },
//   async (err, res, body) => {
//     const createAirportTableSql = `
//      create table airport_list(
//       id int not null auto_increment
//       cityName char(50) not null
//       cityId int not null
//       firstLetter char(50) not null
//       airportName char(50) not null
//       primary key (id)
//      ) engine=innodb;
//     `;

//     await sqlQuery(`drop table if exists airport_list`);
//     await sqlQuery(createAirportTableSql);
//     for (let i = 0; i < body.result.length; i++) {
//       const { id, cityId, firstLetter, airportName } = body.result[i];
//       const insertAirportDataSql = `
//       insert into airport_list(id, cityName, cityId, firstLetter, airportName) values (${id}, '${cityName}', ${cityId}, '${firstLetter}', '${airportName}')
//     `;
//       await sqlQuery(insertAirportDataSql);
//     }
//   }
// );
const CITY_URL = "https://www.brown77.cn/city/airportList";
const cityDataReq = (data) =>
  tools.request({
    url: CITY_URL,
    params: data,
  });
const cityData = cityDataReq();
console.log("cityData", cityData);

// const createTable = async () => {
//   /**
//    *  @deprecated auto_increment 自增键
//    */
//   try {
//     const createTableSql = `
//     create table airport_list(
//       id int not null auto_increment
//       cityName char(50) not null
//       cityId int not null
//       firstLetter char(50) not null
//       airportName char(50) not null
//       primary key (id)
//      ) engine=innodb;
//     `;
//     await sqlQuery(createTableSql);
//     for (let i = 0; i < MOCK_IMG.length; i++) {
//       const insertSql = `insert into ads(id, imgUrl) values(null, '${MOCK_IMG[i]}')`;
//       await sqlQuery(insertSql);
//     }
//   } catch (error) {
//     console.log("createTableSql", error);
//   }
// };
// createTable();

// router.get("/airportList", async (req, res) => {
//   const queryAirportSql = `select * from airport_list`;
//   try {
//     const res = await sqlQuery(queryAirportSql);
//     res.send({
//       code: 1,
//       msg: "请求成功",
//       res,
//     });
//   } catch (error) {
//     res.send({
//       code: -1,
//       msg: "请求失败",
//       res,
//     });
//   }
// });

// module.exports = router;
