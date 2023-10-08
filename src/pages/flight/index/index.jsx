import { View, SwiperItem, Swiper, Image } from "@tarojs/components";
import "./index.scss";

// 第三方库
// import dayjs from 'dayjs'

// 组件
import TabContent from "../../../components/Tab";
import NoExploit from "../../../components/NoExploit";

// api
import { adsReq } from "@/common/api";
import { useEffect, useState } from "react";

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

export default function FlightContent() {

  const [adList, setAdList] = useState([])

  function handleTabClick(id) {
    console.log("id", id);
  }

  function getAds() {
    adsReq().then((res) => {
      console.log('getAds', res)
      setAdList(res.result)
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
