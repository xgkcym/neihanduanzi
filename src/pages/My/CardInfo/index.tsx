import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import GobackTitle from '../../../compontents/GobackTitle'
export default class CardInfo extends Component<any> {
  constructor(props: any) {
    super(props)
    this.state.cardType = this.props.route.params.CardType
  }
  state = {
    cardType: 0
  }
  render() {
    const { cardType } = this.state
    let title = ''
    cardType == 0 ? title = "关注" :
      cardType == 1 ? title = "粉丝" :
        cardType == 2 ? title = "粉丝" :
          cardType == 3 ? title = "拉黑" : title = ''
    return (
      <View>
        <GobackTitle title={title} props={this.props} />
        <View style={{ marginTop: 10 }}>
          {
            cardType == 0 ?
              <View style={{ flexDirection: 'row', justifyContent: "space-between", height: 60, backgroundColor: "#fff", alignItems: 'center', borderBottomColor: "#ddd", borderBottomWidth: 1, paddingLeft: 15, paddingRight: 15 }}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={require('../../../res/avatar.webp')} style={{ width: 50, height: 50, borderRadius: 25 }} />
                  <View style={{marginLeft:10}}>
                    <View style={{flexDirection:"row",alignItems:'center',marginBottom:3}}>
                      <Text style={{fontSize:16}}>昵称</Text>
                      <Text style={{fontFamily:'iconfont'}}>{'\ue60b'}</Text>
                    </View>
                    <Text style={{marginTop:3,fontSize:15,color:'#666'}}>城市</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:80,height:35,borderRadius:10,backgroundColor:'#f00',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:"#fff",fontSize:16}}><Text style={{fontFamily:"iconfont"}}></Text>关注</Text>
                </TouchableOpacity>
              </View> : <></>
          }
        </View>
      </View>
    )
  }
}
