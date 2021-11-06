export default function lastTime(data: number){
  let currentTime = Math.floor((new Date().getTime() - data) / 1000 / 60)
  let str = '刚刚'
  if (currentTime != 0) {
    if (currentTime < 60) {
      str = currentTime + '分钟前'
    } else {
      let currentTime = Math.floor((new Date().getTime() - data) / 1000 / 60 / 60)
      if (currentTime < 24) {
        str = currentTime + '小时前'
      } else {
        let currentTime = Math.floor((new Date().getTime() - data) / 1000 / 60 / 60 / 24)
        if (currentTime < 30) {
          str = currentTime + '天前'
        } else {
          let currentTime = Math.floor((new Date().getTime() - data) / 1000 / 60 / 60 / 24 / 30)
          str = currentTime + '月前'
        }
      }
    }
  }
  return str
}