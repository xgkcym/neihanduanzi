import React, { Component } from 'react'
import { Text, View,TextStyle,ViewStyle,StyleSheet } from 'react-native'

interface GobackTitleProps{
  title:String,
  titleStyle?:TextStyle,
  rightText?:String,
  rightTextStyle?:TextStyle,
  rightOnPress?:Function,
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
        <Text onPress={this.goback} style={{fontFamily:"iconfont",fontSize:20,width:40,height:60,lineHeight:60}}>{'\ue600'}</Text>
        <Text style={{fontSize:17,...this.props.titleStyle}}>{this.props.title}</Text>
        <Text onPress={()=>this.props.rightOnPress?this.props.rightOnPress():null} style={{width:40,...this.props.rightTextStyle,height:60,lineHeight:60}}>{this.props.rightText}</Text>
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