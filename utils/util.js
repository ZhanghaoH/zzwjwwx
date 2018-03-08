const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const timestamp = date => {
  let y = date.getFullYear() + '';
  let m = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) + '' : '0' + (date.getMonth() + 1);
  let d = date.getDate() >= 10 ? date.getDate() + '' : '0' + date.getDate();
  let h = date.getHours() >= 10 ? date.getHours() + '' : '0' + date.getHours();
  let mm = date.getMinutes() >= 10 ? date.getMinutes() + '' : '0' + date.getMinutes();
  let s = date.getSeconds() >= 10 ? date.getSeconds() + '' : '0' + date.getSeconds();
  return y + m + d + h + mm + s;
}
module.exports = {
  formatTime: formatTime,
  timestamp: timestamp
}
