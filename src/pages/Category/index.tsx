
import React from 'react'
import { View, Text,StatusBar,Image ,ScrollView} from 'react-native'
import request,{baseURL} from '../../util/request'
  let article_typeArr:any = []
  request.get('/article_type').then((data:any)=>{
    article_typeArr = data
  })
export default function index() {
  return (
    <View>
        <StatusBar backgroundColor='transparent'  barStyle={'dark-content'}/>
        <Image source={require('../../res/category.webp')}   style={{width:"100%",height:150}}/>
         <View style={{alignItems:'center',padding:20,width:"100%",borderBottomWidth:1,borderBottomColor:"#ccc"}}><Text style={{fontSize:22}}>分类</Text></View>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
          {
            article_typeArr.map((v:any)=>{
              return(
                <View style={{width:'33.33%',height:100,alignItems:'center',justifyContent:'space-between',marginTop:20}} key={v.id}>
                    <Image source={{uri:baseURL+v.image}} style={{width:70,height:70,borderRadius:10}} />
                    <Text style={{fontSize:18,color:"#333"}}>{v.type}</Text>
                </View>
              )
            })
          }
        </View>
      </View>
  )
}
