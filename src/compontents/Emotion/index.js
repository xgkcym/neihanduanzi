import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { EMOTION_ARR } from "./datasource";
import { windowWidth } from "../../util/style";
class Index extends Component {
  render() {
    // 获取屏幕的宽度 / 9 
    const width = windowWidth / 9;
    return (
      <ScrollView contentContainerStyle={{flexDirection:"row",flexWrap:"wrap",...this.props.style}}>
        {EMOTION_ARR.map((v, i) => <TouchableOpacity
          key={i}
          onPress={()=>this.props.onPress(v)}
        >
          <Image style={{width,height:width}} source={v.value} />
        </TouchableOpacity>)}
      </ScrollView>
    );
  }
}
export default Index;