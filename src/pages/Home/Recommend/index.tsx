import React, { Component } from 'react'
import {NativeScrollEvent, NativeSyntheticEvent,StatusBar, ScrollView} from 'react-native'
import MyVideo from '../../../compontents/MyVideo'
interface RecommendProps{
  navigation:any
}
export default function Recommend(props:RecommendProps){
    const VideoArr = [{
      id:1,
      content:require('../../../res/video01.mp4')
    },
    {
      id:2,
      content:require('../../../res/video02.mp4')
    },
    {
      id:3,
      content:require('../../../res/video02.mp4')
    }]
    function gotoVideoInfo(value:any){
      props.navigation.navigate('VideoInfo',{videoInfo:value})
    }
    return (
<           ScrollView style={{backgroundColor:"#fff"}}>
            <StatusBar backgroundColor='transparent'  barStyle={'dark-content'}/>
              {
                VideoArr.map((v:any)=>
                  <MyVideo key={v.id} VideoDate={v}
                    gotoVideoInfo={()=>gotoVideoInfo(v)}
                  />)
              }
            </ScrollView>

        
    )
}

