import { useEffect, useState } from "react";
import "./index.scss";
import { View } from "@tarojs/components";

export default function TabContent({
  className = "",
  tabList = [],
  initTab = "",
  onTabClick = null,
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

  function handleClick(id) {
    setCurrentId(id);
    onTabClick(id);
  }

  return (
    <View className={`tab-container ${className}`}>
      <View className="tab-bar">
        {tabList?.map((tab) => (
          <View
            key={tab.id}
            className="tab-item"
            onClick={() => handleClick(tab.id)}
          >
            {tab.label}
          </View>
        ))}
      </View>

      {/* 下划线 */}
      <View className="scroll-bar" style={innerStyle}></View>
    </View>
  );
}
