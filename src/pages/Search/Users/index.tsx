import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import PubSub from 'pubsub-js'
import { baseURL } from '../../../util/request'
interface UsersProps {
  navigation?: any
}
function Index(props: UsersProps) {
  const [userList, setuserList] = React.useState([])
  React.useEffect(() => {
    PubSub.subscribe('users', (_, data) => {
      if (data.status == 200) {
        setuserList(data.data)
      }
    })
    return ()=>{
      PubSub.unsubscribe('users');
    }
  }, [])
  const gotoUserDetail = (uid:any)=>{
    props.navigation.navigate('UserDetail',{uid})
  }
  return (
    <ScrollView>
      {
        userList.map((v: any) =>
          <TouchableOpacity onPress={()=>gotoUserDetail(v.uid)} key={v.uid} style={{ flexDirection: 'row', alignItems: 'center', height: 65, paddingLeft: 10, paddingRight: 10, borderBottomWidth: 2, borderBottomColor: "#ccc" }}>
            <Image source={{uri:baseURL+v.avatar}} style={{ height: 50, width: 50, borderRadius: 25 }} />
            <View style={{ marginLeft: 10, height: '100%', flex: 1, justifyContent: "space-around" }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 5, color: "#000", fontSize: 16 }}>{v.nickname}</Text>
                {v.gender=='0'?<Text style={{ color: "#FF00FF", fontFamily: "iconfont" }}>{'\ue60c'}</Text>:<></>}
                {v.gender=='1'?<Text style={{ color: "#4169E1", fontFamily: "iconfont" }}>{'\ue60b'}</Text>:<></>}
                <Text style={{ marginLeft: 5, color: "#666" }}>{v.city?v.city:'中国'}</Text>
              </View>
              <Text style={{ color: "#666" }}>{v.individuality?v.individuality:'这个人很懒什么都没写'}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    </ScrollView>
  )
}
const Users = Index
export default Users