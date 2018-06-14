// pages/crjbl/crjbl.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let cardnum = values.cardnum
    cardnum = cardnum.replace(/\s/, '')

    if ( cardnum == '') {
      wx.showModal({
        title: '提示',
        content: '请输入正确的身份证号或证件号',
        showCancel: false
      })
    } else {
      let info = {
        "referenceNo": cardnum
      };
      let auth = {
        "time_stamp": util.timestamp(new Date())
      };
      wx.request({
        url: app.globalData.URLHEAD + app.globalData.CRJBL,
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
          let errCode = data.errCode;
          switch (errCode) {
            case '0':
              // TODO: result
              wx.setStorageSync('res_crjbl', data.resultData)
              wx.navigateTo({
                url: '../res_crjbl/res_crjbl',
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