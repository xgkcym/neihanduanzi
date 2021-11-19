import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import GobackTitle from '../../../compontents/GobackTitle'
import request, { baseURL } from '../../../util/request'
import stringfyquery from '../../../util/stringfyquery'
import { connect } from 'react-redux'
class Index extends Component<any> {
  constructor(props: any) {
    super(props)
    this.state.cardType = this.props.route.params.CardType
  }
  state = {
    cardType: 0,
    cardList: [],
  }
  async componentDidMount() {
    const { cardType } = this.state
    if (cardType == 0) {
      const { data } = await request.get('/attention' + stringfyquery({ uid: this.props.route.params.uid }))
      this.setState({ cardList: data })
    } else if (cardType == 1) {
      const { data } = await request.get('/fans' + stringfyquery({ aid: this.props.route.params.uid }))
      this.setState({ cardList: data })
    } else if (cardType == 3) {
      const { data } = await request.get('/black' + stringfyquery({ uid: this.props.route.params.uid }))
      this.setState({ cardList: data })
    }
  }
  gotoUserDetail = (uid: any) => {
    this.props.navigation.replace('UserDetail', { uid })
  }
  render() {
    const { cardType, cardList } = this.state
    console.log(cardList);

    let title = ''
    cardType == 0 ? title = "关注" :
      cardType == 1 ? title = "粉丝" :
        cardType == 2 ? title = "点赞" :
          cardType == 3 ? title = "拉黑" : title = ''
    return (
      <View>
        <GobackTitle title={title} props={this.props} />
        <ScrollView style={{ marginTop: 10 }}>
          {
            cardList.map((v: any) =>
                <TouchableOpacity onPress={() => this.gotoUserDetail(v.uid)} key={v.uid} style={{ flexDirection: 'row', backgroundColor: "#fff", alignItems: 'center', height: 65, paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                  <Image source={{ uri: baseURL + v.avatar }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                  <View style={{ marginLeft: 10, height: '100%', flex: 1, justifyContent: "space-around" }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ marginRight: 5, color: "#000", fontSize: 16 }}>{v.nickname}</Text>
                      {v.gender == '0' ? <Text style={{ color: "#FF00FF", fontFamily: "iconfont" }}>{'\ue60c'}</Text> : <></>}
                      {v.gender == '1' ? <Text style={{ color: "#4169E1", fontFamily: "iconfont" }}>{'\ue60b'}</Text> : <></>}
                      <Text style={{ marginLeft: 5, color: "#666" }}>{v.city ? v.city : '中国'}</Text>
                    </View>
                    <Text style={{ color: "#666" }}>{v.individuality ? v.individuality : '这个人很懒什么都没写'}</Text>
                  </View>
                </TouchableOpacity>
            )

          }
        </ScrollView>
      </View>
    )
  }
}
const CardInfo = connect(state => ({ userInfo: state.userInfo }))(Index)
export default CardInfo