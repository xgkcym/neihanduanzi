import React from 'react'
import { View, Text, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { EMOTIONS_DATA } from '../Emotion/datasource'
const regularEmoji = function (text: any) {
  let result: any[] = []
  const regular = /(\/\{.+?\})/g
  const symbol = /(\n)/g
  text.split(symbol).map((v: any) => {

    v.split(regular).map((v: any) => {
      if (regular.test(v)) {
        result.push({
          image: v
        })
      } else {
        result.push({
          text: v
        })
      }
    })
  })
  return result
}
interface TransitionEmojiProps {
  value: any,
  style?: ViewStyle,
  fontStyle?: TextStyle,
  emojiStyle?: ImageStyle
}
export default function TransitionEmoji(props: TransitionEmojiProps) {
  // 把表情文字换成表情
  function transitionEmoji(text: any) {
    const conent = regularEmoji(text)
    return conent.map((v: any, i: any) => {
      if (v.text == '\n') {
        return <View key={i} style={{ width: '100%', height: 1 }}></View>
      }
      if (v.image) {
        return <Image key={i} style={{ width: 25, height: 25, ...props.emojiStyle }} source={EMOTIONS_DATA[v.image]} />
      } else if (v.text) {
        return <Text key={i} style={{ fontSize: 14, color: '#666', ...props.fontStyle }}>{v.text}</Text>
      }
    })
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: 'wrap', ...props.style }} >{transitionEmoji(props.value)}</View>
  )
}
