import React, { Component } from 'react'
import { Text, View,TextStyle,ViewStyle,StyleSheet } from 'react-native'

interface GobackTitleProps{
  title:String,
  titleStyle?:TextStyle,
  rightText?:String,
  rightTextStyle?:TextStyle,
  style?:ViewStyle,
  onPress?:Function
  props:any
}
export default class GobackTitle extends Component<GobackTitleProps,any> {
  goback=()=>{
    this.props.props.navigation.goBack()   
  }
  render() {
    return (
      <View style={{...styles.gobackBox,...this.props.style}}>
        <Text onPress={this.goback} style={{fontFamily:"iconfont",fontSize:20,width:30}}>{'\ue600'}</Text>
        <Text style={{fontSize:17,...this.props.titleStyle}}>{this.props.title}</Text>
        <Text style={{width:30,...this.props.rightTextStyle}}>{this.props.rightText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gobackBox:{
    height:60,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    backgroundColor:"#fff",
    paddingLeft:10,
    paddingRight:10,
  }
})