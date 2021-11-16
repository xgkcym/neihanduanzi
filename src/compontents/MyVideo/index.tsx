import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, GestureResponderEvent } from 'react-native'
import Video from 'react-native-video'
import getStringTime from '../../util/getStringTime'
import { windowHeight, windowWidth } from '../../util/style'
import { Slider, Tooltip, Text as EText } from 'react-native-elements';
import request, { baseURL } from '../../util/request'
import { connect } from 'react-redux'
import stringfyquery from '../../util/stringfyquery'
import { Alert } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import TransitionEmoji from '../TransitionEmoji'
let resizeMode: "stretch" | "contain" | "cover" | "none" | undefined;
interface MyVideoProps {
  VideoDate?: any,
  gotoVideoInfo?: Function,
  userInfo?: any,
  deleteArticle?: Function,
  gotoUserDetail?: Function
}
let videoDate: any
class Index extends Component<MyVideoProps, any>{
  constructor(prop: any) {
    super(prop)
    let VideoDate = this.props.VideoDate
    this.state.videoDate = VideoDate
    let commentNum = VideoDate.comment.length
    for (let i = 0; i < VideoDate.comment.length; i++) {
      commentNum += VideoDate.comment[i].comment.length
    }
    this.state.commentNum = commentNum
  }
  getArtilceInfo = async (article_id: any) => {
    const res: any = await request.get(`/article?article_id=${article_id}`)
    if (res.status == 200) {
      this.setState({ videoDate: { ...res.article[0] } })
    }
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
    paused: true,
    videoEnd: false,
    isEnd: false,
    videoMount: false,
    commentNum: 0,
    showAlert: false
  }
  componentDidMount() {


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
      let scale = windowWidth / event.naturalSize.width * percentage
      videoHeight = event.naturalSize.height * scale
      videoWidth = windowWidth * percentage
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
  gotoVideoInfo = () => {
    if (this.props.gotoVideoInfo) {
      this.props.gotoVideoInfo()
    }
  }
  // 点赞
  likeArticle = async () => {
    const { videoDate } = this.state
    if (!videoDate.islike) {
      await request.post('/like_article', { uid: this.props.userInfo.uid, article_id: videoDate.article_id })
      await request.delete('/unlike_article' + stringfyquery({ uid: this.props.userInfo.uid, article_id: videoDate.article_id }))
    } else {
      await request.delete('/like_article' + stringfyquery({ uid: this.props.userInfo.uid, article_id: videoDate.article_id }))
    }
    this.getArtilceInfo(videoDate.article_id)
  }
  // 不喜欢
  unlikeArticle = async () => {
    const { videoDate } = this.state
    if (!videoDate.isunlike) {
      await request.post('/unlike_article', { uid: this.props.userInfo.uid, article_id: videoDate.article_id })
      await request.delete('/like_article' + stringfyquery({ uid: this.props.userInfo.uid, article_id: videoDate.article_id }))
    } else {
      await request.delete('/unlike_article' + stringfyquery({ uid: this.props.userInfo.uid, article_id: videoDate.article_id }))
    }
    this.getArtilceInfo(videoDate.article_id)
  }
  // 拉黑
  black = async () => {
    const res = await request.post('/black', { uid: this.props.userInfo.uid, aid: this.state.videoDate.uid })
    if (res.status == 200) {
      Alert.alert('拉黑用户成功')
    } else {
      Alert.alert('拉黑用户成功')
    }
  }

  //举报文章
  violation = async () => {
    const res = await request.post('/violation_article', { uid: this.props.userInfo.uid, article_id: this.state.videoDate.article_id })
    if (res.status == 200) {
      Alert.alert('举报文章成功')
    }
  }
  hideAlert = (isdelete: boolean) => {
    if (isdelete) {
      if (this.props.deleteArticle)
        this.props.deleteArticle()
    }
    this.setState({ showAlert: false })
  }
  render() {
    const { showAlert, commentNum, videoMount, paused, videoDate, isEnd, startTime, endTime, progressBar, videoHeight, videoWidth, resizeMode } = this.state
    return (
      <View style={{ opacity: videoMount ? 1 : 0, borderBottomWidth: 10, borderBottomColor: "#f2f2f2" }}>
        <View style={{ flexDirection: "row", position: "relative", justifyContent: "space-between", alignItems: "center", paddingLeft: 10, paddingRight: 10 }}>
          <TouchableOpacity onPress={() => { if (this.props.gotoUserDetail) this.props.gotoUserDetail() }} style={{ marginTop: 10, marginBottom: 10, height: 40, flexDirection: "row", alignItems: "center" }}>
            <Image source={{ uri: baseURL + videoDate.avatar }} style={{ width: 38, height: 38, borderRadius: 19, borderColor: '#e9e9e9', borderWidth: 1 }} />
            <Text style={{ color: "#000", fontSize: 17, marginLeft: 15 }}>{videoDate.nickname}</Text>
          </TouchableOpacity>
          <View>
            {
              this.props.userInfo.uid != videoDate.uid ?
                <Tooltip
                  overlayColor='rgba(0, 0, 0, 0.70)'
                  backgroundColor='#fff'
                  width={200}
                  skipAndroidStatusBar={true}
                  height={100}
                  popover={
                    <View style={{ flex: 1, width: "100%", justifyContent: 'space-around' }}>
                      <Text onPress={this.black} style={{ fontFamily: 'iconfont', borderBottomColor: '#ccc', borderBottomWidth: 1, padding: 10, fontSize: 16, color: "#666" }}>{'\ue627'}  拉黑用户</Text>
                      <Text onPress={this.violation} style={{ fontFamily: 'iconfont', padding: 10, fontSize: 16, color: "#666" }}>{'\ue66b'}  举报内容</Text>
                    </View>
                  }
                >
                  <Text style={{ fontFamily: "iconfont", fontSize: 18, marginRight: 5 }}>{'\ue65e'}</Text>
                </Tooltip> : <Text onPress={() => { this.setState({ showAlert: true }) }}>删除</Text>
            }
            {/* 弹窗开始 */}
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="提示"
              message="确实删除此评论吗?"
              // animatedValue={0}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="删除"
              confirmText="取消"
              // confirmButtonColor="#DD6B55"
              onCancelPressed={() => {
                this.hideAlert(true);
              }}
              onConfirmPressed={() => {
                this.hideAlert(false);
              }}
            />
            {/* 弹窗结束 */}
          </View>
        </View>
        {videoDate.title ?
          <TransitionEmoji
            value={videoDate.title}
            style={{ paddingLeft: 10, paddingBottom: 10 }}
            fontStyle={{fontSize:18}}
          /> : <></>
        }
        <TouchableOpacity activeOpacity={1} style={{ position: "relative", height: videoHeight, width: "100%", backgroundColor: "#000" }} onPress={this.showProgressBar}>
          <Video source={{ uri: baseURL + videoDate.content[0] }}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}
            progressUpdateInterval={1000}//间隔多少秒触发onProgress事件
            // controls={true} // 显示默认进度条
            disableFocus={true} //禁止后台声音
            // repeat={true} //循环
            muted={false}  //静音
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
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.videoType}>
            <Text style={{ fontSize: 18, color: "#f33" }}>#</Text>
            <Text style={{ marginLeft: 5 }}>{videoDate.article_type}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={{ height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
          <TouchableOpacity activeOpacity={1} onPress={this.likeArticle} style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "iconfont", color: videoDate.islike ? '#f00' : '#444', fontSize: 25 }}>{'\ue60f'}</Text>
            <Text style={{ marginLeft: 6, color: videoDate.islike ? '#f00' : '#444' }}>{videoDate.likeNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={this.unlikeArticle} style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "iconfont", color: videoDate.isunlike ? '#f00' : '#444', fontSize: 19 }}>{'\ue9a4'}</Text>
            <Text style={{ marginLeft: 6, color: videoDate.isunlike ? '#f00' : '#444' }}>{videoDate.unlikeNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.gotoVideoInfo} style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "iconfont", color: '#444', fontSize: 21 }}>{'\ue60d'}</Text>
            <Text style={{ marginLeft: 6 }}>{commentNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "iconfont", color: '#444', fontSize: 23 }}>{'\ue8b0'}</Text>
            <Text style={{ marginLeft: 6 }}>10</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const MyVideo = connect(state => ({ userInfo: state.userInfo }))(Index)
export default MyVideo
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
    marginTop: 10,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ddd'
  }
});