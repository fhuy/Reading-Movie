const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(){
    const that = this;
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在Page.onLoad之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //登录凭证校验。通过 wx.login() 接口获得临时登录凭证code后传到开发者服务器调用此接口完成登录流程。
    wx.login({
      success: function (res) {
        if(res.code) {
          console.log('ress', res)
          const id = app.globalData;  
          console.log('id', id)
          const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${id.appid}&secret=${id.secret}&js_code=${res.code}&grant_type=authorization_code'`;
          console.log('url', url)
          wx.request({
            url: url,
            data: {},
            method: 'GET',
            success: function (res) {
              console.log('res', res);
              const obj = {};
              obj.openid = res.data.openid;
              console.log('openid', obj.openid);
              console.log('session_key', res.data.session_key);
              obj.expires_in = Date.now() + res.data.expires_in;
              wx.setStorageSync('user', obj)
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      } 
    });
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }  
})