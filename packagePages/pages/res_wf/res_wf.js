// pages/res_wf/res_wf.js
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
    let _this = this
    let res_wf = wx.getStorageSync('res_wf')
    let len = res_wf.length
    new Promise((resolve, reject) => {
      if (len < 1) {
        reject()
      } else {
        res_wf.forEach((e, i) => {
          let shijian = e.wfsj
          let wfdate = shijian.substr(0, 10)
          let wftime = shijian.substr(-10, 8)
          e.wfdate = wfdate
          e.wftime = wftime
          if (i == (len - 1)) {
            resolve(res_wf)
          }
        })
      }
    }).then(res => {
      console.log(res)
      _this.setData({
        res_wf: res
      })
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