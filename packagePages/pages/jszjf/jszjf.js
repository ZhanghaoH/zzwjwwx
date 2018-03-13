// pages/jszjf/jszjf.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showTip: function(){
    this.setData({
      showTip: !this.data.showTip
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  check: function (e) {
    let values = e.detail.value
    console.log(values)
    let idcard = values.idcard
    idcard = idcard.replace(/\s/g, '')
    let cardnum = values.cardnum
    cardnum = cardnum.replace(/\s/g, '')
    let REGID = new RegExp(
      "^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\\d{4}(((19|20)\\d{2}(0[13-9]|1[012])(0[1-9]|[12]\\d|30))|((19|20)\\d{2}(0[13578]|1[02])31)|((19|20)\\d{2}02(0[1-9]|1\\d|2[0-8]))|((19|20)([13579][26]|[2468][048]|0[048])0229))\\d{3}(\\d|X|x)?$"
    )
    let isidCard = REGID.exec(idcard);
    console.log(!isidCard)
    if (isidCard == null || cardnum == '') {
      wx.showModal({
        title: '提示',
        content: '请输入正确的驾驶证号或档案编号',
        showCancel: false
      })
    } else {
      let info = {
        "SFZMHM": idcard,
        "DABH": cardnum
      };
      let auth = {
        "time_stamp": util.timestamp(new Date())
      };
      wx.request({
        url: app.globalData.URLHEAD + app.globalData.JSZ,
        data: {
          info: JSON.stringify(info),
          auth: JSON.stringify(auth)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res.data)
          let data = res.data
          let errCode = data.errCode + '';
          switch (errCode) {
            case '0':
              // TODO: result
              wx.setStorageSync('res_jszjf', data.resultData)
              wx.navigateTo({
                url: '../res_jszjf/res_jszjf',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
              break;
            case '1':
            case '10':
              wx.showModal({
                title: '提示',
                content: data.msg,
                showCancel: false,
              })
              break;
            case '12':
              wx.showModal({
                title: '提示',
                content: '连接出问题了，请稍后再试',
                showCancel: false,
              })
              break;
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: '连接出问题了，请稍后再试',
            showCancel: false,
          })
        },
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '微警务办事大厅',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})