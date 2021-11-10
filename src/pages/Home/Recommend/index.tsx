import React, { Component } from 'react'
import {NativeScrollEvent, NativeSyntheticEvent,StatusBar, ScrollView} from 'react-native'
import MyVideo from '../../../compontents/MyVideo'
import request from '../../../util/request'
import stringfyquery from '../../../util/stringfyquery'
import {connect} from 'react-redux'
interface RecommendProps{
  navigation?:any,
  userInfo?:any
}
function Index(props:RecommendProps){
  const [VideoArr,setVideoArr] = React.useState([])
  const [pagesize,setPagesize] = React.useState(10)
  const [page,setpage] = React.useState(1)
  const [total,settotal] = React.useState(0)
  let getArtilce = React.useCallback(()=>{
    return new Promise(async(resovle,reject)=>{
      let url = `/article`+stringfyquery({pagesize,page,content_type:"video"})
      const res = await request.get(url)
      res.status == 200?resovle(res): resovle({msg:'请求出错'})
    })
  },[])
  React.useEffect(()=>{
    getArtilce().then((res:any)=>{
      setVideoArr(res.article)
      setpage(res.page)
      settotal(res.total)
    })
  },[])
  function gotoVideoInfo(Video:any){
    props.navigation.navigate('VideoInfo',{videoInfo:Video})
  }
    return (
<           ScrollView style={{backgroundColor:"#fff"}}>
            <StatusBar backgroundColor='transparent'  barStyle={'dark-content'}/>
              {
                VideoArr.map((v:any)=>
                  <MyVideo key={v.article_id} VideoDate={v}
                    gotoVideoInfo={()=>gotoVideoInfo(v)}
                  />)
              }
            </ScrollView>

        
    )
}

const Recommend = connect(state=>({userInfo:state.userInfo}))(Index)
export default Recommend