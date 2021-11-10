import React, { Component } from 'react'
import { Text, View,ScrollView } from 'react-native'
import MyImage from '../../../compontents/MyImage'
import request from '../../../util/request'
import stringfyquery from '../../../util/stringfyquery'
interface ImageTypeProps{
  navigation:any
}


export default function index(props:ImageTypeProps) {
  const [imageArr,setimageInfo] = React.useState([])
  const [pagesize,setPagesize] = React.useState(10)
  const [page,setpage] = React.useState(1)
  const [total,settotal] = React.useState(0)
  let getArtilce = React.useCallback(()=>{
    return new Promise(async(resovle,reject)=>{
      const res = await request.get(`/article`+stringfyquery( {pagesize,page,content_type:"image"}))
      res.status == 200?resovle(res): resovle({msg:'请求出错'})
    })
  },[])
  React.useEffect(()=>{
    getArtilce().then((res:any)=>{
      setimageInfo(res.article)
      setpage(res.page)
      settotal(res.total)
    })
  },[])
  return (
    <ScrollView style={{flex:1,backgroundColor:"#fff"}}>
      {
        imageArr.map((v:any)=> <MyImage imageInfo={v} key={v.article_id}  gotoImageInfo={()=>props.navigation.navigate('ImageInfo',{imageInfo:v})}/>)
      }
      </ScrollView>
  )
}
