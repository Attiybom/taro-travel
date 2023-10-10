import { AtCalendar } from "taro-ui";
import "./calendar.scss";
import { View } from "@tarojs/components";
import { connect } from "react-redux";

import { MIN_DATE, MAX_DATE } from "@/common/constant";
import Taro from "@tarojs/taro";

function Calendar(props) {
  const { dptDate, dispatch } = props;

  function handleChooseDate(date) {
    console.log("date", date);
    console.log("dispatch", dispatch);
    const { start } = date.value;
    dispatch({
      type: "flightIndex/updateState",
      payload: {
        dptDate: start,
      },
    });
    Taro.navigateBack();
  }

  return (
    <View className="calendar-page">
      <AtCalendar
        currentDate={dptDate}
        maxDate={MAX_DATE}
        minDate={MIN_DATE}
        onSelectDate={handleChooseDate}
      ></AtCalendar>
    </View>
  );
}

const mapStoreToProps = (store) => store.flightIndex;

export default connect(mapStoreToProps)(Calendar);
