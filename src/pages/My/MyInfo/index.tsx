import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import GobackTitle from '../../../compontents/GobackTitle'
import request, { baseURL } from '../../../util/request'
import TabCard from './TabCard'
import { connect } from 'react-redux'
import stringfyquery from '../../../util/stringfyquery'
let userInfo: any
class index extends Component<any, any> {
  state = {
    userInfo: userInfo,
    attention: [],
    black: [],
    fans: []
  }
  constructor(props: any) {
    super(props)
    this.state.userInfo = this.props.route.params.uid
  }
  async componentDidMount() {
    const res: any = await request.get('/users' + stringfyquery({ uid: this.props.route.params.uid }))
    if (res.status == 200) {
      const uid = res.data[0].uid
      const attention: any[] = await request.get('/attention' + stringfyquery({ uid }))
      const black: any[] = await request.get('/black' + stringfyquery({ uid }))
      const fans: any[] = await request.get('/fans' + stringfyquery({ uid }))
      this.setState({ userInfo: res.data[0], attention, black, fans })
    }

  }
  attention = async () => {
    const res = await request.post('/attention', { uid: this.props.userInfo.uid, aid: this.state.userInfo.uid })
    if (res.status == 200) {
      Alert.alert('关注用户成功')
    } else {
      Alert.alert('已关注')
    }
  }
  gotoChart = ()=>{
    this.props.navigation.navigate('Chat',{uid:this.state.userInfo.uid })

  }
  render() {
    const { userInfo, attention, black, fans } = this.state
    return (
      <View style={{ flex: 1 }}>
        <GobackTitle title={userInfo.nickname} props={this.props} rightText={'\ue651'} rightTextStyle={{ fontFamily: "iconfont", fontSize: 18, textAlign: "right" }} />
        <View style={{ height: 155, backgroundColor: "#fff", paddingLeft: 20, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 90 }}>
            <Image source={{ uri: baseURL + userInfo.avatar }} style={{ width: 70, height: 70, borderRadius: 35 }} />
            <View style={{ flex: 1, marginLeft: 20, marginRight: 10, marginBottom: 10 }}>
              <View style={{ flexDirection: "row", flex: 1, width: '100%' }}>
                <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('CardInfo', { CardType: 0 })}>
                  <Text>关注</Text>
                  <Text style={{ color: "#666" }}>{attention.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('CardInfo', { CardType: 1 })}>
                  <Text>粉丝</Text>
                  <Text style={{ color: "#666" }}>{fans.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('CardInfo', { CardType: 2 })}>
                  <Text>点赞</Text>
                  <Text style={{ color: "#666" }}>1234</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('CardInfo', { CardType: 3 })}>
                  <Text>拉黑</Text>
                  <Text style={{ color: "#666" }}>{black.length}</Text>
                </TouchableOpacity>
              </View>
              {
                this.props.userInfo.uid == userInfo.uid ?
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Copyreader')} style={{ height: 30, marginTop: 5, width: '100%', borderWidth: 1, borderColor: '#f55', justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                    <Text style={{ color: "#f55" }}>编辑资料</Text>
                  </TouchableOpacity> : <View style={{flexDirection:'row',alignItems:"center",justifyContent:"space-around"}}>
                    <TouchableOpacity onPress={this.attention} style={{ height: 30, marginTop: 5, width: '45%', justifyContent: "center", alignItems: "center", borderRadius: 5 ,backgroundColor:"#f55"}}>
                      <Text style={{ color: "#fff" }}>关注</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.gotoChart} style={{ height: 30, marginTop: 5, width: '45%', borderWidth: 1, borderColor: '#f55', justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                      <Text style={{ color: "#f55" }}>发消息</Text>
                    </TouchableOpacity>
                  </View>
              }
            </View>
          </View>
          <Text style={{ height: 30, lineHeight: 30, fontSize: 13 }}>{userInfo.individuality}</Text>
          <Text style={styles.city}>{userInfo.city}</Text>
        </View>
        <View style={{ flex: 1 }}><TabCard /></View>
      </View>
    )
  }
}
const MyInfo = connect(state => ({ userInfo: state.userInfo }), {})(index)
export default MyInfo
const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  city: {
    height: 25,
    lineHeight: 25,
    width: 40,
    textAlign: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 12
  }
})