import React, { Component } from 'react'
import { Text, View,TouchableOpacity,TextInput } from 'react-native'
import GobackTitle from '../../../../compontents/GobackTitle'
import {connect} from 'react-redux'
import { updataUserInfo } from '../../../../redux/actions/userInfo'
import request from '../../../../util/request'
import { Alert } from 'react-native'
class index extends Component<any> {
  state = {
    individuality:""
  }
  constructor(props:any){
      super(props)
      this.state.individuality =  JSON.parse(JSON.stringify(this.props.userInfo)).individuality
  }
  setIndividuality = async()=>{
    const {individuality} = this.state
    const res = await request.put('/users',{uid:this.props.userInfo.uid,individuality})
    if(res.status = 200){
      this.props.updataUserInfo({individuality})
      Alert.alert('更新个性动态成功')
      this.props.navigation.goBack()
    }else{
      Alert.alert('更新个性动态失败')
    }
  }
  publishInput: TextInput | null | undefined
  render() {
   const {individuality} =this.state
    return (
      <View>
        <GobackTitle title={"编辑个性动态"} props={this.props}/>
        <TouchableOpacity
          onPress={() => this.publishInput?.focus()}
          activeOpacity={1}
          style={{
            position: 'relative',
            height: 300,
            borderBottomWidth:1,
            borderBottomColor:"#ddd"
          }}>
          <TextInput
            ref={c => (this.publishInput = c)}
            multiline={true}
            value={individuality }
            onChangeText={value => this.setState({ individuality: value })}
            placeholder="请填写个性动态（40字以内）"
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.setIndividuality} style={{alignSelf:"center",marginTop:20,height:40,width:200,backgroundColor:"#ccc",borderRadius:20,justifyContent:"center",alignItems:"center"}}>
          <Text>保存</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const Individuality = connect(state=>({userInfo:state.userInfo}),{updataUserInfo})(index)
export default Individuality