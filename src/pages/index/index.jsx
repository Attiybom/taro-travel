import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useState } from "react";

// 组件
import FlightContent from "../flight/index";
import NoExploit from "../../components/NoExploit/index";

const DEFAULT_TAB_LIST = [
  { title: "机票", tab: "flight", index: 0 },
  { title: "火车票", tab: "train", index: 1 },
  { title: "酒店", tab: "hotel", index: 2 },
  { title: "汽车票", tab: "bus", index: 3 },
];

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  // 动态切换tab，激活
  const [tabIndex, setTabIndex] = useState(0);
  function handleSwitchTabIndex(index) {
    setTabIndex(index);
    console.log("index", tabIndex);
  }
  // 滑块样式
  const innerStyle = {
    width: `${100 / DEFAULT_TAB_LIST.length}%`,
    transform: `translateX(${tabIndex * 100}%)`,
  };

  return (
    <View className="index-container">
      <View className="top">
        <View className="index-tab">
          {DEFAULT_TAB_LIST.map((item) => (
            <View
              className={`index_tab_item ${item.tab} ${
                tabIndex === item.index ? "current" : ""
              }`}
              key={item.tab}
              onClick={() => handleSwitchTabIndex(item.index)}
            >
              {item.title}
            </View>
          ))}
          {/* 滑块 */}
          <View className="scrollbar" style={innerStyle}></View>
        </View>
      </View>
      {/* 根据tab动态显示内容，类似于后台管理系统中的content主体内容区域 */}
      {DEFAULT_TAB_LIST[tabIndex]["tab"] === "flight" ? (
        <FlightContent></FlightContent>
      ) : (
        <NoExploit></NoExploit>
      )}
    </View>
  );
}
