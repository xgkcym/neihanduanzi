import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Tooltip } from 'react-native-elements'
import { baseURL } from '../../util/request'
import ImageView from './ImageView'
interface MyImageProps{
  gotoImageInfo?:Function,
  imageInfo:any
}
let imageInfo:any
export default class MyImage extends Component <MyImageProps>{
  constructor(props:any){
    super(props)
    this.state.imageInfo = this.props.imageInfo
  }
  state ={
    imageInfo:imageInfo
  }
  gotoImageInfo = () => {
  }
  render() {
    const {imageInfo} = this.state
    return (
      <View style={{borderBottomWidth: 10, borderBottomColor: "#f2f2f2" }}>
        {/* 头像 */}
        <View style={{ flexDirection: "row", position: "relative", justifyContent: "space-between", alignItems: "center", paddingLeft: 10, paddingRight: 10 }}>
          <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, height: 40, flexDirection: "row", alignItems: "center" }}>
            <Image source={{uri:baseURL+imageInfo.avatar}} style={{ width: 38, height: 38, borderRadius: 19, borderColor: '#e9e9e9', borderWidth: 1 }} />
            <Text style={{ color: "#000", fontSize: 17, marginLeft: 15 }}>揽月</Text>
          </TouchableOpacity>
          <View>
            <Tooltip
              overlayColor='rgba(0, 0, 0, 0.70)'
              backgroundColor='#fff'
              width={200}
              skipAndroidStatusBar={true}
              height={100}
              popover={
                <View style={{ flex: 1, width: "100%", justifyContent: 'space-around' }}>
                  <Text style={{ fontFamily: 'iconfont', borderBottomColor: '#ccc', borderBottomWidth: 1, padding: 10, fontSize: 16, color: "#666" }}>{'\ue627'}  拉黑用户</Text>
                  <Text style={{ fontFamily: 'iconfont', padding: 10, fontSize: 16, color: "#666" }}>{'\ue66b'}  举报内容</Text>
                </View>
              }
            >
              <Text style={{ fontFamily: "iconfont", fontSize: 18, marginRight: 5 }}>{'\ue65e'}</Text>
            </Tooltip>
          </View>
        </View>
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
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "iconfont", color: '#444', fontSize: 25 }}>{'\ue60f'}</Text>
            <Text style={{ marginLeft: 6 }}>{imageInfo.likeNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "iconfont", color: '#444', fontSize: 19 }}>{'\ue9a4'}</Text>
            <Text style={{ marginLeft: 6 }}>{imageInfo.unlikeNum}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{if(this.props.gotoImageInfo)this.props.gotoImageInfo()}} style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "iconfont", color: '#444', fontSize: 21 }}>{'\ue60d'}</Text>
            <Text style={{ marginLeft: 6 }}>{imageInfo.comment.length}</Text>
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