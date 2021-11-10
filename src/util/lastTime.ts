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
export const lastTimeStr =  function (strdata:string) {
  let now = new Date().toLocaleString()
      const dataarr:any = strdata.split(' ')
      const nowarr:any = now.split(' ')
      const adata:any = nowarr[0].split('/')
      const bdata:any = dataarr[0].split('/')

      let str = '刚刚'
      if (adata[0] > bdata[0]) {
        str = adata[0] - bdata[0] + '年前'
      } else if (adata[1] > bdata[1]) {
        str = adata[1] - bdata[1] + '月前'
      } else if (adata[2] > bdata[2]) {
        str = adata[2] - bdata[2] + '天前'
      } else if (dataarr[1].substr(0, 2) == nowarr[1].substr(0, 2)) {
        if (nowarr[1].length == 9 && dataarr[1].length == 9) {
          if (nowarr[1].substr(2, 1) > dataarr[1].substr(2, 1)) {
            str = nowarr[1].substr(2, 1) - dataarr[1].substr(2, 1) + '小时前'
          } else if (nowarr[1].substr(4, 2) > dataarr[1].substr(4, 2)) {
            str = nowarr[1].substr(4, 2) - dataarr[1].substr(4, 2) + '分钟前'
          }
        }else if(nowarr[1].length == 10 && dataarr[1].length == 9){
          if (nowarr[1].substr(2, 2) > dataarr[1].substr(2, 1)) {
            str = nowarr[1].substr(2, 2) - dataarr[1].substr(2, 1) + '小时前'
          } else if (nowarr[1].substr(5, 2) > dataarr[1].substr(4, 2)) {
            str = nowarr[1].substr(5, 2) - dataarr[1].substr(4, 2) + '分钟前'
          }
        }else if(nowarr[1].length == 10 && dataarr[1].length == 10){
          if (nowarr[1].substr(2, 2) > dataarr[1].substr(2, 2)) {
            str = nowarr[1].substr(2, 2) - dataarr[1].substr(2, 2) + '小时前'
          } else if (nowarr[1].substr(5, 2) > dataarr[1].substr(5, 2)) {
            str = nowarr[1].substr(5, 2) - dataarr[1].substr(5, 2) + '分钟前'
          }
        }

      } else if (dataarr[1].substr(0, 2) != nowarr[1].substr(0, 2)) {
        str = nowarr[1].substr(2, 1) - dataarr[1].substr(2, 1) + 12 + '小时前'
      }
      return str
}