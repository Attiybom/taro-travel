import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";

import "./index.scss";

// 状态管理
import { connect } from "react-redux";
// @connect((store) => {
//   console.log('connect', store)
//   return store.flightIndex
// })

function CityItem(props) {
  // cityList: 每个字母所包含的城市列表
  // label: 字母
  const { cityList, label } = props;
  // console.log("CityItemProps", props);

  function handleClickCity(cityInfo) {
    const { cityType, dispatch } = props; // cityType判断是出发城市还是目标城市 depart: 出发， arrive：到达
    const { airportName, cityId, cityName } = cityInfo;

    // 更新城市数据
    dispatch({
      type: "flightIndex/updateState",
      payload:
        cityType === "depart"
          ? {
            dptCityId: cityId,
            dptAirportName: airportName,
            dptCityName: cityName,
          }
          : {
            arrCityId: cityId,
            arrAirportName: airportName,
            arrCityName: cityName,
          },
    });

    // 返回之前页
    Taro.navigateBack()
  }

  return (
    <View className="list-item" id={label}>
      <Text className="label">{label}</Text>
      {cityList.map((item) => (
        <View
          className="name"
          key={item.id}
          onClick={() => handleClickCity(item)}
        >{`${item.cityName} (${item.airportName})`}</View>
      ))}
    </View>
  );
}

const mapStateToProps = (store) => {
  return store.flightIndex;
};

export default connect(mapStateToProps)(CityItem);
