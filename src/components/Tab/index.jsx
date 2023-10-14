import { useEffect, useState } from "react";
import "./index.scss";
import { View, Swiper } from "@tarojs/components";

export default function TabContent({
  className = "",
  tabList = [],
  initTab = null,
  onTabClick = () => {
    console.log('onTabClick is not exist')
  },
  children = [],
}) {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    if (initTab == null) {
      setCurrentId(tabList[0]["id"]);
    } else {
      setCurrentId(initTab);
    }
  }, [initTab, tabList]);

  // 下划线动态样式
  const innerStyle = {
    width: `${100 / tabList.length}%`,
    transform: `translateX(${currentId * 100}%)`,
  };

  // 选项卡滑动
  function handleClick(id) {
    setCurrentId(id);
    onTabClick(id);
  }

  // 选项卡内容容器滑动
  function handleSwiperChange(e) {
    // console.log("e", e);
    const id = e.detail.current;
    handleClick(id);
  }

  return (
    <View className={`tab-container ${className}`}>
      <View className="tab-bar">
        {tabList?.map((tab) => {
          return <View
            key={tab.id}
            className={`tab-item ${currentId === tab.id ? "active" : ""}`}
            onClick={() => handleClick(tab.id)}
          >
            {tab.label}
          </View>
        })}
        {/* 下划线 */}
        <View className="scroll-bar" style={innerStyle}></View>
      </View>
      <Swiper
        current={currentId}
        className="tab-content"
        onChange={handleSwiperChange}
      >
        {children}
      </Swiper>
    </View>
  );
}
