import React from 'react'
import { View, Text } from 'react-native'
import {connect} from 'react-redux'
 function index(props:any) {
  return (
    <View>
      <Text onPress={()=>props.navigation.navigate('Login')}>登录</Text>
      <Text>{props.userInfo.nickname}</Text>
    </View>
  )
}
const Domo = connect(state=>({userInfo:state.userInfo}),{})(index)
export default Domo