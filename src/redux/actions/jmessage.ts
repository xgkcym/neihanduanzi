import JMessage from "../../util/JMessage"
import request from "../../util/request"
import stringfyquery from "../../util/stringfyquery"
export const asyncSetMessage = ()=>{
  return async(dispatch:any)=>{
    const messageList:any = await JMessage.getConversations()
    for (let i = 0; i < messageList.length; i++) {
      const res: any = await request.get('/users' + stringfyquery({ uid: messageList[i].target.username }))
      if (res.status == 200) {
        messageList[i] = {...messageList[i],userInfo:res.data[0]} 
      }
    }
    dispatch({data:messageList,type:"asyncSetMessage"})
  }
}
// export const setMessage = (data:any)=>({type:'setMessage',data})