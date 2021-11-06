import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TextInput, GestureResponderEvent } from 'react-native'
import { Slider } from 'react-native-elements';
import Video from 'react-native-video'
import { windowHeight, windowWidth } from '../../../util/style'
import getStringTime  from '../../../util/getStringTime'
let resizeMode: "stretch" | "contain" | "cover" | "none" | undefined;
let videoDate: any
interface VideoInfoProps{
  videoInfo:any,
  onPressError?:Function
}
export default class VideoInfo extends Component<VideoInfoProps, any>{
  constructor(prop: any) {
    super(prop)
    this.state.videoDate = this.props.videoInfo
  }
  player: any
  state = {
    videoDate: videoDate,
    startTime: 0,
    endTime: 0,
    progressBar: false,
    videoHeight: 0,
    videoWidth: 0,
    resizeMode: resizeMode,
    paused: false,
    videoEnd: false,
    isEnd: false,
    videoMount: false,
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ paused: true })
    })
    
  }
  //视频加载时
  onLoad = (event: any) => {

    let videoHeight
    let videoWidth
    let percentage = 0.67
    let resizeMode: "stretch" | "contain" | "cover" | "none" | undefined;

    if (event.naturalSize.width > event.naturalSize.height) {
      let scale = windowWidth / event.naturalSize.width
      videoHeight = event.naturalSize.height * scale
      videoWidth = windowWidth
      resizeMode = 'contain'
    } else {
      let scale = windowWidth / 880
      videoHeight = scale * 554
      videoWidth = event.naturalSize.width * scale
      resizeMode = 'cover'

    }
    this.setState({
      videoHeight,
      videoWidth,
      resizeMode,
      videoMount: true
    })
    this.player.seek(0)
  
  }
  // 更新开始时间和结束时间
  onProgress = (data: any) => {
    this.setState({
      startTime: data.currentTime,
      endTime: data.seekableDuration
    })

  }
  // 显示进度条
  showProgressBar = () => {
    this.setState({
      progressBar: !this.state.progressBar
    })
    setTimeout(() => {
      this.setState({
        progressBar: false
      })
    }, 3000);
  }
  // 进度条发生变化
  onValueChange = (value: any) => {
    this.setState({ startTime: value, isEnd: false }, () => {
      this.player.seek(this.state.startTime)
      this.setState({ paused: false })
    })
  }
  // 视频播放结束
  onEnd = () => {
    this.setState({ paused: true, isEnd: true })
  }

  // 重播
  rebroadcast = () => {
    this.setState({ isEnd: false, paused: false })
    this.player.seek(0)
  }
  onError = (data: any) => {
    console.log(data);
  }

  gotoUserInfo = () => {

  }
  render() {
    const { videoMount, paused, videoDate, isEnd, startTime, endTime, progressBar, videoHeight, videoWidth, resizeMode } = this.state
    return (
      <View style={{opacity: videoMount ? 1 : 0}}>
        <Text onPress={()=>{
          if(this.props.onPressError)
          this.props.onPressError()
        }} style={{ fontFamily: "iconfont", color: "#fff", position: "absolute", zIndex: 20, top: 20, right: 10, fontSize: 30, width: 30, height: 30 }}>{'\ue8e7'}</Text>
        <TouchableOpacity activeOpacity={1} style={{ position: "relative", height: videoHeight, width: "100%", backgroundColor: "#000" }} onPress={this.showProgressBar}>
          <Video source={{uri:videoDate.path}}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}
            progressUpdateInterval={1000}//间隔多少秒触发onProgress事件
            // controls={true} // 显示默认进度条
            disableFocus={true} //禁止后台声音
            // repeat={true} //循环
            muted={true}  //静音
            paused={paused} //暂停
            playInBackground={true}       // 当app转到后台运行的时候，播放是否暂停
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onError={this.onError}
            onProgress={this.onProgress}
            style={{ height: videoHeight, width: videoWidth, alignSelf: 'center' }}
            resizeMode={resizeMode}
            posterResizeMode='contain'
          />
          {
            progressBar ?
              <View style={styles.progressBar}>
                <Text style={{ color: "#fff", marginRight: 5 }}>{getStringTime(startTime + 1)}</Text>
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                  <Slider
                    value={startTime}
                    trackStyle={{ borderWidth: 1, borderColor: '#e6e6e6' }}
                    onValueChange={this.onValueChange}
                    minimumValue={0}
                    maximumValue={endTime - 1}
                    // step={1}
                    allowTouchTrack={true}
                    minimumTrackTintColor='#fff'
                    maximumTrackTintColor='#ccc'
                    thumbTintColor='#fff'
                    thumbStyle={{ width: 10, height: 10 }}
                  />
                </View>
                <Text style={{ color: "#fff", marginLeft: 5 }}>{getStringTime(endTime)}</Text>
              </View> : <></>
          }
          {
            progressBar && !isEnd ?
              <TouchableOpacity style={{ position: 'absolute', zIndex: 100, top: videoHeight / 2 - 40, left: windowWidth / 2 - 20 }}>
                {
                  !paused ?
                    <Text onPress={() => this.setState({ paused: true })} style={{ fontFamily: "iconfont", backgroundColor: '#000', opacity: 0.4, padding: 10, borderRadius: 30, color: '#fff', fontSize: 40 }}>{'\uea6d'}</Text> : <></>
                }
              </TouchableOpacity> : <></>

          }
          {
            !isEnd && paused ?
              <TouchableOpacity style={{ position: 'absolute', zIndex: 10, top: videoHeight / 2 - 40, left: windowWidth / 2 - 20 }}>
                <Text onPress={() => this.setState({ paused: false })} style={{ fontFamily: "iconfont", backgroundColor: '#000', opacity: 0.4, padding: 10, paddingRight: 8, borderRadius: 31, color: '#fff', fontSize: 40 }}>{'\ue622'}</Text>
              </TouchableOpacity> : <></>
          }
          {isEnd ?
            <TouchableOpacity style={{ position: 'absolute', zIndex: 10, top: videoHeight / 2 - 40, left: windowWidth / 2 - 20 }}>
              <Text onPress={this.rebroadcast} style={{ fontFamily: "iconfont", backgroundColor: '#000', opacity: 0.4, padding: 10, borderRadius: 30, color: '#fff', fontSize: 40 }}>{'\ue607'}</Text>
            </TouchableOpacity> : <></>
          }
        </TouchableOpacity>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  progressBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center'
  },
  videoType: {
    flexDirection: 'row',
    alignItems: "center",
    height: 28,
    borderRadius: 14,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ddd'
  }
});