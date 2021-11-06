import React from 'react'
import { View, Text ,StatusBar,TouchableOpacity} from 'react-native'
import GobackTitle from '../../../compontents/GobackTitle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUserInfo } from '../../../redux/actions/userInfo'
import {connect} from 'react-redux'
interface indexProps{
  setUserInfo?:any,
  userInfo?:any,
  navigation?:any
}
 function index(props:indexProps) {
  async function loginOut(){
    props.setUserInfo({uid:''})
    await AsyncStorage.setItem('userInfo',JSON.stringify({}))
    props.navigation.navigate('Tab',{initialRouteName:'My'})
  }
  return (
    <View>
      <StatusBar backgroundColor='transparent'  barStyle={'dark-content'}/>
      <GobackTitle title="设置"  props={props}/>
      <TouchableOpacity onPress={loginOut} style={{justifyContent:"center",alignItems:"center",height:50,backgroundColor:"#f00",width:'80%',alignSelf:"center",marginTop:30,borderRadius:25}}>
          <Text style={{color:"#fff",fontSize:18}}>退出登录</Text>
      </TouchableOpacity>
    </View>
  )
}

const Setting = connect(state=>({userInfo:state.userInfo}),{setUserInfo})(index)
export default Setting