import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import GobackTitle from '../../../compontents/GobackTitle';
import Emotion from '../../../compontents/Emotion';
import VideoInfo from './VideoPicker';
import MyVideo from '../../../compontents/MyVideo';
export default class Publish extends Component {
  state = {
    title: "",
    isShowEmoji: true,
    isShowImage: false,
    isShowVideo: false,
    imageArr: [],
    videoInfo: [],

  }

  
  openImagePicker = () => {
    const { imageArr } = this.state
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true
    }).then(image => {
      let imagearr = [...imageArr, ...image]
      if (imagearr.length >= 6) {
        this.setState({ imageArr: imagearr.slice(0, 6) })
      } else {
        this.setState({ imageArr: imagearr })
      }
    });
  }
  openVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {
      this.setState({ videoInfo: [video] })
    });
  }
  publishInput: TextInput | null | undefined;
  getEmojiText = (value: any) => {

  }

  deleteImage = (uri: any) => {
    let { imageArr } = this.state
    imageArr = imageArr.filter((v: any) => {
      return v.path !== uri
    })
    this.setState({ imageArr })
  }

  render() {
    const { videoInfo, imageArr, title, isShowEmoji, isShowImage, isShowVideo } = this.state
    return (
      <View style={{ flex: 1 }}>
        <GobackTitle
          title={'论坛'}
          props={this.props}
          rightText='发布'
          rightTextStyle={{ fontSize: 16, width: 35 }} />
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
                  <View style={{flex:1,position:'relative'}}>
                      <VideoInfo videoInfo={videoInfo[0]} onPressError={()=>this.setState({videoInfo:[]})}/>
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
