import { View, SwiperItem } from "@tarojs/components";
import "./index.scss";

// 组件
import TabContent from "../../../components/Tab";

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
          <SwiperItem>111</SwiperItem>
          <SwiperItem>22</SwiperItem>
          <SwiperItem>33</SwiperItem>
        </TabContent>
      </View>
    </View>
  );
}
