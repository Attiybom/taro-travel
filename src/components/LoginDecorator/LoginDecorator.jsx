import { Component } from "react";
import tools from "@/common/tools";

const IsLogin = (WrappedComponent) => {

  return class extends Component {
    componentDidMount() {

      // 通过判断storage是否存有用户信息，进而判断用户是否需要登录
      const userInfo = tools.getStorageSyncWithTime('userInfo')
      if (!userInfo?.userPhone) {
        tools.navigateTo({
          url: '/pages/login/login'
        })
      }
    }

    render() {
      return <WrappedComponent></WrappedComponent>
    }
  }
}

export default IsLogin
