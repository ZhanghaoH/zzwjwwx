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
              success() { }
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
    // 通用接口头
    URLHEAD: 'http://app2.henanga.gov.cn/jmth5/zzga/',
    // URLHEAD : 'https://app1.henanga.gov.cn/jmth5/zzga/',
    // 业务接口
    JZZ: 'getResidenceProgress',
    SFZ: 'getIdCardProgress',
    CMCX_CITY: 'getResidentsCityDept',
    CMCX_POLICE: 'getResidentsBureauDept',
    CMCX: 'getSameName',
    CRJBL: 'getExitEntryProgress',
    CRJZJ: 'getExitEntryInfo',
    BAYCJ: 'getSecurityScores',
    BAYZJD: 'getSecurityProgress',
    JSZ: 'getJSZXX',
    WFCX: 'getJDCWZXX',
    HZLIST: 'getResidentsServiceListAll',
    HZITEM: 'getResidentsGuideDetail'
  }
})