import React, { Component } from 'react'
import { Text, View, Image, StatusBar, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import { setUserInfo } from '../../redux/actions/userInfo'
import { connect } from 'react-redux'
import { UserType } from '../../util/usesType'
import request,{baseURL} from '../../util/request'
import stringfyquery from '../../util/stringfyquery'
let userInfo: UserType | undefined
interface indexProps {
  navigation?: any,
  userInfo?: UserType,
  setUserInfo?: any
}
class index extends Component<indexProps> {
  state = {
    userInfo: userInfo,
    attention:[],
    black:[],
    fans:[]
  }

  gotoSetting = () => {
    this.props.userInfo?.uid?this.props.navigation.navigate('Setting'):Alert.alert('请登录')
  }
  async componentDidMount(){
    const attention:any = await request.get('/attention'+stringfyquery({uid:this.props.userInfo?.uid}))
    const black:any = await request.get('/black'+stringfyquery({uid:this.props.userInfo?.uid}))  
    const fans:any = await request.get('/fans'+stringfyquery({aid:this.props.userInfo?.uid}))  
    this.setState({attention:attention.data,black:black.data,fans:fans.data})
  }
  render() {
    const {  attention,black,fans} = this.state
    return (
      <ScrollView>
        <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
        <View style={{ height: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff" }}>
          {this.props.userInfo?.uid ? <><Image source={{uri:baseURL+this.props.userInfo?.avatar}} style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 20 }} />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text style={{ marginBottom: 5, fontSize: 17 }}>{this.props.userInfo?.nickname}</Text>
              <Text style={{ marginTop: 5, color: "#666" }}>{this.props.userInfo?.individuality}</Text>
            </View></> :
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}  style={{ marginLeft: 20,paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10,borderRadius:10,justifyContent:"center",alignItems:'center',backgroundColor:"#f66" }}>
              <Text style={{color:"#fff",fontSize:18}}>登录/注册</Text>
            </TouchableOpacity>
          }
          {this.props.userInfo?.uid?<Text onPress={() => this.props.navigation.navigate('UserDetail',{uid:this.props.userInfo?.uid})} style={{ width: 75, height: 30, lineHeight: 30, textAlign: 'center', fontWeight: '100', fontSize: 13, backgroundColor: "#ddd", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>个人主页</Text>:<></>}
        </View>
        <View style={{ flexDirection: "row", height: 110, alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}>
          <TouchableOpacity style={{ ...styles.card, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
            <Text style={styles.cardText}>关注</Text>
            <Text style={styles.cardNum}>{attention.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>粉丝</Text>
            <Text style={styles.cardNum}>{fans.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>获赞</Text>
            <Text style={styles.cardNum}>1456</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.card, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
            <Text style={styles.cardText}>拉黑</Text>
            <Text style={styles.cardNum}>{black.length}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <TouchableOpacity style={styles.moreTitle}>
            <Text style={{ fontSize: 18 }}>更多功能</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Publish')} style={styles.morecard}>
            <Text style={{ fontFamily: "iconfont", fontSize: 24, width: 50, textAlign: "center" }}>{'\ue638'}</Text>
            <Text style={{ flex: 1, fontSize: 16 }}>发表自己的帖子</Text>
            <Text style={{ fontFamily: "iconfont" }}>{'\ue65f'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.morecard}>
            <Text style={{ fontFamily: "iconfont", fontSize: 25, width: 50, textAlign: "center" }}>{'\ue602'}</Text>
            <Text style={{ flex: 1, fontSize: 16 }}>插眼喜欢的帖子</Text>
            <Text style={{ fontFamily: "iconfont" }}>{'\ue65f'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.morecard}>
            <Text style={{ fontFamily: "iconfont", fontSize: 22, width: 50, textAlign: "center" }}>{'\ue60d'}</Text>
            <Text style={{ flex: 1, fontSize: 16 }}>评论过的帖子</Text>
            <Text style={{ fontFamily: "iconfont" }}>{'\ue65f'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.morecard}>
            <Text style={{ fontFamily: "iconfont", fontSize: 23, width: 50, textAlign: "center" }}>{'\ueca7'}</Text>
            <Text style={{ flex: 1, fontSize: 16 }}>我收藏的帖子</Text>
            <Text style={{ fontFamily: "iconfont" }}>{'\ue65f'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.gotoSetting} style={styles.morecard}>
            <Text style={{ fontFamily: "iconfont", fontSize: 23, width: 50, textAlign: "center" }}>{'\ue892'}</Text>
            <Text style={{ flex: 1, fontSize: 16 }}>软件功能设置</Text>
            <Text style={{ fontFamily: "iconfont" }}>{'\ue65f'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}>
          <Text style={{ color: "#666" }}>当前版本V1.0.0</Text>
          <Text style={{ color: "#666" }}>校园论坛</Text>
        </View>
      </ScrollView>
    )
  }
}
const My = connect(state => ({ userInfo: state.userInfo }), { setUserInfo })(index)
export default My
const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: 'center',
    flex: 1,
    height: 80,
    backgroundColor: "#fff"
  },
  cardText: {
    marginBottom: 3,
    fontSize: 16,
  },
  cardNum: {
    marginTop: 3,
    fontSize: 14,
    color: "#666"
  },
  moreTitle: {
    height: 70,
    justifyContent: "center",
    paddingLeft: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  morecard: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    paddingRight: 5,
    borderTopWidth: 1,
    borderTopColor: "#ccc"
  },
})