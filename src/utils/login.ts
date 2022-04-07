class login {
  getLoginCode() {
    return new Promise<string>((resolve) => {
      uni.login({
        success: (result) => {
          resolve(result.code);
        },
      });
    });
  }
  getUserInfo() {
    return new Promise<any>((resolve, reject) => {
      uni.showLoading({
        title: "登录中",
        mask: true,
      });

      uni.getUserProfile({
        desc: "获取登录信息",
        success: (userRes) => {
          uni.login({
            success: (wxCodeRes) => {
              resolve({ userRes, wxCodeRes });
            },
            fail: (wxCodeErr) => {
              uni.showToast({
                title: "登录失败 获取微信code失败",
                icon: "none",
              });
              reject(wxCodeErr);
            },
          });
        },
        fail: (userErr) => {
          uni.showToast({
            title: "登录失败 取消了授权",
            icon: "none",
          });
          reject(userErr);
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    });
  }
}
export default new login();
