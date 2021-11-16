import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import GobackTitle from '../../../compontents/GobackTitle';
import Emotion from '../../../compontents/Emotion';
import VideoInfo from './VideoPicker';
import MyVideo from '../../../compontents/MyVideo';
import { Alert } from 'react-native';
import request from '../../../util/request';
import Picker from 'react-native-picker';
import { connect } from 'react-redux'
let imageArr: any[]
let article_typeList: any[]
class index extends Component<any> {
  state = {
    title: "",
    isShowEmoji: true,
    isShowImage: false,
    isShowVideo: false,
    imageArr: [],
    videoInfo: [],
    article_type: '',
    article_typeList: article_typeList,
    loading: false
  }


  openImagePicker = async () => {
    const { imageArr } = this.state
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true
    })


    let imagearr = [...imageArr, ...image]
    if (imagearr.length >= 6) {
      this.setState({ imageArr: imagearr.slice(0, 6) })
    } else {
      this.setState({ imageArr: imagearr })
    }

  }
  openVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {
      this.setState({ videoInfo: [video] })
    });
  }
  publishInput: TextInput | null | undefined;
  deleteImage = (uri: any) => {
    let { imageArr } = this.state
    imageArr = imageArr.filter((v: any) => {
      return v.path !== uri
    })
    this.setState({ imageArr })
  }

  setArticleType = async () => {
    const { article_typeList } = this.state
    Picker.init({
      pickerData: article_typeList,
      selectedValue: [article_typeList[0]],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择文章类型',
      onPickerConfirm: async (data) => {
        this.setState({ article_type: data[0] })
      }
    })
    Picker.show()
  }
  async componentDidMount() {
    const article_type: any[] = await request.get('/article_type')
    let article_typeList: any[] = []
    article_type.map((v: any) => {
      article_typeList.push(v.type)
    })

    this.setState({ article_typeList })

  }
  publish = async () => {
    const { imageArr, videoInfo, title, article_type, loading } = this.state
    if (!loading) {
      this.setState({ loading: true })
      let imageList: any[]
      imageList = imageArr
      let videoList: any[] = videoInfo
      let content_type = 'text'
      let res: any
      let content = []
      if (article_type == '') {
        return Alert.alert('请选择论坛类型')
      }
      if (imageList.length > 0 && videoInfo.length > 0) {
        return Alert.alert('图片和视频只能选一种')
      }
      if (imageList.length > 0) {
        content_type = 'image'
        for (let i = 0; i < imageList.length; i++) {
          const pathname = imageList[i].path.split('/')
          const formdata = new FormData()
          formdata.append('content', {
            uri: imageList[i].path,
            name: pathname[pathname.length - 1],
            type: imageList[i].mime
          })
          let config = { headers: { 'Content-Type': 'multipart/form-data;' } }
          const res: any = await request.post('/article/content', formdata, config)
          if (res.status == 200) {
            content.push(res.file.path)
          } else {
            return Alert.alert('图片加载失败')
          }
        }
        res = await request.post('/article', { uid: this.props.userInfo.uid, title, content: content, article_type, content_type })
        console.log(res);


      }
      if (videoList.length > 0) {
        content_type = 'video'
        let content: any[] = []
        for (let i = 0; i < videoList.length; i++) {
          const pathname = videoList[i].path.split('/')
          const formdata = new FormData()
          formdata.append('content', {
            uri: videoList[i].path,
            name: pathname[pathname.length - 1],
            type: videoList[i].mime
          })
          let config = { headers: { 'Content-Type': 'multipart/form-data;' } }
          const res: any = await request.post('/article/content', formdata, config)
          if (res.status == 200) {
            content.push(res.file.path)
          } else {
            return Alert.alert('图片加载失败')
          }
        }
        res = await request.post('/article', { uid: this.props.userInfo.uid, title, content, content_type, article_type })
      }
      if (imageList.length == 0 && videoInfo.length == 0) {
        res = await request.post('/article', { uid: this.props.userInfo.uid, title, content_type, article_type })
      }
      if (res.status == 200) {
        Alert.alert('发布论坛成功')
        this.props.navigation.goBack()
      }
      this.setState({ loading: false })
    }
  }
  getEmojiText = (value: any) => {
    let { title } = this.state
    title += value.key
    this.setState({ title })
  }
  render() {
    const { videoInfo, imageArr, title, isShowEmoji, isShowImage, isShowVideo, article_type } = this.state
    console.log(title);

    return (
      <View style={{ flex: 1 }}>
        <GobackTitle
          title={'论坛'}
          props={this.props}
          rightText='发布'
          rightTextStyle={{ fontSize: 16, width: 35 }}
          rightOnPress={this.publish}
        />
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
            value={title}
            onChangeText={value => this.setState({ title: value })}
            placeholder="请填写动态（140字以内）"
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
          <Text onPress={this.setArticleType} style={{ position: "absolute", bottom: 10, right: 20, height: 60, lineHeight: 60, color: '#666' }}>{!article_type ? '选择论坛类型' : `论坛类型:${article_type}`}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#ddd',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                marginLeft: 20,
                backgroundColor: isShowEmoji ? '#fff' : '#ddd',
                width: 60,
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                this.setState({ isShowImage: false, isShowEmoji: true, isShowVideo: false })
              }>
              <Text style={{ fontFamily: "iconfont", fontSize: 30 }}>{'\ue93d'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                marginLeft: 10,
                backgroundColor: isShowImage ? '#fff' : '#ddd',
                width: 60,
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                this.setState({ isShowImage: true, isShowEmoji: false, isShowVideo: false })
              }>
              <Text style={{ fontFamily: "iconfont", fontSize: 30 }}>{'\ue640'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                marginLeft: 10,
                backgroundColor: isShowVideo ? '#fff' : '#ddd',
                width: 60,
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                this.setState({ isShowImage: false, isShowEmoji: false, isShowVideo: true })
              }>
              <Text style={{ fontFamily: "iconfont", fontSize: 35 }}>{'\ue603'}</Text>
            </TouchableOpacity>

          </View>
          {isShowImage ? (
            <ScrollView style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10 }}>
                {imageArr.map((v: any) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.deleteImage(v.path)}
                      style={{ marginLeft: 10, marginTop: 10 }}
                      key={v.modificationDat}>
                      <Image
                        source={{ uri: v.path }}
                        style={{ width: 80, height: 100 }}
                      />
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  onPress={this.openImagePicker}
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    width: 80,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#ccc',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 70,
                      color: '#999',
                      fontWeight: '100',
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <></>
          )}
          {
            isShowEmoji ?
              <Emotion style={{ paddingTop: 5, paddingBottom: 20 }} onPress={this.getEmojiText} /> : <></>
          }
          {isShowVideo ? (
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10, flex: 1 }}>
                {videoInfo.length > 0 ?
                  <View style={{ flex: 1, position: 'relative' }}>
                    <VideoInfo videoInfo={videoInfo[0]} onPressError={() => this.setState({ videoInfo: [] })} />
                  </View> :
                  <TouchableOpacity
                    onPress={this.openVideoPicker}
                    style={{
                      marginLeft: 10,
                      marginTop: 10,
                      width: 80,
                      height: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#ccc',
                      borderWidth: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 70,
                        color: '#999',
                        fontWeight: '100',
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    )
  }
}
const Publish = connect(state => ({ userInfo: state.userInfo }))(index)
export default Publish