import { View, ScrollView } from "@tarojs/components";
import { useEffect, useState } from "react";

import tools from "@/common/tools";

//样式
import "./airportList.scss";

//api
import { airportListReq } from "@/common/api";

//常量
import { ERR_MSG } from "@/common/constant";

//组件
import CityItem from "./component/CityItem";

export default function AirportList() {
  // 城市列表数据对象
  const [cityListObj, setCityListObj] = useState({});
  // 城市列表数据
  const [letterList, setLetterList] = useState([]);

  function formatList(list = []) {
    const obj = {};
    if (list?.length) {
      list.forEach((item) => {
        const { firstLetter } = item;
        if (!obj[firstLetter]) {
          obj[firstLetter] = [];
        }
        obj[firstLetter].push(item);
      });
    }
    return obj;
  }

  // 获取城市列表数据
  function getAirportList() {
    tools.showLoading()
    const flightCityListFromStorage = tools.getStorageSyncWithTime('flightCityList') || []
    if (!flightCityListFromStorage.length) {
      airportListReq()
        .then((res) => {
          const { result } = res;
          tools.setStorageSyncWithTime('flightCityList', result, 60 * 60 * 24 * 7)
          // tools.setStorageSyncWithTime('flightCityList', result, 20)
          const listObj = formatList(result);
          setCityListObj(listObj);
          setLetterList(Object.keys(listObj));
        // console.log("airportListReq_res", res);
        })
        .catch((err) => {
          tools.showToast(ERR_MSG);
          console.log("err", err);
        })
        .finally(() => {
          tools.hideLoading();
        });
    } else {
      const listObj = formatList(flightCityListFromStorage);
      setCityListObj(listObj);
      setLetterList(Object.keys(listObj));
      tools.hideLoading()
    }

  }

  // 点击右侧字母表
  const [currentLetter, setCurrentLetter] = useState("");
  function handleClickLetter(letter) {
    setCurrentLetter(letter);
  }

  useEffect(() => {
    getAirportList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="airport-list-container">
      <ScrollView
        scrollY
        scrollAnimationDuration={!tools.isAlipay}
        style={{ height: `100vh` }}
        scrollIntoView={currentLetter}
      >
        {/* 左侧城市列表 */}
        {letterList.map((item) => {
          const cityList = cityListObj[item];
          return (
            <CityItem cityList={cityList} key={item} label={item}></CityItem>
          );
        })}
      </ScrollView>
      {/* 右侧字母表 */}
      <View className="letter-container">
        {letterList.map((item) => (
          <View
            onClick={() => handleClickLetter(item)}
            className="letter-item"
            key={item}
          >
            {item}
          </View>
        ))}
      </View>
    </View>
  );
}
