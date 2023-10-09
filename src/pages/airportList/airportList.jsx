import { View } from "@tarojs/components";
import { useEffect } from "react";

import tools from "@/common/tools";

//样式
import "./airportList.scss";

//api
import { airportListReq } from "@/common/api";

//常量
import { ERR_MSG } from "@/common/constant";

export default function AirportList() {
  function getAirportList() {
    airportListReq()
      .then((res) => {
        tools.showLoading();
        console.log("airportListReq_res", res);
      })
      .catch((err) => {
        tools.showToast(ERR_MSG);
        console.log("err", err);
      })
      .finally(() => {
        tools.hideLoading();
      });
  }

  useEffect(() => {
    console.log("eee");
    getAirportList();
  }, []);

  return <View className="airport-list-container">城市列表</View>;
}
