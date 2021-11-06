import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TextInput, GestureResponderEvent } from 'react-native'
import Video from 'react-native-video'
import getStringTime from '../../util/getStringTime'
import { windowHeight, windowWidth } from '../../util/style'
import { Slider, Tooltip, Text as EText } from 'react-native-elements';
import lastTime from '../../util/lastTime'
import SvgUri from 'react-native-svg-uri';
import svgXmlData from '../../util/svgXmlData'
let resizeMode: "stretch" | "contain" | "cover" | "none" | undefined;
let videoDate: any
export default class VideoInfo extends Component<any, any>{
  constructor(prop: any) {
    super(prop)
    this.state.videoDate = this.props.route.params.videoInfo
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
    commentValue: '', //评论文本
    visible: false //二级评论
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ paused: true })
    })
  }
  //视频加载时
  onLoad = (event: any) => {
    console.log(event);

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
  gotoVideoInfo = () => {
    this.props.props.navigation.navigate('VideoInfo')
  }

  gotoUserInfo = () => {

  }
  render() {
    let commentArr = [1, 2, 3, 4, 5, 6, 7, 7, 8, 865, 7, 765, 657]
    const { visible, videoMount, paused, videoDate, isEnd, startTime, endTime, progressBar, videoHeight, videoWidth, resizeMode } = this.state
    return (
      <View style={{ opacity: videoMount ? 1 : 0, flex: 1, position: "relative" }}>
        <Text onPress={() => this.props.navigation.goBack()} style={{ fontFamily: "iconfont", color: "#fff", position: "absolute", zIndex: 20, top: 20, left: 15, fontSize: 22, width: 30, height: 30 }}>{'\ue600'}</Text>
        {progressBar ? <Text style={{ fontFamily: "iconfont", color: "#fff", position: "absolute", zIndex: 20, top: 20, right: 10, fontSize: 22, width: 30, height: 30 }}>{'\ueb10'}</Text> : <></>}
        <TouchableOpacity activeOpacity={1} style={{ position: "relative", height: videoHeight, width: "100%", backgroundColor: "#000" }} onPress={this.showProgressBar}>
          <Video source={videoDate.content}   // Can be a URL or a local file.
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
        {/* 昵称开始 */}
        {
          !visible ?
            <View style={{ flex: 1 }}>
              <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 70 }}>
                  <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={require('../../res/avatar.webp')} style={styles.avatar} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ marginBottom: 3, fontSize: 16, fontWeight: '800' }}>昵称</Text>
                      <Text style={{ marginTop: 3, color: "#666" }}>{lastTime(new Date().getTime() - 1000 * 60 * 60 * 14)}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: 55, height: 33, borderRadius: 8, justifyContent: 'center', alignItems: "center", backgroundColor: "#f55" }}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>关注</Text>
                  </TouchableOpacity>
                </View>

              </View>
              <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={styles.videoType}>
                      <Text style={{ fontSize: 18, color: "#f33" }}>#</Text>
                      <Text style={{ marginLeft: 5 }}>视频类型</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                  </View>
                </View>
                {/* 昵称结束 */}
                {/* 评论头部开始 */}
                <View style={{ paddingLeft: 15, paddingRight: 15, height: 45, flexDirection: 'row', justifyContent: "space-between", alignItems: "center", borderBottomColor: "#ddd", borderBottomWidth: 1, borderTopWidth: 5, borderTopColor: "#ddd" }}>
                  <Text style={{ fontSize: 17, fontWeight: '800' }}>评论</Text>
                  <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <SvgUri svgXmlData={svgXmlData.biaotai} width='22' height='22' />
                    <Text style={{ color: "#666" }}>655人表态</Text>
                    <Text style={{ paddingLeft: 5, paddingRight: 5, color: "#666" }}>|</Text>
                    <SvgUri svgXmlData={svgXmlData.chayan} width='23' height='23' />
                    <Text style={{ color: "#666" }}>1532插眼</Text>
                  </View>
                </View>
                {/* 评论头部接受 */}
                {/* 评论开始 */}
                <View style={{ marginLeft: 15, marginRight: 15 }}>
                  {
                    commentArr.map((v: any) => (
                      <TouchableOpacity activeOpacity={1} style={{ flexDirection: "row", marginTop: 20 }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.gotoUserInfo()}>
                          <Image style={styles.avatar} source={require('../../res/avatar.webp')} />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10, flex: 1 }}>
                          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                              <Text style={{ marginRight: 10, fontSize: 15 }}>昵称</Text>
                              <Text style={{ color: "#666" }}>{lastTime(new Date().getTime() - 1000 * 60 * 60 * 1)}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                              <TouchableOpacity style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                                <Text style={{ marginRight: 2 }} >6565</Text>
                                <Text style={{ fontFamily: 'iconfont', fontSize: 16 }}>{'\ue60f'}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                                <Text style={{ marginRight: 2 }} >23</Text>
                                <Text style={{ fontFamily: 'iconfont' }}>{'\ue9a4'}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <Text style={{ fontSize: 16, marginTop: 5 }}>
                            sadddddddddddddddddddddddddddddddddddddddddddddddddddddddqweqwdqwfasfdddddddddddddd
                          </Text>
                          <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            {/* <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, height: 24, justifyContent: "center", alignItems: 'center', backgroundColor: "#ddd", borderRadius: 12 }}>
                              <Text>回复</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, height: 24, justifyContent: "center", alignItems: 'center', backgroundColor: "#ddd", borderRadius: 12 }}>
                              <Text onPress={() => this.setState({ visible: true })} style={{ fontFamily: "iconfont", fontSize: 12 }}>14条回复{'\ue65f'}</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}></View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                   <Text style={{fontSize:17,alignSelf:'center',color:"#666",marginTop:20,marginBottom:10}}>没有更多内容啦~</Text>
                </View>
              </ScrollView>
            </View> :
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', backgroundColor: '#fff', height: 49, alignItems: 'center', justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                <Text style={{ width: 30 }}></Text>
                <Text style={{ fontSize: 18 }}>评论详情</Text>
                <Text onPress={()=>this.setState({visible:false})} style={{ fontFamily: "iconfont", width: 30, fontSize: 24 }}>{'\ue8e7'}</Text>
              </View>
              <ScrollView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
                <TouchableOpacity activeOpacity={1} style={{ paddingLeft: 15, paddingRight: 15, flexDirection: "row", paddingTop: 20, paddingBottom: 20, backgroundColor: "#fff" }}>
                  <TouchableOpacity activeOpacity={1} onPress={() => this.gotoUserInfo()}>
                    <Image style={styles.avatar} source={require('../../res/avatar.webp')} />
                  </TouchableOpacity>
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                      <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ marginRight: 10, fontSize: 15 }}>昵称</Text>
                        <Text style={{ color: "#666" }}>{lastTime(new Date().getTime() - 1000 * 60 * 60 * 1)}</Text>
                      </TouchableOpacity>
                      <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <TouchableOpacity style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                          <Text style={{ marginRight: 2 }} >6565</Text>
                          <Text style={{ fontFamily: 'iconfont', fontSize: 16 }}>{'\ue60f'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                          <Text style={{ marginRight: 2 }} >23</Text>
                          <Text style={{ fontFamily: 'iconfont' }}>{'\ue9a4'}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={{ fontSize: 16, marginTop: 5 }}>
                      sadddddddddddddddddddddddddddddddddddddddddddddddddddddddqweqwdqwfasfdddddddddddddd
                    </Text>
                    {/* <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                      <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, height: 24, justifyContent: "center", alignItems: 'center', backgroundColor: "#ddd", borderRadius: 12 }}>
                        <Text>回复</Text>
                      </TouchableOpacity>

                      <View style={{ flex: 1 }}></View>
                    </View> */}
                  </View>
                </TouchableOpacity>
                {/* 二级评论开始 */}
                <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
                  <Text style={{ height: 50, lineHeight: 50, fontSize: 17, fontWeight: '800', color: "#000" }}>3条评论</Text>
                  {
                    [1, 2, 3].map((v: any) => (
                      <TouchableOpacity activeOpacity={1} style={{ flexDirection: "row", marginBottom: 30 }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.gotoUserInfo()}>
                          <Image style={styles.avatar} source={require('../../res/avatar.webp')} />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10, flex: 1 }}>
                          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                              <Text style={{ marginRight: 10, fontSize: 15 }}>昵称</Text>
                              <Text style={{ color: "#666" }}>{lastTime(new Date().getTime() - 1000 * 60 * 60 * 1)}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                              <TouchableOpacity style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                                <Text style={{ marginRight: 2 }} >6565</Text>
                                <Text style={{ fontFamily: 'iconfont', fontSize: 16 }}>{'\ue60f'}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                                <Text style={{ marginRight: 2 }} >23</Text>
                                <Text style={{ fontFamily: 'iconfont' }}>{'\ue9a4'}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <Text style={{ fontSize: 16, marginTop: 5 }}>
                            sadddddddddddddddddddddddddddddddddddddddddddddddddddddddqweqwdqwfasfdddddddddddddd
                          </Text>
                          <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, height: 24, justifyContent: "center", alignItems: 'center', backgroundColor: "#ddd", borderRadius: 12 }}>
                              <Text>回复</Text>
                            </TouchableOpacity>

                            <View style={{ flex: 1 }}></View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                  <Text style={{fontSize:17,color:"#666",marginBottom:10,alignSelf:"center"}}>没有更多内容啦~</Text>
                </View>
                {/* 二级评论结束 */}
              </ScrollView>
            </View>
        }
        {/* 评论结束 */}

        {/* 底部评论输入框开始 */}
        <View style={styles.InputBox}>
          <TextInput
            onChangeText={(value: any) => this.setState({ commentValue: value })}
            style={{ borderWidth: 2, borderColor: "#ccc", paddingLeft: 15, fontSize: 12, flex: 1, height: 36, borderRadius: 18 }}
          />
          <TouchableOpacity activeOpacity={1} style={{ justifyContent: "center", alignItems: "center", width: 60, height: '100%' }}>
            <Text>评论</Text>
          </TouchableOpacity>
        </View>
        {/* 底部评论输入框接受 */}
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
    paddingLeft: 10,
    paddingRight: 10,
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
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  InputBox: {
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    height: 50,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: "center",
    paddingLeft: 15,
  }
});