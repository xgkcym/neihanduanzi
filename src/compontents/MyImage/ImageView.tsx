import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { baseURL } from '../../util/request'
import { windowWidth } from '../../util/style'
interface ImageViewProps {
  imageArr: any[]
}
let imageArr: any[]
export default class ImageView extends Component<ImageViewProps> {
  state = {
    imageArr: imageArr
  }
  constructor(props: any) {
    super(props)
    this.state.imageArr = this.props.imageArr
  }
  showBigImage = (index?: any) => {
    
  }

  render() {
    const { imageArr } = this.state
    return (
      <View style={{ flexDirection: "row", flexWrap: 'wrap' , justifyContent:'space-between'}}>
        {
          imageArr.length == 1 ?
            <TouchableOpacity activeOpacity={0.5} style={{ flex:1, height: windowWidth  }} onPress={() => this.showBigImage()}>
              <Image
                style={{ width: '100%', height: '100%' }}
                source={{uri:baseURL+imageArr[0]}} />
            </TouchableOpacity> : <></>
        }
        {
          imageArr.length ==2 ?
            imageArr.map((vv: any, ii: any) => (
              <TouchableOpacity key={vv} activeOpacity={0.5} style={{width:'49%',height:windowWidth*imageArr.length/3}} onPress={() => this.showBigImage()}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={{uri:baseURL+vv}} />
              </TouchableOpacity> 
             )): <></>
          }
          {
          imageArr.length ==3 ?
            imageArr.map((vv: any, ii: any) => (
              <TouchableOpacity  key={vv} activeOpacity={0.5} style={{width:'33%',height:windowWidth/imageArr.length}} onPress={() => this.showBigImage()}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../res/avatar.webp')} />
              </TouchableOpacity> 
             )): <></>
          }
          {
            imageArr.length >3 ?
            imageArr.map((vv: any, ii: any) => (
              <TouchableOpacity  key={vv} activeOpacity={0.5} style={{width:'33%',height:windowWidth/3,marginBottom:2}} onPress={() => this.showBigImage()}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={{uri:baseURL+vv}} />
              </TouchableOpacity> 
             )): <></>
          }
      </View>
    )
  }
}
