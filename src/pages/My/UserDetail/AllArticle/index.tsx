import React, { Component } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, StatusBar, ScrollView } from 'react-native'
import MyVideo from '../../../../compontents/MyVideo'
import request from '../../../../util/request'
import stringfyquery from '../../../../util/stringfyquery'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import MyText from '../../../../compontents/MyText'
import MyImage from '../../../../compontents/MyImage'
interface RecommendProps {
  navigation?: any,
  userInfo?: any
}
function Index(props: RecommendProps) {
  const [articleList, setarticleList] = React.useState([])
  const [uid, setuid] = React.useState('')
  React.useEffect(() => {
    PubSub.subscribe('uid',async (_, data) => {
      const res: any = await request.get('/article' + stringfyquery({ uid: data }))
      setuid(data)
      if (res.status == 200) {
        setarticleList(res.article)
      }
    })
    PubSub.subscribe('videoArticle', async () => {
      const res: any = await request.get('/article' + stringfyquery({ uid }))
      if (res.status == 200) {
        setarticleList(res.article)
      }
    })
    return ()=>{
      PubSub.unsubscribe('uid')
      PubSub.unsubscribe('videoArticle')
    }
  }, [])
  function gotoVideoInfo(Video: any) {
    props.navigation.navigate('VideoInfo', { videoInfo: Video })
  }
  async function deletaArticle(article_id: any) {
    await request.delete('/article' + stringfyquery({ uid: props.userInfo.uid, article_id }))

  }
  function gotoUserDetail(uid: any) {
    props.navigation.navigate('UserDetail', { uid })
  }
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      {
        articleList && articleList.map((v: any) =>
          v.content_type == 'text' ?
            <MyText
              TextDate={v} key={v.article_id}
              gotoTextInfo={() => props.navigation.navigate('TextInfo', { TextDate: v })}
            /> : v.content_type == 'image' ?
              <MyImage
                imageInfo={v}
                key={v.article_id}
                gotoImageInfo={() => props.navigation.navigate('ImageInfo', { imageInfo: v })}
              /> : v.content_type == 'video' ?
                <MyVideo key={v.article_id} VideoDate={v}
                  gotoVideoInfo={() => props.navigation.navigate('VideoInfo', { videoInfo: v })}
                /> : <></>
        )
      }
    </ScrollView>


  )
}

const Recommend = connect(state => ({ userInfo: state.userInfo }))(Index)
export default Recommend