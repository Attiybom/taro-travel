import { Text, View } from "@tarojs/components";

import "./index.scss";

export default function CityItem(props) {
  // cityList: 每个字母所包含的城市列表
  // label: 字母
  const { cityList, label } = props;

  return (
    <View className="list-item" id={label}>
      <Text className="label">{label}</Text>
      {cityList.map((item) => (
        <View
          className="name"
          key={item.id}
        >{`${item.cityName} (${item.airportName})`}</View>
      ))}
    </View>
  );
}
