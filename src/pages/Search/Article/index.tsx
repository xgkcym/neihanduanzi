import React from 'react'
import { View, Text, ScrollView, StatusBar } from 'react-native'
import PubSub from 'pubsub-js'
import MyVideo from '../../../compontents/MyVideo'
import request from '../../../util/request'
import stringfyquery from '../../../util/stringfyquery'
import {connect} from 'react-redux'
interface ArticleProps {
  navigation?: any
  userInfo?:any
}
function Index(props: ArticleProps) {
  const [videoList, setvideoList] = React.useState([])
  React.useEffect(() => {
    PubSub.subscribe('article', (_, data) => {
      setvideoList(data.article);
    })
    return ()=>{
      PubSub.unsubscribe('article');
    }
  }, [])
  function gotoVideoInfo(Video: any) {
    props.navigation.navigate('VideoInfo', { videoInfo: Video })
  }
  function gotoUserDetail(uid: any) {
    props.navigation.navigate('UserDetail', { uid })
  }
  async function deletaArticle(article_id: any) {
    await request.delete('/article' + stringfyquery({ uid: props.userInfo.uid, article_id }))
    PubSub.publish('getArticle')
  }
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      {
        videoList.map((v: any) =>
          <MyVideo key={v.article_id} VideoDate={v}
            gotoVideoInfo={() => gotoVideoInfo(v)}
            deleteArticle={() => deletaArticle(v.article_id)}
            gotoUserDetail={() => gotoUserDetail(v.uid)}
          />)
      }
    </ScrollView>
  )
}
const Article = connect(state=>({userInfo:state.userInfo}),{})(Index) 
export default Article