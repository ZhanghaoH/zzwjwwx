// pages/wfcx/wfcx.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrCity: [
      "豫A",
      "豫B",
      "豫C",
      "豫D",
      "豫E",
      "豫F",
      "豫G",
      "豫H",
      "豫I",
      "豫J",
      "豫K",
      "豫L",
      "豫M",
      "豫N",
      "豫O",
      "豫P",
      "豫Q",
      "豫R",
    ],
    cityIndex: app.globalData.cityIndex,
    HPZL: '02',
    car: {
      color: '#fff',
      icon: 'car_active',
      bgColor: '#1287e2',
    },
    truck: {
      color: '#f3b100',
      icon: 'truck',
      bgColor: '#fff',
    },
    carev: {
      color: '#61d33a',
      icon: 'carev',
      bgColor: '#fff',
    },
    car_active: {
      color: '#1287e2',
      icon: 'car',
      bgColor: '#fff',
    },
    truck_active: {
      color: '#f3b100',
      icon: 'truck',
      bgColor: '#fff',
    },
    carev_active: {
      color: '#61d33a',
      icon: 'carev',
      bgColor: '#fff',
    },
    showTip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.city)
    console.log(app.globalData.cityIndex)
  },
  showTip: function () {
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
  getType: function(e){
    let _this = this
    let HPZL = e.currentTarget.dataset.type
    console.log(HPZL)
    _this.setData({
      HPZL: HPZL,
      car: {
        color: '#1287e2',
        icon: 'car',
        bgColor: '#fff',
      },
      truck: {
        color: '#f3b100',
        icon: 'truck',
        bgColor: '#fff',
      },
      carev: {
        color: '#61d33a',
        icon: 'carev',
        bgColor: '#fff',
      },
    })
    switch(HPZL){
      case '02':
        _this.setData({
          car: {
            color: '#fff',
            icon: 'car_active',
            bgColor: '#1287e2',
          }
        })
        break;
      case '01':
        _this.setData({
          truck: {
            color: '#fff',
            icon: 'truck_active',
            bgColor: '#f3b100',
          },
        }) 
        break;
      case '52':
        _this.setData({
          carev: {
            color: '#fff',
            icon: 'carev_active',
            bgColor: '#61d33a',
          },
        }) 
        break;
      default:
        _this.setData({
          car: {
            color: '#fff',
            icon: 'car_active',
            bgColor: '#1287e2',
          }
        }) 
    }
    console.log(this.data.car)
  },

  cityChange: function(e){
    console.log(e.detail.value)
    this.setData({
      cityIndex: e.detail.value
    })
  },
  check: function (e) {
    let FZJG = this.data.arrCity[this.data.cityIndex]
    let HPZL = this.data.HPZL
    let values = e.detail.value
    console.log(values)
    let carNum = values.carNum
    carNum = carNum.toUpperCase().replace(/\s+/g, '')
    let vin = values.vin
    vin = vin.replace(/\s+/g, '')
    if (vin == "" || carNum == '') {
      wx.showModal({
        title: '提示',
        content: '请检查相关信息是否正确填写！',
        showCancel: false
      })
    } else {
      let info = {
        "HPHM": carNum,
        "HPZL": HPZL,
        "CLSBDH": vin,
        "FZJG": FZJG
      };
      let auth = {
        "time_stamp": util.timestamp(new Date())
      };
      wx.request({
        url: app.globalData.URLHEAD + app.globalData.WFCX,
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
            case 0:
              // TODO: navigate to res page
              wx.setStorageSync('res_wf', data.resultData)
              wx.navigateTo({
                url: '../res_wf/res_wf',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
              break;
            case '1':
            case '2':
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