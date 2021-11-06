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
import JMessage from '../../util/JMessage';
import lastTime from '../../util/lastTime';
export default class index extends Component<any, any> {
  gotoChat = () => {
    this.props.navigation.navigate('Chat')
  }
  render() {
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
            <Text style={{fontFamily:"iconfont",color:"#fff",fontSize:30}}>{'\ue604'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.iconBtn, backgroundColor: '#FF4500' }}>
            <Text style={{fontFamily:"iconfont",color:"#fff",fontSize:32}}>{'\ue605'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.iconBtn, backgroundColor: '#48D1CC' }}>
            <Text style={{fontFamily:"iconfont",color:"#fff",fontSize:28}}>{'\ue60d'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...style.iconBtn, backgroundColor: '#FFD700' }}>
            <Text style={{fontFamily:"iconfont",color:"#fff",fontSize:32}}>{'\ue62d'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <TouchableOpacity onPress={this.gotoChat} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, height: 80, borderBottomColor: "#ddd", borderBottomWidth: 3 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require('../../res/category.webp')} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
              <View>
                <Text style={{ marginBottom: 5, color: "#333", fontSize: 16 }}>昵称</Text>
                <Text style={{ marginTop: 5, color: "#666" }}>您好，今天是个好日子</Text>
              </View>
            </View>
            <View>
              <View style={{ marginBottom: 5, justifyContent: "center", alignItems: 'center', alignSelf: "flex-end", width: 18, height: 18, borderRadius: 9, backgroundColor: "#f00" }}>
                <Text style={{ color: "#fff", fontSize: 12 }}>1</Text>
              </View>
              <Text style={{ marginTop: 5, color: "#666" }}>{lastTime(new Date().getTime() - 1000 * 60 * 3)}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
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
