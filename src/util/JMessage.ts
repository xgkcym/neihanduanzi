import JMessage from 'jmessage-react-plugin';
export default {
  init() {
    JMessage.init({
      appkey: 'ecff92f6b25c141331d90f4b',
      isOpenMessageRoaming: false, // 是否开启消息漫游，默认不开启
      isProduction: false, // 是否为生产模式
    });
  },
  // 注册
  register(username: any, password: any) {
    return JMessage.register(
      {
        username,
        password,
      },
      () => {
        console.log('注册成功');
      },
      () => {
        console.log('注册失败');
      },
    );
  },
  login(username: any, password: any) {
    // 登录
    return JMessage.login(
      {
        username,
        password,
      },
      () => {
        console.log('登录成功');
      },
      () => {
        console.log('登录失败');
      },
    );
  },
  logout:JMessage.logout,
  // 发送消息
  sendTextMessage(username: any,text: any,extras: any,type?: 'single' | 'group'){
    return new Promise((resolve,reject)=>{
      JMessage.sendTextMessage({ type: type ||'single',username,text,extras,messageSendingOptions: JMessage.messageSendingOptions},
      resolve({code:10000,mes:'发送成功'}), reject({code:10002,mes:'发送失败'}))
    })
  },
 /**
   * 获取历史记录
   * 
   */
  getHistoryMessages(username: any,limit: any,type?: 'single' | 'group'){
   return new Promise((resolve,reject)=>{
    JMessage.getHistoryMessages(
      { 
        type:type ||'single',
        username,
        from: 0,
        limit
      },
      resolve,reject)
   }) 
  },
  /**
   * 
   * 获取最新消息
   */
   sendImageMessage(username: any,path: any,extras: any,type?: 'single' | 'group'){
     return new Promise((resovle,reject)=>{
        JMessage.sendImageMessage({ type:type || 'single', username,path, extras, messageSendingOptions: JMessage.messageSendingOptions },
        resovle, reject)
     })
   },
    getConversations(){
      return new Promise((resovle,reject)=>{
        JMessage.getConversations(resovle,reject)
      })
    }
};
