import React, { Component } from 'react'
import { Text, View,ScrollView } from 'react-native'
import MyText from '../../../compontents/MyText'
import request from '../../../util/request'
import stringfyquery from '../../../util/stringfyquery'
interface ForumProps{
  navigation:any
}

export default function index(props:ForumProps) {
  const [textInfoArr,settextInfoArr] = React.useState([])
  const [pagesize,setPagesize] = React.useState(10)
  const [page,setpage] = React.useState(1)
  const [total,settotal] = React.useState(0)
  let getArtilce = React.useCallback(()=>{
    return new Promise(async(resovle,reject)=>{
      const res = await request.get(`/article`+stringfyquery( {pagesize,page,content_type:"text"}))
      res.status == 200?resovle(res): resovle({msg:'请求出错'})
    })
  },[])
  React.useEffect(()=>{
    getArtilce().then((res:any)=>{
      settextInfoArr(res.article)
      setpage(res.page)
      settotal(res.total)
    })
  },[])
  return (
    <ScrollView style={{flex:1,backgroundColor:"#fff"}}>
    { textInfoArr.map((v:any)=><MyText  TextDate={v} key={v.article_id} gotoTextInfo={()=>props.navigation.navigate('TextInfo',{TextDate:v})}/>)}
  </ScrollView>
  )
}
