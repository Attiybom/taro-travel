import { View, ScrollView } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";

import './list.scss'

import { formatDateList } from "@/common/utils";
import { useEffect, useState } from "react";

export default function FLightList() {
  // 航班信息
  const [flightData, setFlightData] = useState({})
  // 日期信息
  const [dateList, setDateList] = useState([])

  useEffect(() => {

    console.log('flightList', getCurrentInstance())

    // 获取路由参数并存储
    const { params } = getCurrentInstance().router
    const {
      arrAirportName,
      arrCityId,
      arrCityName,
      cityType,
      dptAirportName,
      dptCityId,
      dptCityName,
      dptDate } = params
    setFlightData({
      arrAirportName,
      arrCityId,
      arrCityName,
      cityType,
      dptAirportName,
      dptCityId,
      dptCityName,
      dptDate
    })

    // 修改页面标题
    Taro.setNavigationBarTitle({
      title: `${dptCityName} - ${arrCityName}`
    })

    // 设置顶部日历信息
    setDateList(formatDateList())
    console.log('sss')
  }, [])

  // 用户点击选择日期
  function chooseDate(date) {
    console.log('chooseDate', date)
    setFlightData({
      ...flightData,
      dptDate: date
    })
  }

  return <View className="list-container">
    <View  className="calendar-list">
      <ScrollView             className="calendar-scroll-list"
        scrollX
        scrollWithAnimation
        scrollIntoView={`date-${flightData.dptDate}`}
      >
        {
          dateList.map(date => (
            <View
              key={date.dateStr}
              className={`item ${
                date.dateStr === flightData.dptDate ? "cur" : ""
              }`}
              id={`date-${date.dateStr}`}
              onClick={() => chooseDate(date.dateStr)}
            >
              <View className="date">{ date.day }</View>
              <View className="week">{ date.week }</View>
            </View>
          ))
        }
      </ScrollView>
    </View>
  </View>
}
