import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import GobackTitle from '../../../compontents/GobackTitle';
import Picker from 'react-native-picker';
import cityJson from '../../../res/city.json'
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux'
import { updataUserInfo } from '../../../redux/actions/userInfo';
import request, { baseURL } from '../../../util/request';
import axios from 'axios';
import { Alert } from 'react-native';
 class index extends Component<any> {
  state = {
    nicknameValue: '',
    showNicknameView: false,
    birthday:'2000-11-02'
  };
  componentDidMount() {
  }
  setImage = async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
    const formdata = new FormData()  
    const pathname = image.path.split('/') 
    formdata.append('avatar',{
      uri:image.path,
      name:pathname[pathname.length-1],
      type:image.mime
    }) 
    let config = {
      headers:{
        'Content-Type':'multipart/form-data;'
      }
    }
    const res:any = await request.post('/users/avatar',formdata,config)
    if(res.status == 200){
      const resopnse = await request.put('/users',{uid:this.props.userInfo.uid,avatar:res.file.path})
      if(resopnse.status == 200){
         this.props.updataUserInfo({avatar:res.file.path})
      }
    }else{
      Alert.alert('更新头像失败')
    }
    
    
  };
  setNickname = async()=>{
    const {nicknameValue} = this.state
    const res = await request.put('/users',{nickname:nicknameValue,uid:this.props.userInfo.uid})
    if(res.status == 200){
      this.props.updataUserInfo({nicknae:nicknameValue})
    }else{
      Alert.alert('更新名字失败')
    }
    this.setState({ showNicknameView: false})
  }
  setGener = () => {
    Picker.init({
      pickerData: ["男", '女'],
      selectedValue: ["男"],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择性别',
      onPickerConfirm: async(data) => {
        let gender = data[0] == '男'?'1':data[0] == '女'?'0':''
        const res = await request.put('/users',{uid:this.props.userInfo.uid,gender})
        if(res.status == 200){
          this.props.updataUserInfo({gender})
        }else{
          Alert.alert('更新性别失败')
        }
      }
    })
    Picker.show()
  }
  setCity = () => {
    Picker.init({
      pickerData: cityJson,
      selectedValue: ['北京', '北京'],
      wheelFlex: [1, 1, 1], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: async(data) => {
        // data =  [广东，广州，天河]
        const city = data[1]
        const res = await request.put('/users',{uid:this.props.userInfo.uid,city})
        if(res.status == 200){
          this.props.updataUserInfo({city})
        }else{
          Alert.alert('更新城市失败')
        }
        
      },
    });
    Picker.show();
  }
  setEducation = () => {
    Picker.init({
      pickerData: ['初中', '高中', '中职', '高职(大专)', '本科', '研究生'],
      selectedValue: ["初中"],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择学历',
      onPickerConfirm: async(data) => {
        const education = data[0]
        const res = await request.put('/users',{uid:this.props.userInfo.uid,education})
        if(res.status == 200){
          this.props.updataUserInfo({education})
        }else{
          Alert.alert('更新学历失败')
        }
      }
    })
    Picker.show()
  }
  setConstellation = () => {
    const constellationArr = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    Picker.init({
      pickerData: constellationArr,
      selectedValue: [constellationArr[0]],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择星座',
      onPickerConfirm: async(data) => {
        const constellation = data[0]
        const res = await request.put('/users',{uid:this.props.userInfo.uid,constellation})
        if(res.status == 200){
          this.props.updataUserInfo({constellation})
        }else{
          Alert.alert('更新星座失败')
        }
      }
    })
    Picker.show()
  }
  render() {
    console.log(this.props.userInfo);
    
    const {  nicknameValue, showNicknameView ,birthday} = this.state;
    const date = new Date();
    const time = `${date.getFullYear()}-${
      Number(date.getMonth()) + 1 >= 10
        ? Number(date.getMonth()) + 1
        : '0' + (Number(date.getMonth()) + 1)
    }-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}`;
    return (
      <View style={{ position: "relative", flex: 1 }}>
        <GobackTitle title={'编辑个人资料'} props={this.props} />
        {/* 头像开始 */}
        <ListItem bottomDivider>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: '#000' }}>头像</Text>
            <TouchableOpacity onPress={this.setImage}>
              <Image
                source={{uri:baseURL+this.props.userInfo.avatar}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </ListItem.Content>
        </ListItem>
        {/* 头像结束 */}
        {/* 昵称开始 */}
        <ListItem bottomDivider>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: '#000' }}>昵称</Text>
            <TouchableOpacity onPress={() => this.setState({ showNicknameView: true, nicknameValue: JSON.parse(JSON.stringify(this.props.userInfo)).nickname })}>
              <Text style={{ fontSize: 16, color: '#999' }}>
                {this.props.userInfo.nickname}
              </Text>
            </TouchableOpacity>
          </ListItem.Content>
        </ListItem>
        {/* 昵称结束 */}
        {/* 修改昵称开始 */}
        {
          showNicknameView ? <View style={{ position: 'absolute', zIndex: 1, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '60%', backgroundColor: '#fff', alignItems: "center", height: 200, borderColor: '#ddd', borderWidth: 1, borderRadius: 10 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 18 }}>修改昵称</Text></View>
              <TextInput placeholder='请输入您的昵称' onChangeText={v => this.setState({ nicknameValue: v })} value={nicknameValue} style={{ borderBottomWidth: 2, flex: 1, textAlign: 'center', borderBottomColor: '#ddd' }} />
              <View style={{ width: '100%', flexDirection: 'row', flex: 1, alignItems: "center", marginTop: 5, borderRadius: 4, backgroundColor: "#fff" }}>
                <TouchableOpacity  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }} onPress={this.setNickname}>
                  <Text>保存</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }} onPress={() => this.setState({ showNicknameView: false })}>
                  <Text>取消</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View> : <></>

        }
        {/* 修改昵称结束 */}
        {/* 生日开始 */}
        <ListItem bottomDivider>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: '#000' }}>生日</Text>
            <DatePicker
              // style={{ width: '95%' }}s
              // style={{backgroundColor:'#f00'}}
              date={this.props.userInfo.birthday}
              mode="date"
              placeholder="选择生日"
              format="YYYY-MM-DD"
              minDate="1990-01-01"
              maxDate={time}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  display: 'none',
                },
                dateInput: {
                  borderWidth: 0,
                },
                placeholderText: {
                  fontSize: 16,
                  color: '#aaa',
                  alignSelf: 'flex-end',
                },
                dateText: {
                  fontSize: 16,
                  alignSelf: 'flex-end',
                  color:"#999"
                },
              }}
              onDateChange={async(birthday: any) => {
                // this.setState({ birthday });
                const res = await request.put('/users',{uid:this.props.userInfo.uid,birthday})
                if(res.status == 200){
                  this.props.updataUserInfo({birthday})
                }else{
                  Alert.alert('更新生日失败')
                }
              }}
            />
          </ListItem.Content>
        </ListItem>
        {/* 生日结束 */}
        {/* 性别开始 */}
        <ListItem bottomDivider onPress={this.setGener}>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: '#000' }}>性别</Text>
            <Text style={{ fontSize: 16, color: '#999' }}>
              {/* {userInfo.gender == '0' ? '女' : '男'} */}
              {this.props.userInfo.gender == '0'?'女':this.props.userInfo.gender == '1'?'男':'选择性别'}
            </Text>
          </ListItem.Content>
        </ListItem>
        {/* 性别结束 */}
        {/* 城市开始 */}
        <ListItem bottomDivider onPress={this.setCity}>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: '#000' }}>现居城市</Text>
            <Text style={{ fontSize: 16, color: '#999' }}>
              {this.props.userInfo.city?this.props.userInfo.city:'选择城市'}
            </Text>
          </ListItem.Content>
        </ListItem>
        {/* 城市结束 */}
        {/* 学历开始 */}
        <ListItem bottomDivider onPress={this.setEducation}>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: '#000' }}>学历</Text>
            <Text style={{ fontSize: 16, color: '#999' }}>
              {this.props.userInfo.education?this.props.userInfo.education:'选择学历'}
            </Text>
          </ListItem.Content>
        </ListItem>
        {/* 学历结束 */}
        {/* 星座开始 */}
        <ListItem bottomDivider onPress={this.setConstellation}>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: '#000' }}>星座</Text>
            <Text style={{ fontSize: 16, color: '#999' }}>{this.props.userInfo.constellation?this.props.userInfo.constellation:'选择星座'}</Text>
          </ListItem.Content>
        </ListItem>
        {/* 星座结束 */}
        {/* 个性开始 */}
        <ListItem bottomDivider onPress={() => this.props.navigation.navigate('Individuality')}>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: '#000' }}>个性动态</Text>
          </ListItem.Content>
        </ListItem>
        <Text style={{fontSize:16,color:'#666',padding:20}}>{this.props.userInfo.individuality}</Text>
        {/* 个性结束 */}
      </View>
    );
  }
}
const Copyreader = connect(state=>({userInfo:state.userInfo}),{updataUserInfo})(index)
export default  Copyreader
const style = StyleSheet.create({
  ImageView: {
    position: 'relative',
    width: 334,
    height: 334,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    alignSelf: 'center',
    marginTop: 100,
  },
  ScanImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
});
