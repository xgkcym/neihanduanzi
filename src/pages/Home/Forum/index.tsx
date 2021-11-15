import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import MyText from '../../../compontents/MyText'
import request from '../../../util/request'
import stringfyquery from '../../../util/stringfyquery'
import { connect } from 'react-redux'
interface ForumProps {
  navigation: any,
  userInfo?: any
}

function Index(props: ForumProps) {
  const [textInfoArr, settextInfoArr] = React.useState([])
  const [pagesize, setPagesize] = React.useState(10)
  const [page, setpage] = React.useState(1)
  const [total, settotal] = React.useState(0)
  let getArtilce = React.useCallback(() => {
    return new Promise(async (resovle, reject) => {
      const res = await request.get(`/article` + stringfyquery({ pagesize, page, content_type: "text" }))
      res.status == 200 ? resovle(res) : resovle({ msg: '请求出错' })
    })
  }, [])
  React.useEffect(() => {
    getArtilce().then((res: any) => {
      settextInfoArr(res.article)
      setpage(res.page)
      settotal(res.total)
    })
  }, [])
  async function deletaArticle(article_id: any) {
    await request.delete('/article' + stringfyquery({ uid: props.userInfo.uid, article_id }))
    getArtilce().then((res: any) => {
      settextInfoArr(res.article)
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
        textInfoArr.map((v: any) =>
          <MyText deletaArticle={() => deletaArticle(v)}
            TextDate={v} key={v.article_id}
            gotoTextInfo={() => props.navigation.navigate('TextInfo', { TextDate: v })}
            gotoUserDetail={()=>gotoUserDetail(v.uid)}
          />)}
    </ScrollView>
  )
}
const Forum = connect(state => ({ userInfo: state.userInfo }), {})(Index)
export default Forum