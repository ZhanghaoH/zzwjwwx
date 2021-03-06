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
    // 默认郑州 避免地理位置获取失败后 天气为空
    _this.setInterface()
    if (!wx.getStorageSync('addr') || !wx.getStorageSync('citybg') || !wx.getStorageSync('weather') || !wx.getStorageSync('temperature') || !wx.getStorageSync('picUrl')) {
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
        url: 'https://api.map.baidu.com/geocoder/v2/?location=' + coordinate + '&output=json&pois=0&ak=' + ak,
        //  header: {},
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log(res)
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
      showCityList: true
    })
  },
  hidePop: function(){
    this.setData({
      showCityList: false
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
  setInterface: function (city="郑州") {
    let _this = this
    const cityArr = ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "商丘", "周口", "驻马店", "南阳", "信阳", "济源", "巩义", "兰考县", "汝州", "滑县", "长垣县", "邓州", "永城", "固始县", "鹿邑县", "新蔡县"]
    const cityDataArr = [{ city: "郑州", pinyin: "ZhengZhou" , cityIndex: 0}, { city: "开封", pinyin: "KaiFeng" , cityIndex: 1}, { city: "洛阳", pinyin: "LuoYang" , cityIndex: 2}, { city: "平顶山", pinyin: "PingDingShan" , cityIndex: 3}, { city: "安阳", pinyin: "AnYang" , cityIndex: 4}, { city: "鹤壁", pinyin: "HeBi" , cityIndex: 5}, { city: "新乡", pinyin: "XinXiang" , cityIndex: 6}, { city: "焦作", pinyin: "JiaoZuo" , cityIndex: 7}, { city: "濮阳", pinyin: "PuYang" , cityIndex: 8}, { city: "许昌", pinyin: "XuChang" , cityIndex: 9}, { city: "漯河", pinyin: "LuoHe" , cityIndex: 10}, { city: "三门峡", pinyin: "SanMenXia" , cityIndex: 11}, { city: "商丘", pinyin: "ShangQiu" , cityIndex: 12}, { city: "周口", pinyin: "ZhouKou" , cityIndex: 13}, { city: "驻马店", pinyin: "ZhuMaDian" , cityIndex: 14}, { city: "南阳", pinyin: "NanYang" , cityIndex: 15}, { city: "信阳", pinyin: "XinYang" , cityIndex: 16}, { city: "济源", pinyin: "JiYuan" , cityIndex: 17}, { city: "巩义", pinyin: "GongYi" , cityIndex: 0}, { city: "兰考县", pinyin: "LanKao" , cityIndex: 1}, { city: "汝州", pinyin: "RuZhou" , cityIndex: 3}, { city: "滑县", pinyin: "HuaXian" , cityIndex: 4}, { city: "长垣县", pinyin: "ChangYuan" , cityIndex: 6}, { city: "邓州", pinyin: "DengZhou" , cityIndex: 15}, { city: "永城", pinyin: "YongCheng" , cityIndex: 12}, { city: "固始县", pinyin: "GuShi" , cityIndex: 17}, { city: "鹿邑县", pinyin: "LuYi" , cityIndex: 13}, { city: "新蔡县", pinyin: "XinCai", cityIndex: 15}]
    const imgArr = ['img_a-min.jpg', 'img_b-min.jpg', 'img_c-min.jpg', 'img_d-min.jpg', 'img_e-min.jpg', 'img_f-min.jpg', 'img_g-min.jpg', 'img_h-min.jpg', 'img_i-min.jpg', 'img_j-min.jpg', 'img_k-min.jpg', 'img_l-min.jpg', 'img_m-min.jpg', 'img_n-min.jpg', 'img_o-min.jpg', 'img_p-min.jpg', 'img_q-min.jpg', 'img_r-min.jpg', 'img_a-min.jpg', 'img_b-min.jpg', 'img_d-min.jpg', 'img_e-min.jpg', 'img_g-min.jpg', 'img_p-min.jpg', 'img_m-min.jpg', 'img_r-min.jpg', 'img_n-min.jpg', 'img_p-min.jpg',]
    let index = cityArr.indexOf(city)
    let citypinyin = cityDataArr[index].pinyin
    let cityIndex = cityDataArr[index].cityIndex
    app.globalData.city = city;
    app.globalData.cityIndex = cityIndex;
    _this.setWeather(city)
    _this.setData({
      addr: city,
      citybg: imgArr[index],
      citypinyin: citypinyin
    })
    wx.setStorageSync('addr', city)
    wx.setStorageSync('citybg', imgArr[index])
    wx.setStorageSync('citypinyin', citypinyin)
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
