import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import MyImage from '../../../compontents/MyImage'
import request from '../../../util/request'
import stringfyquery from '../../../util/stringfyquery'
import { connect } from 'react-redux'
interface ImageTypeProps {
  navigation: any,
  userInfo?: any
}

function Index(props: ImageTypeProps) {
  const [imageArr, setimageInfo] = React.useState([])
  const [pagesize, setPagesize] = React.useState(10)
  const [page, setpage] = React.useState(1)
  const [total, settotal] = React.useState(0)
  let getArtilce = React.useCallback(() => {
    return new Promise(async (resovle, reject) => {
      const res = await request.get(`/article` + stringfyquery({ pagesize, page, content_type: "image" }))
      res.status == 200 ? resovle(res) : resovle({ msg: '请求出错' })
    })
  }, [])
  React.useEffect(() => {
    getArtilce().then((res: any) => {
      setimageInfo(res.article)
      setpage(res.page)
      settotal(res.total)
    })
    PubSub.subscribe('imageArticle', () => {
      getArtilce().then((res: any) => {
        setimageInfo(res.article)
        setpage(res.page)
        settotal(res.total)
      })
    })
    return ()=>{
      PubSub.unsubscribe('imageArticle')
    }
  }, [])
  async function deletaArticle(article_id: any) {
    await request.delete('/article' + stringfyquery({ uid: props.userInfo.uid, article_id }))
    getArtilce().then((res: any) => {
      setimageInfo(res.article)
      setpage(res.page)
      settotal(res.total)
    })
  }
  function gotoUserDetail(uid: any) {
    props.navigation.navigate('UserDetail', { uid })
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {
        imageArr.map((v: any) => <MyImage
          imageInfo={v}
          deleteArticle={() => deletaArticle(v.article_id)}
          key={v.article_id}
          gotoImageInfo={() => props.navigation.navigate('ImageInfo', { imageInfo: v })}
          gotoUserDetail={() => gotoUserDetail(v.uid)}
        />)
      }
    </ScrollView>
  )
}
const ImageType = connect(state => ({ userInfo: state.userInfo }), {})(Index)
export default ImageType