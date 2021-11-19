import React from 'react'
import { View, Text, ScrollView, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import request from '../../../util/request'
import stringfyquery from '../../../util/stringfyquery'
import MyText from '../../../compontents/MyText'
import MyImage from '../../../compontents/MyImage'
import MyVideo from '../../../compontents/MyVideo'
import PubSub from 'pubsub-js'
interface AttentionPrpos {
  navigation?: any,
  userInfo?: any
}
function Index(props: AttentionPrpos) {
  const [attentionArticle, setattentionArticle] = React.useState([])
  React.useEffect(() => {
    getAttentionArticle()
    PubSub.subscribe('attention',()=>{
      getAttentionArticle()
    })
    return ()=>{
      PubSub.unsubscribe('attention')
    }
  }, [])
  const getAttentionArticle = async () => {
    const attentionArticle: any = await request.get('/attentionArticle' + stringfyquery({ uid: props.userInfo.uid }))
    if (attentionArticle.status == 200) {
      setattentionArticle(attentionArticle.article)
    }
  }
  function gotoUserDetail(uid: any) {
    props.navigation.navigate('UserDetail', { uid })
  }
  return (
    <ScrollView  style={{backgroundColor:"#fff",flex:1}}>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      {
        attentionArticle && attentionArticle.map((v: any) => 
          v.content_type == 'text' ?
            <MyText
              TextDate={v} key={v.article_id}
              gotoTextInfo={() => props.navigation.navigate('TextInfo', { TextDate: v })}
              gotoUserDetail={() => gotoUserDetail(v.uid)}
            /> : v.content_type == 'image' ?
              <MyImage
                imageInfo={v}
                key={v.article_id}
                gotoImageInfo={() => props.navigation.navigate('ImageInfo', { imageInfo: v })}
                gotoUserDetail={() => gotoUserDetail(v.uid)}
              /> : v.content_type == 'video' ?
                <MyVideo key={v.article_id} VideoDate={v}
                  gotoVideoInfo={() => props.navigation.navigate('VideoInfo', { videoInfo: v })}
                  gotoUserDetail={() => gotoUserDetail(v.uid)}
                /> :<></>
        )
      }
      {attentionArticle.length == 0 ? <Text style={{alignSelf:'center',marginTop:50,fontSize:18,color:"#666"}}>没有您关注的文章</Text>:<></>} 
    </ScrollView>
  )
}
const Attention = connect(state => ({ userInfo: state.userInfo }))(Index)
export default Attention