import React from "react"
import { View, Input, Button } from "@tarojs/components"

// style
import './login.scss'

// feature
import { debounce } from "@/common/utils"

// api
import { loginReq } from "@/common/api"
import tools from "@/common/tools"
import { ERR_MSG } from "@/common/constant"
import Taro, { setStorageSync } from "@tarojs/taro"

// store
import { connect } from 'react-redux'

@connect(({user}) =>( {
  ...user
}))
class Login extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      nickName: '',
      userPhone: '',
      password: ''
    }
  }

  handleInput = debounce((e, type) => {
    this.setState({
      [type]: e.detail.value
    })
  }, 300)

  handleLogin = () => {

    const {
      nickName = '',
      userPhone = '',
      password = '' } = this.state

    if (!userPhone || !password || !nickName) {
      tools.showToast({
        title: `请输入完整信息`
      })
      return
    }

    const phoneReg = /^1[3-9]\d{9}$/
    if (!phoneReg.test(userPhone)) {
      return tools.showToast({
        title: '请输入正确的手机号'
      })
    }

    tools.showLoading()

    loginReq({
      userPhone,
      nickName,
      password
    }).then(res => {
      console.log('loginRes', res)
      const { nickName: nickNameRes, userPhone: userPhoneRes } = res.result
      setStorageSync('userInfo', {
        nickNameRes,
        userPhoneRes
      })

      // 更新store
      this.props.dispatch({
        type: 'user/updateUserInfo',
        payload: {
          nickNameRes,
          userPhoneRes,
          isLogin: !!userPhoneRes
        }
      })

      Taro.navigateBack()
    }).catch(err => {
      console.log('login-err', err)
      const { data } = err
      if (data?.mes) {
        return tools.showToast(data.mes)
      }
      return tools.showToast(ERR_MSG)
    }).finally(() => {
      tools.hideLoading()
    })
  }

  render() {

    return (
      <View className="login-container">
        <View className="login-top">
          <View>你好，</View>
          <View>欢迎登录</View>
        </View>
        <View className="login-box">
          <Input type="text" className="nick-name input" placeholder="请输入昵称" placeholderClass="placeholder-class" onInput={(e) => this.handleInput(e, 'nickName')}></Input>
          <Input type="text" className="phone input" placeholder="请输入手机号" placeholderClass="placeholder-class" onInput={(e) => this.handleInput(e, 'userPhone')}></Input>
          <Input type="password" className="password input" placeholder="请输入密码" placeholderClass="placeholder-class" onInput={(e) => this.handleInput(e, 'password')}></Input>
        </View>
        <Button className="login-btn" onClick={() => this.handleLogin()}>登录</Button>
      </View>
    )
  }
}

export default Login
