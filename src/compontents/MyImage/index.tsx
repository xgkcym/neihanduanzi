import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import { Tooltip } from 'react-native-elements'
import request, { baseURL } from '../../util/request'
import ImageView from './ImageView'
import {connect} from 'react-redux'
import stringfyquery from '../../util/stringfyquery'
import AwesomeAlert from 'react-native-awesome-alerts'
interface MyImageProps{
  gotoImageInfo?:Function,
  imageInfo:any,
  userInfo?:any,
  deleteArticle?:Function,
  gotoUserDetail?:Function
}
let imageInfo:any
class Index extends Component <MyImageProps>{
  constructor(props:any){
    super(props)
    let imageInfo = this.props.imageInfo
    this.state.imageInfo = imageInfo
    let commentNum = imageInfo.comment.length
    for (let i = 0; i < imageInfo.comment.length; i++) {
      commentNum += imageInfo.comment[i].comment.length
    }
    this.state.commentNum = commentNum
  }
  getArtilceInfo = async (article_id: any=this.state.imageInfo.article_id) => {
    const res: any = await request.get(`/article?article_id=${article_id}`)
    if (res.status == 200) {
      this.setState({ imageInfo: { ...res.article[0] } })
    }
  }
  state ={
    imageInfo:imageInfo,
    commentNum:0,
    showAlert:false
  }
  gotoImageInfo = () => {
    if (this.props.gotoImageInfo) {
      this.props.gotoImageInfo()
    }
  }
   // 点赞
   likeArticle = async () => {
    const { imageInfo } = this.state
    if (!imageInfo.islike) {
      await request.post('/like_article', { uid: this.props.userInfo.uid, article_id: imageInfo.article_id })
      await request.delete('/unlike_article' + stringfyquery({ uid: this.props.userInfo.uid, article_id: imageInfo.article_id }))
    } else {
      await request.delete('/like_article' + stringfyquery({ uid: this.props.userInfo.uid, article_id: imageInfo.article_id }))
    }
    this.getArtilceInfo(imageInfo.article_id)
  }
   // 不喜欢
   unlikeArticle = async () => {
    const { imageInfo } = this.state
    if (!imageInfo.isunlike) {
      await request.post('/unlike_article', { uid: this.props.userInfo.uid, article_id: imageInfo.article_id })
      await request.delete('/like_article' + stringfyquery({ uid: this.props.userInfo.uid, article_id: imageInfo.article_id }))
    } else {
      await request.delete('/unlike_article' + stringfyquery({ uid: this.props.userInfo.uid, article_id: imageInfo.article_id }))
    }
    this.getArtilceInfo(imageInfo.article_id)
  }
   // 拉黑
   black = async () => {
    const res = await request.post('/black', { uid: this.props.userInfo.uid, aid: this.state.imageInfo.uid })
    if (res.status == 200) {
      Alert.alert('拉黑用户成功')
    } else {
      Alert.alert('拉黑用户成功')
    }
  }
   //举报文章
   violation = async () => {
    const res = await request.post('/violation_article', { uid: this.props.userInfo.uid, article_id: this.state.imageInfo.article_id })
    if (res.status == 200) {
      Alert.alert('举报文章成功')
    }
  }
  hideAlert = (isdelete:boolean)=>{
    if(isdelete){
      if(this.props.deleteArticle)
      this.props.deleteArticle()
    }
    this.setState({showAlert:false})
  }
  render() {
    const {imageInfo,commentNum,showAlert} = this.state
    return (
      <View style={{borderBottomWidth: 10, borderBottomColor: "#f2f2f2" }}>
        {/* 头像 */}
        <View style={{ flexDirection: "row", position: "relative", justifyContent: "space-between", alignItems: "center", paddingLeft: 10, paddingRight: 10 }}>
          <TouchableOpacity onPress={()=>{if(this.props.gotoUserDetail)this.props.gotoUserDetail()}}  style={{ marginTop: 10, marginBottom: 10, height: 40, flexDirection: "row", alignItems: "center" }}>
            <Image source={{ uri: baseURL + imageInfo.avatar }} style={{ width: 38, height: 38, borderRadius: 19, borderColor: '#e9e9e9', borderWidth: 1 }} />
            <Text style={{ color: "#000", fontSize: 17, marginLeft: 15 }}>{imageInfo.nickname}</Text>
          </TouchableOpacity>
          <View>
            {
              this.props.userInfo.uid != imageInfo.uid ?
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
                </Tooltip> :  <Text onPress={()=>{this.setState({showAlert:true})}}>删除</Text>
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
        { imageInfo.title?<Text style={{paddingLeft:10,paddingBottom:10,fontSize:18}}>{imageInfo.title}</Text>:<></>}
        {/*头像  */}
        <ImageView  imageArr={imageInfo.content} />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.imageType}>
            <Text style={{ fontSize: 18, color: "#f33" }}>#</Text>
            <Text style={{ marginLeft: 5 }}>{imageInfo.article_type}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={{ height: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
          <TouchableOpacity activeOpacity={1} onPress={this.likeArticle} style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "iconfont", color: imageInfo.islike ? '#f00' : '#444', fontSize: 25 }}>{'\ue60f'}</Text>
            <Text style={{ marginLeft: 6, color: imageInfo.islike ? '#f00' : '#444' }}>{imageInfo.likeNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={this.unlikeArticle} style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "iconfont", color: imageInfo.isunlike ? '#f00' : '#444', fontSize: 19 }}>{'\ue9a4'}</Text>
            <Text style={{ marginLeft: 6, color: imageInfo.isunlike ? '#f00' : '#444' }}>{imageInfo.unlikeNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.gotoImageInfo} style={{ flexDirection: "row", alignItems: "center" }}>
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
const MyImage = connect(state=>({userInfo:state.userInfo}),{})(Index)
export default MyImage
const styles = StyleSheet.create({
  imageType: {
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
})