import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TextInput, GestureResponderEvent, Alert } from 'react-native'
import getStringTime from '../../util/getStringTime'
import { windowHeight, windowWidth } from '../../util/style'
import { Slider, Tooltip, Text as EText } from 'react-native-elements';
import lastTime, { lastTimeStr } from '../../util/lastTime'
import SvgUri from 'react-native-svg-uri';
import svgXmlData from '../../util/svgXmlData'
import GobackTitle from '../../compontents/GobackTitle';
import request, { baseURL } from '../../util/request';
import stringfyquery from '../../util/stringfyquery';
import AwesomeAlert from 'react-native-awesome-alerts';
import {connect} from 'react-redux'
import TransitionEmoji from '../../compontents/TransitionEmoji';
let textInfo: any
let comment2Date: any = null
let comment2user: any = null
class Index extends Component<any, any>{
  constructor(prop: any) {
    super(prop)
    this.state.textInfo = this.props.route.params.TextDate
  }
  getArtilceInfo = async (article_id: any = this.state.textInfo.article_id) => {
    const { comment2Date } = this.state
    const res: any = await request.get(`/article?article_id=${article_id}`)
    if (res.status == 200) {
      let comment: any = res.article[0].comment.filter((v: any) => {
        if (comment2Date) {
          return v.comment_id == comment2Date.comment_id
        }
        return v
      })
      this.setState({ textInfo: { ...res.article[0] }, comment2Date: comment[0] })
    }
  }
  commentinput: any
  state = {
    textInfo:textInfo,
    commentValue: '', //评论文本
    visible: false, //二级评论
    comment2Date: comment2Date,
    comment2placeholder: '',
    comment2user: comment2user,//保存点击用户进行评论,
    showAlert: false,
    deletecomment_id: '',
    showAlert2: false
  }

  gotoUserDetail = (uid:any) => {
    this.props.navigation.navigate('UserDetail', { uid })
  }
  // 关注
  attention = async () => {
    const res = await request.post('/attention', { uid: this.props.userInfo.uid, aid: this.state.textInfo.uid })
    if (res.status == 200) {
      Alert.alert('关注用户成功')
    } else {
      Alert.alert('已关注')
    }
  }
  hideAlert = async (isdelete?: Boolean) => {
    const { visible, textInfo, deletecomment_id, comment2Date } = this.state

    if (visible) {
      if (isdelete) {
        const res = await request.delete(`/comment2?comment2_id=${deletecomment_id}`)
        if (res.status == 200) {
          this.getArtilceInfo(textInfo.article_id)
          this.setState({
            showAlert2: false,
          });
        }
      }
    } else {
      if (isdelete) {
        const res = await request.delete(`/comment?comment_id=${deletecomment_id}`)
        if (res.status == 200) {
          this.getArtilceInfo(textInfo.article_id)
          this.setState({
            showAlert: false,
          });
        }
      }
    }
  };

  // 提交评论
  postComment = async () => {
    const { commentValue, textInfo, comment2placeholder, comment2user, visible, comment2Date } = this.state
    if (visible) {
      const res = await request.post('/comment2', { uid: this.props.userInfo.uid, aid: comment2Date.uid, article_id: textInfo.article_id, text: commentValue, comment_id: comment2Date.comment_id })
      if (res.status == 200) {
        Alert.alert('评论成功')
      } else {
        Alert.alert('评论失败')
      }
      this.commentinput.blur()
      this.setState({ commentValue: "" })
    } else {
      if (comment2user) {
        const res = await request.post('/comment2', { uid: this.props.userInfo.uid, aid: comment2user.uid, article_id: textInfo.article_id, text: commentValue, comment_id: comment2user.comment_id })
        if (res.status == 200) {
          Alert.alert('评论成功')
        } else {
          Alert.alert('评论失败')
        }
        this.commentinput.blur()
        this.setState({ commentValue: "" })
      } else {
        if (commentValue.trim().length > 0) {
          const res = await request.post('/comment', { uid: this.props.userInfo.uid, aid: textInfo.uid, article_id: textInfo.article_id, text: commentValue })
          if (res.status == 200) {
            Alert.alert('评论成功')
          } else {
            Alert.alert('评论失败')
          }
          this.commentinput.blur()
          this.setState({ commentValue: "" })
        }
      }

    }
    this.getArtilceInfo(textInfo.article_id)
  }
  // 获取二级评论
  comment2data = (comment: any) => {
    this.setState({ comment2Date: comment, visible: true })
  }
  postusercomment = (comment2user: any, comment2placeholder: any) => {
    this.setState({ comment2user, comment2placeholder })
    this.commentinput.focus()
  }

  // 点赞评论
  likeComment = async (comment: any) => {
    const { visible } = this.state
    if (!visible) {
      if (!comment.islike) {
        await request.post('/like_comment', { uid: this.props.userInfo.uid, comment_id: comment.comment_id })
        await request.delete('/unlike_comment' + stringfyquery({ uid: this.props.userInfo.uid, comment_id: comment.comment_id }))
      } else {
        await request.delete('/like_comment' + stringfyquery({ uid: this.props.userInfo.uid, comment_id: comment.comment_id }))
      }
    } else {
      if (!comment.islike) {
        await request.post('/like_comment', { uid: this.props.userInfo.uid, comment_id: comment.comment2_id })
        await request.delete('/unlike_comment' + stringfyquery({ uid: this.props.userInfo.uid, comment_id: comment.comment2_id }))
      } else {
        await request.delete('/like_comment' + stringfyquery({ uid: this.props.userInfo.uid, comment_id: comment.comment2_id }))
      }
    }

    this.getArtilceInfo()
  }
  //不喜欢评论
  unlikeComment = async (comment: any) => {
    const { visible } = this.state
    if (!visible) {
      if (!comment.isunlike) {
        await request.post('/unlike_comment', { uid: this.props.userInfo.uid, comment_id: comment.comment_id })
        await request.delete('/like_comment' + stringfyquery({ uid: this.props.userInfo.uid, comment_id: comment.comment_id }))
      } else {
        await request.delete('/unlike_comment' + stringfyquery({ uid: this.props.userInfo.uid, comment_id: comment.comment_id }))
      }
    } else {
      if (!comment.isunlike) {
        await request.post('/unlike_comment', { uid: this.props.userInfo.uid, comment_id: comment.comment2_id })
        await request.delete('/like_comment' + stringfyquery({ uid: this.props.userInfo.uid, comment_id: comment.comment2_id }))
      } else {
        await request.delete('/unlike_comment' + stringfyquery({ uid: this.props.userInfo.uid, comment_id: comment.comment2_id }))
      }
    }

    this.getArtilceInfo()
  }
  render() {
    const { comment2placeholder,commentValue,showAlert2,showAlert,visible,textInfo ,comment2Date} = this.state
    return (
      <View style={{ flex: 1, position: "relative" ,backgroundColor:"#fff"}}>
        <GobackTitle title='校园论坛' props={this.props}/>
        {/* 昵称开始 */}
        {textInfo.title ?
          <TransitionEmoji
            value={textInfo.title}
            style={{ paddingLeft: 10, paddingBottom: 10 }}
            fontStyle={{ fontSize: 18 }}
          /> : <></>
        }
        {
           !visible ?
           <View style={{ flex: 1 }}>
             <View style={{ paddingLeft: 15, paddingRight: 15 }}>
               <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 70 }}>
                 <TouchableOpacity onPress={()=>this.gotoUserDetail(textInfo.uid)} style={{ flexDirection: "row", alignItems: "center" }}>
                   <Image source={{ uri: baseURL + textInfo.avatar }} style={styles.avatar} />
                   <View style={{ marginLeft: 10 }}>
                     <Text style={{ marginBottom: 3, fontSize: 16, fontWeight: '800' }}>{textInfo.nickname}</Text>
                     <Text style={{ marginTop: 3, color: "#666" }}>{lastTimeStr(textInfo.create_time)}</Text>
                   </View>
                 </TouchableOpacity>
                 {
                   this.props.userInfo.uid != textInfo.uid ?
                     <TouchableOpacity activeOpacity={1} onPress={this.attention} style={{ width: 55, height: 33, borderRadius: 8, justifyContent: 'center', alignItems: "center", backgroundColor: "#f55" }}>
                       <Text style={{ color: "#fff", fontSize: 16 }}>关注</Text>
                     </TouchableOpacity> : <TouchableOpacity activeOpacity={1} style={{ width: 55, height: 33, borderRadius: 8, justifyContent: 'center', alignItems: "center", backgroundColor: "#3366FF" }}>
                       <Text style={{ color: "#fff", fontSize: 16 }}>作者</Text>
                     </TouchableOpacity>
                 }
               </View>

             </View>
             <ScrollView style={{ flex: 1 }}>
               <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
                 <View style={{ flexDirection: "row" }}>
                   <TouchableOpacity style={styles.videoType}>
                     <Text style={{ fontSize: 18, color: "#f33" }}>#</Text>
                     <Text style={{ marginLeft: 5 }}>{textInfo.article_type}</Text>
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

                   textInfo.comment.map((v: any) => (
                     <TouchableOpacity activeOpacity={1} key={v.comment_id} style={{ flexDirection: "row", marginTop: 20 }}>
                       <TouchableOpacity activeOpacity={1} onPress={() => this.gotoUserDetail(v.uid)}>
                         <Image style={styles.avatar} source={{ uri: baseURL + v.avatar }} />
                       </TouchableOpacity>
                       <TouchableOpacity onPress={() => this.postusercomment({ uid: v.uid, nickname: v.nickname, comment_id: v.comment_id }, `评论${v.nickname}用户`)} style={{ marginLeft: 10, flex: 1 }}>
                         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                           <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                             <Text style={{ marginRight: 10, fontSize: 15, }}>{v.nickname}</Text>
                             <Text style={{ color: "#666" }}>{lastTimeStr(v.create_time)}</Text>
                           </TouchableOpacity>
                           <View style={{ flexDirection: "row", alignItems: 'center' }}>
                             <TouchableOpacity onPress={() => this.likeComment(v)} style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                               <Text style={{ marginRight: 2, color: v.islike ? '#f00' : '#444' }} >{v.likeNum}</Text>
                               <Text style={{ fontFamily: 'iconfont', fontSize: 16, color: v.islike ? '#f00' : '#444' }}>{'\ue60f'}</Text>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={() => this.unlikeComment(v)} style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                               <Text style={{ marginRight: 2, color: v.isunlike ? '#f00' : '#444' }} >{v.unlikeNum}</Text>
                               <Text style={{ fontFamily: 'iconfont', color: v.isunlike ? '#f00' : '#444' }}>{'\ue9a4'}</Text>
                             </TouchableOpacity>
                           </View>
                         </View>
                         <Text style={{ fontSize: 16, marginTop: 5 }}>
                           {v.text}
                         </Text>
                         <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10, alignItems: 'center' }}>
                           {v.comment.length == 0 ? <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, height: 24, justifyContent: "center", alignItems: 'center', backgroundColor: "#ddd", borderRadius: 12 }}>
                             <Text>回复</Text>
                           </TouchableOpacity> : <TouchableOpacity activeOpacity={1} onPress={() => this.comment2data(v)} style={{ paddingLeft: 7, paddingRight: 7, height: 24, justifyContent: "center", alignItems: 'center', backgroundColor: "#ddd", borderRadius: 12 }}>
                             <Text style={{ fontFamily: "iconfont", fontSize: 12 }}>{v.comment.length}条回复{'\ue65f'}</Text>
                           </TouchableOpacity>}
                           <View style={{ flex: 1 }}></View>
                           <Text onPress={() => this.setState({ showAlert: true, deletecomment_id: v.comment_id })}>删除</Text>
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
                       </TouchableOpacity>
                     </TouchableOpacity>
                   ))
                 }
                 <Text style={{ fontSize: 17, alignSelf: 'center', color: "#666", marginTop: 20, marginBottom: 10 }}>没有更多内容啦~</Text>
               </View>
             </ScrollView>
           </View> :
           <View style={{ flex: 1 }}>
             <View style={{ flexDirection: 'row', backgroundColor: '#fff', height: 49, alignItems: 'center', justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
               <Text style={{ width: 30 }}></Text>
               <Text style={{ fontSize: 18 }}>评论详情</Text>
               <Text onPress={() => this.setState({ visible: false })} style={{ fontFamily: "iconfont", width: 30, fontSize: 24 }}>{'\ue8e7'}</Text>
             </View>
             <ScrollView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
               <TouchableOpacity activeOpacity={1} style={{ paddingLeft: 15, paddingRight: 15, flexDirection: "row", paddingTop: 20, paddingBottom: 20, backgroundColor: "#fff" }}>
                 <TouchableOpacity activeOpacity={1} onPress={() => this.gotoUserDetail(comment2Date.uid)}>
                   <Image style={styles.avatar} source={{ uri: baseURL + comment2Date.avatar }} />
                 </TouchableOpacity>
                 <View style={{ marginLeft: 10, flex: 1 }}>
                   <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                     <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                       <Text style={{ marginRight: 10, fontSize: 15 }}>{comment2Date.nickname}</Text>
                       <Text style={{ color: "#666" }}>{lastTime(new Date().getTime() - 1000 * 60 * 60 * 1)}</Text>
                     </TouchableOpacity>
                     <View style={{ flexDirection: "row", alignItems: 'center' }}>
                       <TouchableOpacity onPress={() => this.likeComment(comment2Date)} style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                         <Text style={{ marginRight: 2, color: comment2Date.islike ? '#f00' : '#000' }} >{comment2Date.likeNum}</Text>
                         <Text style={{ fontFamily: 'iconfont', fontSize: 16, color: comment2Date.islike ? '#f00' : '#000' }}>{'\ue60f'}</Text>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={() => this.unlikeComment(comment2Date)} style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                         <Text style={{ marginRight: 2, color: comment2Date.isunlike ? '#f00' : '#000' }} >{comment2Date.unlikeNum}</Text>
                         <Text style={{ fontFamily: 'iconfont', color: comment2Date.isunlike ? '#f00' : '#000' }}>{'\ue9a4'}</Text>
                       </TouchableOpacity>
                     </View>
                   </View>
                   <Text style={{ fontSize: 16, marginTop: 5 }}>
                     {comment2Date.text}
                   </Text>

                 </View>
               </TouchableOpacity>
               {/* 二级评论开始 */}
               <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
                 <Text style={{ height: 50, lineHeight: 50, fontSize: 17, fontWeight: '800', color: "#000" }}>{comment2Date.comment.length}条评论</Text>
                 {
                   comment2Date.comment.map((v: any) => (
                     <TouchableOpacity activeOpacity={1} key={v.comment2_id} style={{ flexDirection: "row", marginBottom: 30 }}>
                       <TouchableOpacity activeOpacity={1} onPress={() => this.gotoUserDetail(v.uid)}>
                         <Image style={styles.avatar} source={{ uri: baseURL + v.avatar }} />
                       </TouchableOpacity>
                       <TouchableOpacity onPress={() => this.postusercomment({ uid: v.uid, nickname: v.nickname, comment_id: v.comment_id }, `评论${v.nickname}用户`)} style={{ marginLeft: 10, flex: 1 }}>
                         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                           <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                             <Text style={{ marginRight: 10, fontSize: 15 }}>{v.nickname}</Text>
                             <Text style={{ color: "#666" }}>{lastTime(new Date().getTime() - 1000 * 60 * 60 * 1)}</Text>
                           </TouchableOpacity>
                           <View style={{ flexDirection: "row", alignItems: 'center' }}>
                             <TouchableOpacity onPress={() => this.likeComment(v)} style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                               <Text style={{ marginRight: 2, color: v.islike ? "#f00" : '#000' }} >{v.likeNum}</Text>
                               <Text style={{ fontFamily: 'iconfont', fontSize: 16, color: v.islike ? "#f00" : '#000' }}>{'\ue60f'}</Text>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={() => this.unlikeComment(v)} style={{ width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end" }}>
                               <Text style={{ marginRight: 2, color: v.isunlike ? "#f00" : '#000' }} >{v.unlikeNum}</Text>
                               <Text style={{ fontFamily: 'iconfont', color: v.isunlike ? "#f00" : '#000' }}>{'\ue9a4'}</Text>
                             </TouchableOpacity>
                           </View>
                         </View>
                         <Text style={{ fontSize: 16, marginTop: 5 }}>
                           {v.text}
                         </Text>
                         <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                           <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, height: 24, justifyContent: "center", alignItems: 'center', backgroundColor: "#ddd", borderRadius: 12 }}>
                             <Text>回复</Text>
                           </TouchableOpacity>
                           <View style={{ flex: 1 }}></View>
                           <Text onPress={() => this.setState({ showAlert2: true, deletecomment_id: v.comment2_id })}>删除</Text>
                           {/* 弹窗开始 */}
                           <AwesomeAlert
                             show={showAlert2}
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
                       </TouchableOpacity>
                     </TouchableOpacity>
                   ))
                 }
                 <Text style={{ fontSize: 17, color: "#666", marginBottom: 10, alignSelf: "center" }}>没有更多内容啦~</Text>
               </View>
               {/* 二级评论结束 */}
             </ScrollView>
           </View>
       }
       {/* 评论结束 */}

       {/* 底部评论输入框开始 */}
       <View style={styles.InputBox}>
         <TextInput
           ref={ref => this.commentinput = ref}
           onBlur={() => this.setState({ comment2placeholder: '', comment2user: null })}
           placeholder={comment2placeholder ? comment2placeholder : ''}
           value={commentValue}
           onChangeText={(value: any) => this.setState({ commentValue: value })}
           style={{ borderWidth: 2, borderColor: "#ccc", paddingLeft: 15, fontSize: 12, flex: 1, height: 36, borderRadius: 18 }}
         />
         <TouchableOpacity activeOpacity={1} onPress={this.postComment} style={{ justifyContent: "center", alignItems: "center", width: 60, height: '100%' }}>
           <Text>评论</Text>
         </TouchableOpacity>
       </View>
       {/* 底部评论输入框接受 */}
      </View>
    )
  }
}
const TextInfo = connect(state=>({userInfo:state.userInfo}))(Index)
export default TextInfo
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