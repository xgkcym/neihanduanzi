/**
 * 
 * @param date 时间
 */
export default function getStringTime(date:any){
  let time:any = parseInt(date)
  if(time >= 60){
    if(time/60 < 10){
        
        if(time%60 < 10 ){
          time = '0' +parseInt(String(time/60))+ ':0' +time%60
        }else{
          time = '0' +parseInt(String(time/60))+ ':' +time%60
        }
       
    }
  }else{
      if(time%60 < 10){
        time = '00:0' +time 
      }else{
        time = '00:' +time
      }
  }
  return time
} 