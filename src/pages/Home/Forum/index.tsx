import React, { Component } from 'react'
import { Text, View,ScrollView } from 'react-native'
import MyText from '../../../compontents/MyText'
interface ForumProps{
  navigation:any
}
export default class Forum extends Component<ForumProps> {
  state = {
    TextInfo:[1,2,3]
  }
  render() {
    return (
      <ScrollView style={{flex:1,backgroundColor:"#fff"}}>
        <MyText />
      </ScrollView>
    )
  }
}
