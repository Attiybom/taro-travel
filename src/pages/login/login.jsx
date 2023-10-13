import { View, Input, Button } from "@tarojs/components"
import React from "react"

// style
import './login.scss'

// feature
import { debounce } from "@/common/utils"

class Login extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      // nickName: '',
      // userName: '',
      // password: ''
    }
  }

  handleInput = debounce((e, type) => {
    console.log('e', e)
    console.log('type', type)
    this.setState({
      [type]: e.detail.value
    })
  }, 300)

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
        <Button className="login-btn" >登录</Button>
      </View>
    )
  }
}

export default Login
