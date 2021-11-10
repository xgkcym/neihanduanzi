import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TextInput, GestureResponderEvent } from 'react-native'
import getStringTime from '../../util/getStringTime'
import { windowHeight, windowWidth } from '../../util/style'
import { Slider, Tooltip, Text as EText } from 'react-native-elements';
import lastTime from '../../util/lastTime'
import SvgUri from 'react-native-svg-uri';
import svgXmlData from '../../util/svgXmlData'
import GobackTitle from '../../compontents/GobackTitle';
import { baseURL } from '../../util/request';
let textInfo: any
export default class TextInfo extends Component<any, any>{
  constructor(prop: any) {
    super(prop)
    this.state.textInfo = this.props.route.params.TextDate
  }
  player: any
  state = {
    textInfo:textInfo,
    commentValue: '', //评论文本
    visible: false //二级评论
  }

  gotoUserInfo = () => {

  }
  render() {
    let commentArr = [1, 2, 3, 4, 5, 6, 7, 7, 8, 865, 7, 765, 657]
    const { visible,textInfo } = this.state
    return (
      <View style={{ flex: 1, position: "relative" ,backgroundColor:"#fff"}}>
        <GobackTitle title='校园论坛' props={this.props}/>
        {/* 昵称开始 */}
        <Text style={{paddingLeft:15,paddingRight:15,fontSize:17,marginTop:10,marginBottom:10}}>{textInfo.title}</Text>
        {
          !visible ?
            <View style={{ flex: 1 }}>
              <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 70 }}>
                  <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{uri:baseURL+textInfo.avatar}} style={styles.avatar} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ marginBottom: 3, fontSize: 16, fontWeight: '800' }}>{textInfo.nickname}</Text>
                      <Text style={{ marginTop: 3, color: "#666" }}>{textInfo.create_time}</Text>
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
                    textInfo.comment.map((v: any) => (
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