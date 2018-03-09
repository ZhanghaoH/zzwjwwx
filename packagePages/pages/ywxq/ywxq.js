// pages/ywxq/hwxq.js
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
    let that = this;
    let guid = options.guid;
    let title = options.title;
    let info = {
      'caseGuid': guid,
    };
    let auth = {
      "time_stamp": util.timestamp(new Date())
    };
    wx.setNavigationBarTitle({
      title: title
    });
    wx.request({
      url: app.globalData.URLHEAD + app.globalData.HZITEM,
      method: 'POST',
      data: {
        info: JSON.stringify(info),
        auth: JSON.stringify(auth)
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res);
        let data = res.data;
        if (data.errCode == "0") {
          let resultData = JSON.parse(data.resultData);
          console.log(resultData);
          let caseType, caseProperty;
          switch (resultData.caseType) {
            case "1":
              caseType = "即办件";
              break;
            case "2":
              caseType = "承诺件";
              break;
            case "3":
              caseType = "预约件";
              break;
            default:
              break;
          };
          switch (resultData.caseProptery) {
            case "1":
              caseProperty = "公示";
              break;
            case "2":
              caseProperty = "申报";
              break;
            case "3":
              caseProperty = "预约";
              break;
            default:
              break;
          };
          that.setData({
            detail: resultData,
            caseType: caseType,
            caseProperty: caseProperty,
            materialList: JSON.parse(resultData.materialList),
            basisList: JSON.parse(resultData.basisList),
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})