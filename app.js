//app.js
App({
  onLaunch: function () {
    wx.clearStorage()
    // 获取用户权限
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
        // if (!res.authSetting['scope.userInfo', 'scope.userLocation', 'scope.record', 'scope.camera', 'scope.writePhotosAlbum']) {
          // 已经授权
          // if (!res.authSetting['scope.userInfo']) {
          //   wx.authorize({
          //     scope: 'scope.userInfo',
          //     success() {}
          //   })
          // }
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success() {}
            })
          }
          // if (!res.authSetting['scope.record']) {
          //   wx.authorize({
          //     scope: 'scope.record',
          //     success() {}
          //   })
          // }
          // if (!res.authSetting['scope.camera']) {
          //   wx.authorize({
          //     scope: 'scope.camera',
          //     success() {}
          //   })
          // }
          // if (!res.authSetting['scope.writePhotosAlbum']) {
          //   wx.authorize({
          //     scope: 'scope.writePhotosAlbum',
          //     success() {}
          //   })
          // }
        }
      }
    })
  },
  globalData: {
    city: '郑州',
    ak: 'Cw3ljjC03lMcgV3RIfZUi403BRR4mYbe',
  }
})