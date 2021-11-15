export default function lastTime(data: number) {
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
export const lastTimeStr = function (time:any) {
  const now = new Date().getTime() / 1000
  const date = time / 1000
  let str: any = '刚刚'
  if(now - date < 60*60 && now - date >= 60 ){
    str = Math.floor((now - date)/60) +'分钟前' 
 }else if(now - date < 60*60*24 && now - date >= 60*60){
  str = Math.floor((now - date)/60/60) +'小时前' 
 }else if(now - date < 60*60*24*30 && now - date >= 60*60*24){
  str = Math.floor((now - date)/60/60/24) +'天前' 
 }else if(now - date < 60*60*24*30*12 && now - date >= 60*60*24*30){
  str = Math.floor((now - date)/60/60/24/30) +'月前' 
 }else if(now - date > 60*60*24*30*12 && now - date >= 60*60*24*30*12){
    str  = new Date(time).toLocaleString().split(' ')[0]
 }
  return str
}