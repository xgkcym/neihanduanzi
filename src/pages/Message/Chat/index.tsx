import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Button,
  Platform,
  Text,
} from 'react-native'
import JMessage  from '../../../util/JMessage'
var RNFS = require('react-native-fs')

import IMUI from 'aurora-imui-react-native'
var InputView = IMUI.ChatInput
var MessageListView = IMUI.MessageList
const AuroraIController = IMUI.AuroraIMUIController
const window = Dimensions.get('window')


var themsgid = 1

function constructNormalMessage() {

  var message:any = {}
  message.msgId = themsgid.toString()
  themsgid += 1
  message.status = "send_succeed"
  message.isOutgoing = true
  message.timeString = ''
  var user = {
    userId: "",
    displayName: "replace your nickname",
    avatarPath: "images"
  }
  if (Platform.OS === "ios") {
    user.avatarPath = RNFS.MainBundlePath + '/default_header.png'
  }
  message.fromUser = user

  return message
}

var imageUrlArray = [
]

export default class TestRNIMUI extends Component {
  onTapMessageCell: any
  constructor(props) {
    super(props);
    let initHeight;
    if (Platform.OS === "ios") {
      initHeight = 46
    } else {
      initHeight = 100
    }
    this.state = {
      inputLayoutHeight: initHeight,
      messageListLayout: { flex: 1, width: window.width, margin: 0 },
      inputViewLayout: { width: window.width, height: initHeight, },
      isAllowPullToRefresh: true,
      navigationBar: {},
    }
    

    this.updateLayout = this.updateLayout.bind(this);
    this.onMsgClick = this.onMsgClick.bind(this);
    this.messageListDidLoadEvent = this.messageListDidLoadEvent.bind(this);
  }

  componentDidMount() {
    /**
     * Android only
     * Must set menu height once, the height should be equals with the soft keyboard height so that the widget won't flash.
     * 在别的界面计算一次软键盘的高度，然后初始化一次菜单栏高度，如果用户唤起了软键盘，则之后会自动计算高度。
     */
    if (Platform.OS === "android") {
      this.refs["ChatInput"].setMenuContainerHeight(316)
    }
    this.resetMenu()
    AuroraIController.addMessageListDidLoadListener(this.messageListDidLoadEvent);
  }

  messageListDidLoadEvent() {
    this.getHistoryMessage()
  }
  
 async getHistoryMessage() {
    var messages:any = []
   /* const type = 'single'
    const username = this.props.route.params.id
    const limit = 100;
    const res =  await JMessage.getHistoryMessages(type,username,limit)
    console.log(res);
    res.map(v=>{
      var message = constructNormalMessage()
      if(v.from.username == this.props.RootStore.userInfo.id){
        message.isOutgoing = true
        message.fromUser.avatarPath = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926548887&di=f107f4f8bd50fada6c5770ef27535277&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F67%2F23%2F69i58PICP37.jpg"//1
      }else{
        message.isOutgoing = false
        message.fromUser.avatarPath = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926548887&di=f107f4f8bd50fada6c5770ef27535277&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F67%2F23%2F69i58PICP37.jpg"//1
        
      }
      if(v.type == 'text'){
        message.msgType = 'text'
        message.text = v.text
      }else if(v.type == 'image'){
        message.msgType = 'image'
        message.mediaPath = v.thumbPath
      }
      
      // 图片路劲
      // message.mediaPath = imageUrlArray[index]
      message.contentSize = { 'height': 100, 'width': 200 }
      message.timeString = (new Date(v.createTime)).toLocaleTimeString()
    
      // message.extras = { "extras": "fdfsf" }
      messages.push(message)
      // AuroraIController.appendMessages([message])
      // AuroraIController.scrollToBottom(true)
    })
    */
    AuroraIController.appendMessages(messages)
    AuroraIController.scrollToBottom(true)

    // for (var i = 0; i < 10; i++) {
    //   var message = constructNormalMessage()
    //   message.msgType = 'custom'

    //   if (Platform.OS === "ios") {
    //     message.content = `
    //     <h5>This is a custom message. </h5>
    //     <img src="file://${RNFS.MainBundlePath}/default_header.png"/>
    //     `
    //   } else {
    //     message.content = '<body bgcolor="#ff3399"><h5>This is a custom message. </h5>\
    //     <img src="/storage/emulated/0/XhsEmoticonsKeyboard/Emoticons/wxemoticons/icon_040_cover.png"></img></body>'
    //   }

    //   var eventMessage = constructNormalMessage()
    //   eventMessage.msgType = "event"
    //   eventMessage.text = 'fsadfad'

    //   message.contentSize = { 'height': 100, 'width': 200 }
    //   message.extras = { "extras": "fdfsf" }
    //   AuroraIController.appendMessages([message, eventMessage])
    //   AuroraIController.scrollToBottom(true)
    // }
  }

  onInputViewSizeChange = (size) => {
    console.log("onInputViewSizeChange height: " + size.height + " width: " + size.width)
    if (this.state.inputLayoutHeight != size.height) {
      this.setState({
        inputLayoutHeight: size.height,
        inputViewLayout: { width: window.width, height: size.height },
        messageListLayout: { flex: 1, width: window.width, margin: 0 }
      })
    }
  }

  componentWillUnmount() {
    AuroraIController.removeMessageListDidLoadListener(this.messageListDidLoadEvent)
  }

  resetMenu() {
    if (Platform.OS === "android") {
      this.refs["ChatInput"].showMenu(false)
      this.setState({
        messageListLayout: { flex: 1, width: window.width, margin: 0 },
        navigationBar: { height: 64, justifyContent: 'center' },
      })
      this.forceUpdate();
    } else {
      AuroraIController.hidenFeatureView(true)
    }
  }

  /**
   * Android need this event to invoke onSizeChanged 
   */
  onTouchEditText = () => {
    this.refs["ChatInput"].showMenu(false)
  }

  onFullScreen = () => {
    console.log("on full screen")
    this.setState({
      messageListLayout: { flex: 0, width: 0, height: 0 },
      inputViewLayout: { flex: 1, width: window.width, height: window.height },
      navigationBar: { height: 0 }
    })
  }

  onRecoverScreen = () => {
    // this.setState({
    //   inputLayoutHeight: 100,
    //   messageListLayout: { flex: 1, width: window.width, margin: 0 },
    //   inputViewLayout: { flex: 0, width: window.width, height: 100 },
    //   navigationBar: { height: 64, justifyContent: 'center' }
    // })
  }

  onAvatarClick = (message) => {
    // Alert.alert()
    AuroraIController.removeMessage(message.msgId)
  }

  onMsgClick(message) {
    console.log(message)
    Alert.alert("message", JSON.stringify(message))
  }

  onMsgLongClick = (message) => {
    Alert.alert('message bubble on long press', 'message bubble on long press')
  }

  onStatusViewClick = (message) => {
    message.status = 'send_succeed'
    AuroraIController.updateMessage(message)
  }

  onBeginDragMessageList = () => {
    this.resetMenu()
    AuroraIController.hidenFeatureView(true)
  }

  onTouchMsgList = () => {
    AuroraIController.hidenFeatureView(true)
  }

  onPullToRefresh = () => {
    console.log("on pull to refresh")
    var messages = []
    for (var i = 0; i < 14; i++) {
      var message:any = constructNormalMessage()
      // if (index%2 == 0) {
      message.msgType = "text"
      message.text = "" + i
      // }

      if (i % 3 == 0) {
        message.msgType = "video"
        message.text = "" + i
        message.mediaPath = "/storage/emulated/0/ScreenRecorder/screenrecorder.20180323101705.mp4"
        message.duration = 12
      }
      messages.push(message)
    }
    AuroraIController.insertMessagesToTop(messages)
    if (Platform.OS === 'android') {
      this.refs["MessageList"].refreshComplete()
    }

  }

  onSendText = (text) => {
    var message = constructNormalMessage()
    // var evenmessage = constructNormalMessage()

    message.msgType = 'text'
    message.text = text
    // await JMessage.sendTextMessage('single',this.props.route.params.id,text,{user:JSON.stringify({...this.props.RootStore.userInfo,type:'chat'})})
    AuroraIController.appendMessages([message])
  }

  onTakePicture = (media) => {
    console.log("media " + JSON.stringify(media))
    var message = constructNormalMessage()
    message.msgType = 'image'
    message.mediaPath = media.mediaPath
    AuroraIController.appendMessages([message])
    this.resetMenu()
    AuroraIController.scrollToBottom(true)
  }

  onStartRecordVoice = (e) => {
    console.log("on start record voice")
  }

  onFinishRecordVoice = (mediaPath, duration) => {
    var message:any = constructNormalMessage()
    message.msgType = "voice"
    message.mediaPath = mediaPath
    message.timeString = "safsdfa"
    message.duration = duration
    AuroraIController.appendMessages([message])
    console.log("on finish record voice")
  }

  onCancelRecordVoice = () => {
    console.log("on cancel record voice")
  }

  onStartRecordVideo = () => {
    console.log("on start record video")
  }

  onFinishRecordVideo = (video) => {
    // var message = constructNormalMessage()

    // message.msgType = "video"
    // message.mediaPath = video.mediaPath
    // message.duration = video.duration
    // AuroraIController.appendMessages([message])
  }

  onSendGalleryFiles = (mediaFiles) => {
    /**
     * WARN: This callback will return original image, 
     * if insert it directly will high memory usage and blocking UI。
     * You should crop the picture before insert to messageList。
     * 
     * WARN: 这里返回的是原图，直接插入大会话列表会很大且耗内存.
     * 应该做裁剪操作后再插入到 messageListView 中，
     * 一般的 IM SDK 会提供裁剪操作，或者开发者手动进行裁剪。
     * 
     * 代码用例不做裁剪操作。
     */
    // Alert.alert('fas', JSON.stringify(mediaFiles))
    console.log(mediaFiles);
    mediaFiles.map(async(v)=>{
      var message = constructNormalMessage()
      if (v.mediaType == "image") {
        message.msgType = "image"
      } else {
        message.msgType = "video"
        message.duration = v.duration
      }

      message.mediaPath = v.mediaPath
      // message.timeString = "8:00"
      // 发送中
      message.status = "send_going"
      AuroraIController.appendMessages([message])
      AuroraIController.scrollToBottom(true)

    //   await JMessage.sendImageMessage('single',this.props.route.params.id,v.mediaPath,{user:JSON.stringify({...this.props.RootStore.userInfo,type:'chat'})})

    //   // 发送完毕
      AuroraIController.updateMessage({...message,status:'send_succeed'})

    })

    this.resetMenu()
  }

  onSwitchToMicrophoneMode = () => {
    AuroraIController.scrollToBottom(true)
  }

  onSwitchToEmojiMode = () => {
    AuroraIController.scrollToBottom(true)
  }
  onSwitchToGalleryMode = () => {
    AuroraIController.scrollToBottom(true)
  }

  onSwitchToCameraMode = () => {
    AuroraIController.scrollToBottom(true)
  }

  onShowKeyboard = (keyboard_height) => {
  }

  updateLayout(layout) {
    this.setState({ inputViewLayout: layout })
  }

  onInitPress() {
    console.log('on click init push ');
    this.updateAction();
  }

  onClickSelectAlbum = () => {
    console.log("on click select album")
  }

  onCloseCamera = () => {
    console.log("On close camera event")
    this.setState({
      inputLayoutHeight: 100,
      messageListLayout: { flex: 1, width: window.width, margin: 0 },
      inputViewLayout: { flex: 0, width: window.width, height: 100 },
      navigationBar: { height: 64, justifyContent: 'center' }
    })
  }

  /**
   * Switch to record video mode or not
   */
  switchCameraMode = (isRecordVideoMode) => {
    console.log("Switching camera mode: isRecordVideoMode: " + isRecordVideoMode)
    // If record video mode, then set to full screen.
    if (isRecordVideoMode) {
      this.setState({
        messageListLayout: { flex: 0, width: 0, height: 0 },
        inputViewLayout: { flex: 1, width: window.width, height: window.height },
        navigationBar: { height: 0 }
      })
    } 
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{zIndex:100,width:"100%",backgroundColor:"#fff",height:64,flexDirection:"row",justifyContent:"space-between",alignItems:'center',paddingLeft:15,paddingRight:15}}
          ref="NavigatorView">
            <Text onPress={()=>this.props.navigation.goBack()
            } style={{fontFamily:"iconfont",width:30,fontSize:18}}>{'\ue600'}</Text>
          <View
            style={styles.sendCustomBtn}
            // title=''
            onPress={() => {
              if (Platform.OS === 'ios') {
                var message:any = constructNormalMessage()
                message.msgType = 'custom'
                message.content = `
                <h5>This is a custom message. </h5>
                <img src="file://${RNFS.MainBundlePath}/default_header.png"/>
                `
                console.log(message.content)
                message.contentSize = { 'height': 100, 'width': 200 }
                message.extras = { "extras": "fdfsf" }
                AuroraIController.appendMessages([message])
                AuroraIController.scrollToBottom(true)
              } else {
                var message = constructNormalMessage()
                message.msgType = "custom"
                message.msgId = "10"
                message.status = "send_going"
                message.isOutgoing = true
                message.content = `
                <body bgcolor="#ff3399">
                  <h5>This is a custom message. </h5>
                  <img src="/storage/emulated/0/XhsEmoticonsKeyboard/Emoticons/wxemoticons/icon_040_cover.png"></img>
                </body>`
                message.contentSize = { 'height': 100, 'width': 200 }
                message.extras = { "extras": "fdfsf" }
                var user = {
                  userId: "1",
                  displayName: "",
                  avatarPath: ""
                }
                user.displayName = "0001"
                user.avatarPath = "ironman"
                message.fromUser = user
                AuroraIController.appendMessages([message]);
              }
            }}>
              <Text style={{fontSize:17}}>昵称</Text>
          </View>
          <Text style={{width:30,fontFamily:"iconfont",textAlign:"right",fontSize:20}}>{'\ueb10'}</Text>
        </View>
        <MessageListView style={this.state.messageListLayout}
          ref="MessageList"
          isAllowPullToRefresh={true}
          onAvatarClick={this.onAvatarClick}
          onMsgClick={this.onMsgClick}
          onStatusViewClick={this.onStatusViewClick}
          onTouchMsgList={this.onTouchMsgList}
          onTapMessageCell={this.onTapMessageCell}
          onBeginDragMessageList={this.onBeginDragMessageList}
          onPullToRefresh={this.onPullToRefresh}
          avatarSize={{ width: 50, height: 50 }}
          avatarCornerRadius={25}
          messageListBackgroundColor={"#f3f3f3"}
          sendBubbleTextSize={18}
          sendBubbleTextColor={"#000000"}
          sendBubblePadding={{ left: 10, top: 10, right: 15, bottom: 10 }}
          datePadding={{ left: 5, top: 5, right: 5, bottom: 5 }}
          dateBackgroundColor={"#F3F3F3"}
          photoMessageRadius={5}
          maxBubbleWidth={0.7}
          videoDurationTextColor={"#ffffff"}
          dateTextColor="#666666"
        />
        <InputView style={this.state.inputViewLayout}
          ref="ChatInput"
          onSendText={this.onSendText}
          onTakePicture={this.onTakePicture}
          onStartRecordVoice={this.onStartRecordVoice}
          onFinishRecordVoice={this.onFinishRecordVoice}
          onCancelRecordVoice={this.onCancelRecordVoice}
          onStartRecordVideo={this.onStartRecordVideo}
          onFinishRecordVideo={this.onFinishRecordVideo}
          onSendGalleryFiles={this.onSendGalleryFiles}
          onSwitchToEmojiMode={this.onSwitchToEmojiMode}
          onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
          onSwitchToGalleryMode={this.onSwitchToGalleryMode}
          onSwitchToCameraMode={this.onSwitchToCameraMode}
          onShowKeyboard={this.onShowKeyboard}
          onTouchEditText={this.onTouchEditText}
          onFullScreen={this.onFullScreen}
          onRecoverScreen={this.onRecoverScreen}
          onSizeChange={this.onInputViewSizeChange}
          closeCamera={this.onCloseCamera}
          switchCameraMode={this.switchCameraMode}
          showSelectAlbumBtn={true}
          showRecordVideoBtn={false}
          onClickSelectAlbum={this.onClickSelectAlbum}
          inputPadding={{ left: 30, top: 10, right: 10, bottom: 10 }}
          galleryScale={0.6}//default = 0.5
          compressionQuality={0.6}
          cameraQuality={0.7}//default = 0.5
          customLayoutItems={{
            left: [],
            right: ['send'],
            bottom: ['voice','gallery','emoji','camera']
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sendCustomBtn: {
      
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputView: {
    backgroundColor: 'green',
    width: window.width,
    height: 100,
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7'
  }
});
