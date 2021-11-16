import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Image, Alert } from 'react-native'
import { Input } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import { validateTelphone } from '../../util/validate'
import request from '../../util/request';
import { connect } from 'react-redux'
import { setUserInfo } from '../../redux/actions/userInfo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import JMessage from '../../util/JMessage';
import { asyncSetMessage } from '../../redux/actions/jmessage';
class index extends Component<any, any> {
  state = {
    telphone: '13512712408',
    password: '123456',
    isChecked: true,
    isLogin: true,
    registerTlehone: '',
    registerPassword: '',
    registerPassword2: '',
  }
  Login = async () => {
    const telRegular = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/
    const { isChecked, telphone, password } = this.state
    if (!isChecked) {
      return Alert.alert('请选择已阅读')
    }
    if (telphone.trim().length == 0) {
      return Alert.alert('请填写手机号码')
    }
    if (password.trim().length == 0) {
      return Alert.alert('请填写密码')
    }
    if (!telRegular.test(telphone)) {
      return Alert.alert('请填写正确的手机号码')
    }
    if (password.trim().length < 6 || password.trim().length > 16) {
      return Alert.alert('密码字符应在9~16位')
    }
    if (!validateTelphone(telphone)) {
      return Alert.alert('请填写正确的手机号码')
    }

    const res = await request.post('/login', { telphone, password })
    if (res.status !== 200) {
      return Alert.alert('账号密码错误')
    }
    this.props.setUserInfo(res.data)
    await JMessage.login(res.data.uid,res.data.uid+123)
    this.props.asyncSetMessage()
    await AsyncStorage.setItem('userInfo', JSON.stringify(res.data))
    Alert.alert('登录成功')
    this.props.navigation.goBack(()=>{
      
    })
  }

  zhece = async () => {
    const telRegular = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/
    const {  registerTlehone, registerPassword,registerPassword2 } = this.state

    if (registerTlehone.trim().length == 0) {
      return Alert.alert('请填写手机号码')
    }
    if (registerPassword.trim().length == 0) {
      return Alert.alert('请填写密码')
    }
    if (!telRegular.test(registerTlehone)) {
      return Alert.alert('请填写正确的手机号码')
    }
    if (registerPassword.trim().length < 6 || registerPassword.trim().length > 16) {
      return Alert.alert('密码字符应在9~16位')
    }
    if (!validateTelphone(registerTlehone)) {
      return Alert.alert('请填写正确的手机号码')
    }
    if(registerPassword != registerPassword2){
      return Alert.alert('确认密码和用户密码不符合')
    }
    const res:any = await request.post('/users',{telphone:registerTlehone,password:registerPassword})
    if(res.status!=200)
    return Alert.alert('注册失败')
    await JMessage.register(res.data[0].uid,res.data[0].uid+'123')
    Alert.alert('注册成功,去登录')
    this.setState({registerTlehone:'',registerPassword:'',registerPassword2:'',isLogin:true})
  }
  render() {
    const { telphone, password, isChecked, isLogin, registerTlehone, registerPassword, registerPassword2 } = this.state
    return (
      <View>
        <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
        {/* 头部开始 */}
        <View style={style.LoginHeader}>
          <TouchableOpacity>
            <Text style={{ fontSize: 38, color: '#666' }}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 18 }}>帮助</Text>
          </TouchableOpacity>
        </View>
        {/* 头部结束 */}
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginLeft: 20, marginRight: 20 }}>
          <Text onPress={() => { this.setState({ isLogin: true }) }} style={{ ...style.LoginText, color: !isLogin ? "#1E90FF" : '#000', fontSize: isLogin ? 25 : 18 }}>登录</Text>
          <Text onPress={() => { this.setState({ isLogin: false }) }} style={{ ...style.LoginText, color: isLogin ? "#1E90FF" : '#000', fontSize: !isLogin ? 25 : 18 }}>注册</Text>
        </View>
        {/* 手机输入框开始 */}
        {isLogin ?
          <View>
            <View style={{ marginLeft: 15, marginRight: 15 }}>
              <Input
                placeholder='输入手机号'
                style={{ fontSize: 26 }}
                value={telphone}
                onChangeText={(value: any) => this.setState({ telphone: value })}
              />
            </View>
            <View style={{ marginLeft: 15, marginRight: 15 }}>
              <Input
                placeholder='用户密码'
                textContentType='password'
                keyboardType='default'
                secureTextEntry={true}
                style={{ fontSize: 26 }}
                value={password}
                onChangeText={(value: any) => this.setState({ password: value })}
              />
            </View>
          </View> :
          <View>
            <View style={{ marginLeft: 15, marginRight: 15 }}>
              <Input
                placeholder='输入手机号'
                style={{ fontSize: 26 }}
                value={registerTlehone}
                onChangeText={(value: any) => this.setState({ registerTlehone: value })}
              />
            </View>
            <View style={{ marginLeft: 15, marginRight: 15 }}>
              <Input
                placeholder='用户密码'
                style={{ fontSize: 26 }}
                textContentType='password'
                keyboardType='default'
                secureTextEntry={true}
                value={registerPassword}
                onChangeText={(value: any) => this.setState({ registerPassword: value })}
              />
            </View>
            <View style={{ marginLeft: 15, marginRight: 15 }}>
              <Input
                placeholder='确认密码'
                style={{ fontSize: 26 }}
                textContentType='password'
                keyboardType='default'
                secureTextEntry={true}
                value={registerPassword2}
                onChangeText={(value: any) => this.setState({ registerPassword2: value })}
              />
            </View>
          </View>
        }
        {/* 手机输入框结束 */}
        {/* 其他登录开始 */}
        {
          isLogin ?
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <TouchableOpacity style={style.RestsLLogin} >
                <Image style={style.LoginIcon} source={require('../../res/wechatIcon.webp')} />
              </TouchableOpacity>
              <TouchableOpacity style={style.RestsLLogin} >
                <Image style={style.LoginIcon} source={require('../../res/QQIcon.webp')} />
              </TouchableOpacity>
            </View> : <></>
        }
        {/* 其他登录结束 */}
        {/* 协议开始 */}
        {
          isLogin ?
            <View style={{ flexDirection: "row", alignItems: "center", margin: 20 }}>
              <CheckBox
                checkBoxColor='#666'

                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked
                  })
                }}
                isChecked={isChecked}
              />
              <Text style={{ paddingRight: 3 }}>已阅读并同意</Text>
              <Text style={{ color: '#1E90FF' }}>内涵段子用户协议</Text>
              <Text style={{ padding: 3 }}>和</Text>
              <Text style={{ color: '#1E90FF' }}>隐私政策</Text>
            </View> : <></>
        }

        {/* 协议结束 */}
        {/* 按钮开始 */}
        {
          isLogin ?
            <TouchableOpacity onPress={this.Login} style={style.LoginBtn}>
              <Text style={{ padding: 10, fontSize: 18, color: "#666" }}>登录</Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={this.zhece} style={style.LoginBtn}>
              <Text style={{ padding: 10, fontSize: 18, color: "#666" }}>注册</Text>
            </TouchableOpacity>

        }
        {/* 按钮结束 */}
      </View>
    )
  }
}

export default connect(state => ({ userInfo: state.userInfo }), { setUserInfo,asyncSetMessage})(index)

const style = StyleSheet.create({
  LoginHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  LoginText: {
    marginTop: 20,
    marginBottom: 40
  },
  RestsLLogin: {
    // borderWidth:1,
    borderColor: '#ccc',
    width: 32,
    height: 32,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 5,
    marginLeft: 5
  },
  LoginIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  LoginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    backgroundColor: '#ddd',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20
  }
})
