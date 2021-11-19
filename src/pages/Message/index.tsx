import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { asyncSetMessage } from '../../redux/actions/jmessage';
import JMessage from '../../util/JMessage';
import lastTime, { lastTimeStr } from '../../util/lastTime';
import request, { baseURL } from '../../util/request';
import stringfyquery from '../../util/stringfyquery';
class Index extends Component<any, any> {
  gotoChat = () => {
    this.props.navigation.navigate('Chat')
  }
  componentDidMount() {
    this.props.asyncSetMessage()
    // setInterval(() => {
    //   this.props.asyncSetMessage()
    // }, 500)
  }
  transText = (type: any, msg: any) => {
    if (type == 'text') {
      return <Text style={{ color: '#666' }}>{msg}</Text>;
    } else if (type == 'image') {
      return <Text style={{ color: '#666' }}>图片</Text>;
    }
  }
  render() {
    console.log(this.props.jmessage);
    
    return (
      <View>
        <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
        <ImageBackground
          source={require('../../res/category.webp')}
          style={{ height: 70, justifyContent: 'center' }}>
          <View
            style={{
              alignItems: 'center',
              // justifyContent: 'center',
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <Text style={{ color: '#fff', fontSize: 20 }}>消息</Text>
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            height: 140,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: 'space-around',
            alignItems: 'center',
            borderBottomWidth: 5,
            borderBottomColor: '#D3D3D3',
          }}>
          <TouchableOpacity
            style={{ ...style.iconBtn, backgroundColor: '#00BFFF' }}>
            <Text style={{ fontFamily: "iconfont", color: "#fff", fontSize: 30 }}>{'\ue604'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.iconBtn, backgroundColor: '#FF4500' }}>
            <Text style={{ fontFamily: "iconfont", color: "#fff", fontSize: 32 }}>{'\ue605'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.iconBtn, backgroundColor: '#48D1CC' }}>
            <Text style={{ fontFamily: "iconfont", color: "#fff", fontSize: 28 }}>{'\ue60d'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.iconBtn, backgroundColor: '#FFD700' }}>
            <Text style={{ fontFamily: "iconfont", color: "#fff", fontSize: 32 }}>{'\ue62d'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {
            this.props.jmessage.map((v: any,i:any) => {
              if (!v.latestMessage) {
                return <View key={i}></View>;
              }
              return (
                <TouchableOpacity key={v.userInfo.uid} onPress={() => this.props.navigation.navigate('Chat', { uid: v.userInfo.uid })} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, height: 80, borderBottomColor: "#ddd", borderBottomWidth: 3 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: baseURL + v.userInfo.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                    <View>
                      <Text style={{ marginBottom: 5, color: "#333", fontSize: 16 }}>{v.userInfo.nickname}</Text>
                      {this.transText(
                        v.latestMessage.type,
                        v.latestMessage.text,
                      )}
                    </View>
                  </View>
                  <View>
                    {
                      v.latestMessage.unreceiptCount != 0 ?
                        <View style={{ marginBottom: 5, justifyContent: "center", alignItems: 'center', alignSelf: "flex-end", width: 18, height: 18, borderRadius: 9, backgroundColor: "#f00" }}>
                          <Text style={{ color: "#fff", fontSize: 12 }}>{v.latestMessage.unreceiptCount}</Text>
                        </View> : <View style={{ marginBottom: 5, justifyContent: "center", alignItems: 'center', alignSelf: "flex-end", width: 18, height: 18, borderRadius: 9 }}>
                          <Text style={{ color: "#fff", fontSize: 12 }}></Text>
                        </View>
                    }
                    <Text style={{ marginTop: 5, color: "#666" }}>{lastTimeStr(v.latestMessage.createTime)}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }

        </ScrollView>
      </View>
    );
  }
}
const Message = connect(state => ({ userInfo: state.userInfo, jmessage: state.jmessage }), { asyncSetMessage })(Index)
export default Message
const style = StyleSheet.create({
  iconBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
