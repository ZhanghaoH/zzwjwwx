// pages/hzywzn/hzywzn.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrHz: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let info = {
      "caseKindType": "2",
      "casePoliceCategory": "6"
    };
    let auth = {
      "time_stamp": util.timestamp(new Date())
    };
    let that = this;
    wx.request({
      url: app.globalData.URLHEAD + app.globalData.HZLIST,
      data: {
        info: JSON.stringify(info),
        auth: JSON.stringify(auth)
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      method: "POST",
      success: function (res) {
        console.log(res);
        let data = res.data;
        if (data.errCode == "0") {
          let resultData = JSON.parse(data.resultData);
          console.log(resultData);
          that.setData({
            arrHz: resultData,
          })
        }
      }
    })
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