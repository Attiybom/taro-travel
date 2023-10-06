import { View, SwiperItem, Swiper, Image } from "@tarojs/components";
import "./index.scss";

// 第三方库
// import dayjs from 'dayjs'

// 组件
import TabContent from "../../../components/Tab";
import NoExploit from "../../../components/NoExploit";

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

// 图片mock
const MOCK_IMG = [
  `https://th.bing.com/th?id=OIP.Chh6O-1fhahYH0uBytAD9gHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2`,
  `https://th.bing.com/th?id=OIP.rNIcMY3-JcKsSLcZztIhPAHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2`,
];

export default function FlightContent() {
  function handleTabClick(id) {
    console.log("id", id);
  }

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
        {MOCK_IMG.map((img) => (
          <SwiperItem key={img} className="item">
            <Image className="img" src={img}></Image>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
}
