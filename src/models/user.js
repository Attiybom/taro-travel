import tools from "@/common/tools";

const INIT_STATE = () => {
  const userInfo = tools.getStorageSyncWithTime("userInfo");
  return {
    isLogin: !!userInfo?.userPhone,
    userPhone: userInfo?.userPhone,
    nickName: userInfo?.nickName,
  };
};

export default {
  namespace: "user",
  state: {
    ...INIT_STATE(),
  },
  reducers: {
    updateUserInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
