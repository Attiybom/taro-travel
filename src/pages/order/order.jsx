import { View, Text, Button, SwiperItem, ScrollView } from "@tarojs/components";
import Taro, { useDidShow } from '@tarojs/taro'

import { connect } from 'react-redux'
import "./order.scss";
import { useEffect, useState } from "react";
import tools from "@/common/tools";

// api
import { getOrderListReq } from "@/common/api";
import TabContent from "@/components/Tab";
import NoExploit from "@/components/NoExploit";

import dayjs from "dayjs";



// @LoginDecorator
// @connect(({user}) => ({...user}))
// class Index extends React.PureComponent {


//   componentDidMount() {
//     console.log('props', this.props)
//   }

//   toLogin() {
//     console.log('toLogin')
//   }

//   handleLayout(dispatch) {
//     console.log('handleLayout', this.props, dispatch)
//     // try {
//     //   Taro.removeStorageSync('userInfo')
//     //   tools.showToast({
//     //     title: '操作成功！',
//     //     icon: 'loading',
//     //     duration: 1000
//     //   })

//     // } catch (error) {
//     //   tools.showToast('操作失败')
//     // }
//   }


//   render() {
//     console.log('prop', this.props)

//     const { isLogin = true, nickName = '尚未登录', dispatch = '' } = this.props = {}
//     console.log('dispatch', dispatch, '---')

//     return isLogin ? <View>
//       <View className="home-container">
//         <View className="user-box">
//           <Text className="user-name">欢迎，{ nickName || '--'}</Text>
//           <Text className="login-out-btn" onClick={() => this.handleLayout(dispatch)}>退出</Text>
//         </View>
//       </View>

//     </View> :
//       ( <View className="no-login-container">
//         <Text className="txt">登录查看订单</Text>
//         <Button className="login-btn" onClick={this.toLogin}>
//      立即登录
//         </Button>
//       </View>)

//   }
// }


// export default Index

const INIT_TAB = [
  {
    label: '机票',
    id: 0
  },
  {
    label: '火车票',
    id: 1
  },
  {
    label: '酒店',
    id: 2
  },
  {
    label: '汽车票',
    id: 3
  },
]


function Index(props) {
  const { isLogin = false, nickName = '', userPhone } = props.user || {}

  const [orderList, setOrderList] = useState([])

  // 未登录 - 重定向
  useEffect(() => {
    if (!props.user.isLogin) {
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    }
  })

  // 获取用户订单列表
  // useEffect(() => {
  // getOrderList()
  // }, [])

  useDidShow(() => {
    getOrderList()
  })


  // 是否开启下拉刷新
  const [isRefresh, setIsRefresh] = useState(false)

  //
  function handlePullDownRefresh() {
    console.log('handlePullDownRefresh')
    setIsRefresh(true)
    getOrderList()
  }
  // 渲染机票
  const renderListItem = () => {
    return orderList?.length ?
      (<ScrollView
        scrollY
        style={{ height: `100%` }}
        className="order-list-box"
        refresherEnabled
        refresherTriggered={isRefresh}
        onRefresherRefresh={handlePullDownRefresh}
      >
        {orderList.map(order => {
          const { dptCityName, arrCityName, dptTime, dptTimeStr, id, price } = order
          return (
            <View className="item" key={id}>
              <View className="left">
                <View className="line">
                  <Text className="city-name">{dptCityName}</Text> -
                  <Text className="city-name">{arrCityName}</Text>
                  <View className="time">{`${dayjs(dptTime).format(
                    "YYYY-MM-DD"
                  )} ${dptTimeStr}`}</View>
                </View>
              </View>
              <View className="right">¥ {price}</View>
            </View>
          )
        })}
      </ScrollView>) :
      (<NoExploit content="暂无数据..."></NoExploit>)
  }

  // 获取订单列表
  function getOrderList() {
    tools.showLoading()
    getOrderListReq({ userPhone }).then(res => {
      setOrderList([...res.result])
    }).catch(err => {
      console.log('getOrderListErr', err)
    }).finally(() => {
      tools.hideLoading()
      setIsRefresh(false)
    })
  }

  // 退出登录
  function handleLogout() {
    console.log('handleLayout', props.dispatch)

    try {
      Taro.removeStorageSync('userInfo')
      tools.showToast({
        title: '操作成功！',
        icon: 'loading',
        duration: 1000
      })
      props.dispatch({
        type: 'user/logout'
      })
      console.log('props', props)
    } catch (error) {
      tools.showToast('操作失败！')
    }
  }

  // 跳转登录页
  function toLogin() {
    console.log('toLogin')
    tools.navigateTo({
      url: '/pages/login/login'
    })
  }

  return isLogin ? <View>
    <View className="home-container">
      <View className="user-box">
        <Text className="user-name">欢迎，{ nickName || '--'}</Text>
        <Text className="login-out-btn" onClick={() => handleLogout()}>退出</Text>
      </View>

      <TabContent tabList={INIT_TAB} className="tab">
        {
          INIT_TAB.map(tab => (
            <SwiperItem key={tab.id}>
              { tab.id === 0 ? (renderListItem()) : (<NoExploit content="暂无数据"></NoExploit>)}
            </SwiperItem>
          ))
        }
      </TabContent>
    </View>

  </View> :
    ( <View className="no-login-container">
      <Text className="txt">登录查看订单</Text>
      <Button className="login-btn" onClick={toLogin}>
     立即登录
      </Button>
    </View>)
}



const mapStateToProps = (store) => ({...store})

export default connect(mapStateToProps)(Index)
