//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const pinyinUtil = require('../../utils/pinyinUtil.js')
Page({
  data: {
    showCityList: false,
    addr: wx.getStorageSync('addr') || app.globalData.city,
    citybg: wx.getStorageSync('citybg') || 'img_a-min.jpg',
    weather: wx.getStorageSync('weather') || '晴',
    citypinyin: wx.getStorageSync('citypinyin') || 'zhengzhou',
    temperature: wx.getStorageSync('temperature') || '--',
    picUrl: wx.getStorageSync('picUrl') || 'weather_qing.png',
    cityList: ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "商丘", "周口", "驻马店", "南阳", "信阳", "济源", "巩义", "兰考县", "汝州", "滑县", "长垣县", "邓州", "永城", "固始县", "鹿邑县", "新蔡县"],
  },
  onLoad: function () {
    let _this = this
    if (!wx.getStorage('addr') || !wx.getStorage('addr') || !wx.getStorage('addr') || !wx.getStorage('addr') || !wx.getStorage('addr')) {
      _this.getCity()
    }
  },

  // 获取地市
  getCity: function () {
    let _this = this
    let ak = app.globalData.ak
    let getGPS = new Promise((resolve, reject) => {
      console.log("getgps")
      wx.getLocation({
        type: 'wgs84',
        altitude: false,
        success: function (res) {
          console.log(res)
          let coordinate = res.latitude + ',' + res.longitude
          // let coordinate = '33.86837207600754,112.48656099999993'
          resolve(coordinate)
        },
        fail: function (res) { reject(res) },
      })
    }).then((coordinate) => {
      wx.request({
        url: 'http://api.map.baidu.com/geocoder/v2/?location=' + coordinate + '&output=json&pois=0&ak=' + ak,
        //  header: {},
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log(res)
          console.log(res.data.status)
          if (res.data.status == 0) {
            let addressComponent = res.data.result.addressComponent
            _this.confirmCity(addressComponent)
          } else {
            console.log("li")
            wx.showModal({
              title: '提示',
              content: '获取定位信息失败！',
              confirmText: '确定',
            })
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: '获取定位信息失败！',
            confirmText: '确定',
          })
        },
      })
    }, () => {
      console.log("WAI")
      wx.showModal({
        title: '提示',
        content: '获取定位信息失败！',
        confirmText: '确定',
      })
    })
  },

  // 确认城市地区
  confirmCity: function (addressComponent) {
    let _this = this
    // let city = "郑州"
    const cityArr = ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "商丘", "周口", "驻马店", "南阳", "信阳", "济源", "巩义", "兰考县", "汝州", "滑县", "长垣县", "邓州", "永城", "固始县", "鹿邑县", "新蔡县"]
    const imgArr = ['img_a.jpg', 'img_b.jpg', 'img_c.jpg', 'img_d.jpg', 'img_e.jpg', 'img_f.jpg', 'img_g.jpg', 'img_h.jpg', 'img_i.jpg', 'img_j.jpg', 'img_k.jpg', 'img_l.jpg', 'img_m.jpg', 'img_n.jpg', 'img_o.jpg', 'img_p.jpg', 'img_q.jpg', 'img_r.jpg', 'img_a.jpg', 'img_b.jpg', 'img_d.jpg', 'img_e.jpg', 'img_g.jpg', 'img_p.jpg', 'img_m.jpg', 'img_r.jpg', 'img_n.jpg', 'img_p.jpg',]
    console.log(addressComponent.province.indexOf('河南'))
    if (addressComponent.province.indexOf('河南') != -1) {
      let city = cityArr.includes(addressComponent.district) ? addressComponent.district : addressComponent.city
      _this.setInterface(city.replace(/市/, ''))
    } else {
      wx.showModal({
        title: '提示',
        content: '当前城市不在河南省内，即将切回默认城市郑州！',
        showCancel: false,
      })
    }
  },

  // 呼出城市列表
  isChangeCity: function () {
    this.setData({
      showCityList: !this.data.showCityList
    })
  },

  // 变更城市
  changeCity: function (event) {
    console.log(event)
    let index = event.currentTarget.dataset.index
    let city = this.data.cityList[index]
    this.setData({
      showCityList: false
    })
    this.setInterface(city)
  },

  // 地区改变引起的表现层变化
  setInterface: function (city) {
    let _this = this
    const cityArr = ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "商丘", "周口", "驻马店", "南阳", "信阳", "济源", "巩义", "兰考县", "汝州", "滑县", "长垣县", "邓州", "永城", "固始县", "鹿邑县", "新蔡县"]
    const imgArr = ['img_a-min.jpg', 'img_b-min.jpg', 'img_c-min.jpg', 'img_d-min.jpg', 'img_e-min.jpg', 'img_f-min.jpg', 'img_g-min.jpg', 'img_h-min.jpg', 'img_i-min.jpg', 'img_j-min.jpg', 'img_k-min.jpg', 'img_l-min.jpg', 'img_m-min.jpg', 'img_n-min.jpg', 'img_o-min.jpg', 'img_p-min.jpg', 'img_q-min.jpg', 'img_r-min.jpg', 'img_a-min.jpg', 'img_b-min.jpg', 'img_d-min.jpg', 'img_e-min.jpg', 'img_g-min.jpg', 'img_p-min.jpg', 'img_m-min.jpg', 'img_r-min.jpg', 'img_n-min.jpg', 'img_p-min.jpg',]
    let index = cityArr.indexOf(city)
    let citypinyin = pinyinUtil.convert().getPinyin(city).replace(/\s+/, '')
    app.globalData.city = city;
    _this.setWeather(city)
    _this.setData({
      addr: city,
      citybg: imgArr[index],
      citypinyin: citypinyin
    })
    wx.setStorageSync('addr', city)
    wx.setStorageSync('citybg', imgArr[index])
    wx.setStorageSync('citypinyin', citypin)
  },

  // 天气的获取与设置
  setWeather: function (city) {
    let _this = this
    wx.request({
      url: 'https://app1.henanga.gov.cn/jmt/app/weather_getWeatherByCity',
      data: {
        info: JSON.stringify({ city: city })
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      // dataType: 'json',
      // responseType: 'text',
      success: function (res) {
        console.log(res.data)
        if (res.data.errCode == '0') {
          let weather_data = res.data.resultData[0].weather_data[0]
          console.log(weather_data)
          _this.setData({
            weather: weather_data.weather,
            temperature: weather_data.temperature,
          })
          wx.setStorageSync('weather', weather_data.weather)
          wx.setStorageSync('temperature', weather_data.temperature)
          let weather_initial = weather_data.weather
          let i = weather_initial.indexOf('转')
          let weather = i > 0 ? weather_initial.substr(i + 1) : weather_initial
          let weather_pinyin = pinyinUtil.convert().getPinyin(weather).replace(/\s+/, '');
          console.log(weather_pinyin)
          _this.setData({
            picUrl: 'weather_' + weather_pinyin + '.png',
          })
          wx.setStorageSync('picUrl', 'weather_' + weather_pinyin + '.png')
        } else {
          wx.showModal({
            title: '提示',
            content: '天气获取失败',
            showCancel: false,
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '天气获取失败',
          showCancel: false,
        })
      },
      complete: function (res) { },
    })
  }
})
