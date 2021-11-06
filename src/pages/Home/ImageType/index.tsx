import React, { Component } from 'react'
import { Text, View,ScrollView } from 'react-native'
import MyImage from '../../../compontents/MyImage'
interface ImageTypeProps{
  navigation:any
}
export default class ImageType extends Component<ImageTypeProps> {
  state = {
    imageInfo:[1,2,3]
  }
  render() {
    const {imageInfo} = this.state
    return (
      <ScrollView style={{flex:1,backgroundColor:"#fff"}}>
            <MyImage imageInfo={imageInfo} gotoImageInfo={()=>this.props.navigation.navigate('ImageInfo',{imageInfo:imageInfo})}/>
      </ScrollView>
    )
  }
}
