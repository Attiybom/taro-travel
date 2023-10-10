import Taro from "@tarojs/taro";
import dayjs from "dayjs";
import { View, SwiperItem, Swiper, Image, Button, Text } from "@tarojs/components";
import "./index.scss";

// 第三方库
// import dayjs from 'dayjs'

// 组件
import TabContent from "../../../components/Tab";
import NoExploit from "../../../components/NoExploit";

// api
import { adsReq } from "@/common/api";
import { useEffect, useState } from "react";

// store
import { connect } from 'react-redux'


// 默认值
const INIT_TABS = [
  {
    label: "单程",
    id: 0,
  },
  {
    label: "多程",
    id: 1,
  },
  {
    label: "往返",
    id: 2,
  },
];




function FlightContent(props) {
  const { arrCityName, dptCityName, dispatch, dptDate } = props
  const [adList, setAdList] = useState([])

  function handleTabClick(id) {
    console.log("id", id);
  }

  // 获取轮播图
  function getAds() {
    adsReq().then((res) => {
      // console.log('getAds', res)
      setAdList(res.result)
    })
  }


  // 点击城市
  function handleChooseCity(type) {
    // console.log('type',type)
    dispatch({
      type: 'flightIndex/updateState',
      payload: {
        cityType: type
      }
    })
    // 跳转
    // 使用app.config.js中注册的绝对路径，需要加/
    Taro.navigateTo({
      url: '/pages/airportList/airportList'
    })
  }

  // 点击日期
  function handleChooseFlightDate() {
    Taro.navigateTo({
      url: '/pages/calendar/calendar'
    })
  }


  useEffect(() => {
    getAds()
  }, [])

  return (
    <View className="flight-container">
      <View className="flight-top">
        <TabContent
          tabList={INIT_TABS}
          onTabClick={handleTabClick}
          className="flight-index-tab"
        >
          {/* 选项卡内容-插槽 */}
          {/* 测试app.scss 全局样式*/
          /* <SwiperItem className="color-red">111</SwiperItem> */}
          <SwiperItem>
            <View className="item station">
              <View className="cell from" onClick={() => handleChooseCity('depart')}>{ dptCityName}</View>
              <Text className="iconfont icon-zhihuan"></Text>
              <View className="cell to" onClick={() => handleChooseCity('arrive')}>{arrCityName }</View>
            </View>
            <View className="item date" onClick={() => handleChooseFlightDate()}>
              { dayjs(dptDate).format('M月D日')}
            </View>
            <Button className="search-btn">搜索</Button>
          </SwiperItem>
          <SwiperItem>
            <NoExploit className="no-data"></NoExploit>
          </SwiperItem>
          <SwiperItem>
            <NoExploit className="no-data"></NoExploit>
          </SwiperItem>
        </TabContent>
      </View>
      {/* 图片轮播 */}
      <Swiper className="advs-banner-bd" autoplay>
        {adList.map((img) => (
          <SwiperItem key={img.id} className="item">
            <Image className="img" src={img.imgUrl}></Image>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
}


const mapStoreToProps = store => store.flightIndex

export default connect(mapStoreToProps)(FlightContent)
