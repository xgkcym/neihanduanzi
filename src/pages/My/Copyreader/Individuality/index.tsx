import React, { Component } from 'react'
import { Text, View,TouchableOpacity,TextInput } from 'react-native'
import GobackTitle from '../../../../compontents/GobackTitle'
import {connect} from 'react-redux'
import { updataUserInfo } from '../../../../redux/actions/userInfo'
class index extends Component<any> {
  state = {
    title:""
  }
  setIndividuality = ()=>{
    
  }
  publishInput: TextInput | null | undefined
  render() {
    const {title} = this.state
    return (
      <View>
        <GobackTitle title={"编辑个性动态"} props={this.props}/>
        <TouchableOpacity
          onPress={() => this.publishInput?.focus()}
          activeOpacity={1}
          style={{
            position: 'relative',
            height: 300,
          }}>
          <TextInput
            ref={c => (this.publishInput = c)}
            multiline={true}
            value={this.props.userInfo.individuality}
            onChangeText={value => this.setState({ title: value })}
            placeholder="请填写个性动态（40字以内）"
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.setIndividuality} style={{alignSelf:"center",height:40,width:200,backgroundColor:"#ccc",borderRadius:20,justifyContent:"center",alignItems:"center"}}>
          <Text>保存</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const Individuality = connect(state=>({userInfo:state.userInfo}),{updataUserInfo})(index)
export default Individuality