import React, { Component } from 'react'
import {  View ,StatusBar,Text,ImageBackground,StyleSheet} from 'react-native'

export default class index extends Component {
  componentDidMount(){
    const {navigation}:any = this.props
    setTimeout(() => {
     navigation.navigate('Tab')
    }, 1000);
  }
  render() {
    return (
      <View>
        <StatusBar backgroundColor='transparent'  barStyle={'dark-content'}/>
        <ImageBackground style={style.backgroundImage} source={require('../../res/neihanduanzi.jpg')}></ImageBackground>
      </View>
    )
  }
}
const style = StyleSheet.create({
  backgroundImage:{
    width:'100%',
    height:'100%'
  }
})