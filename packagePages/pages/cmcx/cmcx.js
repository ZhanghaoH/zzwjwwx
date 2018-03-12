// pages/cmcx/cmcx.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityIndex: 0,
    countryIndex: 0,
    arrCity: [{ orgName: "不限", orgId: "0"}],
    arrCountry: [{ orgName: "不限", orgId: "0" }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let auth = {
      "time_stamp": util.timestamp(new Date())
    };
    wx.request({
      url: app.globalData.URLHEAD + app.globalData.CMCX_CITY,
      data: {
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
            let arrCity = _this.data.arrCity.concat(data.resultData)
            console.log(arrCity)
            _this.setData({
              arrCity: arrCity
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
  cityChange: function(e){
    console.log(e.detail.value)
    let cityIndex = e.detail.value
    let _this = this
    this.setData({
      cityIndex: e.detail.value,
      countryIndex: 0,
    })
    if( cityIndex == 0){
      this.setData({
        arrCountry: [{ orgName: "不限", orgId: "0"}],
      })
    } else {
      let city = _this.data.arrCity[cityIndex].orgId
      let info = {
        "cityId": city
      };
      let auth = {
        "time_stamp": util.timestamp(new Date())
      };
      wx.request({
        url: app.globalData.URLHEAD + app.globalData.CMCX_POLICE,
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
              data.resultData.unshift(_this.data.arrCity[cityIndex])
              let arrCountry = data.resultData
              console.log(arrCountry)
              _this.setData({
                arrCountry: arrCountry
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
  countryChange: function(e){
    console.log(e.detail.value)
    let CountryIndex = e.detail.value
    this.setData({
      countryIndex: e.detail.value
    })
  },
  check: function (e) {
    let values = e.detail.value
    console.log(values)
    let name = values.name
    name = name.replace(/\s/g, '')
    if (name == '') {
      wx.showModal({
        title: '提示',
        content: '请输入要查询的姓名',
        showCancel: false
      })
    } else {
      let cityIndex = this.data.cityIndex
      let deptId = cityIndex == 0 ? "410000" : this.data.arrCountry[this.data.countryIndex].orgId
      console.log(deptId)
      let info = {
        "deptId": deptId,
        "name": name
      };
      let auth = {
        "time_stamp": util.timestamp(new Date())
      };
      wx.request({
        url: app.globalData.URLHEAD + app.globalData.CMCX,
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
              wx.showModal({
                title: '提示',
                content: '与你重名的有'+ data.resultData  + '人',
                showCancel: false,
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
        complete: function (res) { },
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