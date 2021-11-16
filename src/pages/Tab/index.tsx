import React, { Component } from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home'
import CategoryScreen from '../Category'
import MessageScreen from '../Message'
import MyScreen from '../My'
import { setUserInfo } from '../../redux/actions/userInfo'
import { connect } from 'react-redux'
import request from '../../util/request';
const Tab = createBottomTabNavigator();
interface MyTabsClassProps {
  setUserInfo?: any,
  route?: any
}
class MyTabsClass extends Component<MyTabsClassProps> {
  state = {
    initialRouteName: "Home"
  }
  constructor(props: any) {
    super(props)
  }
  async componentDidMount() {
    const { params } = this.props.route
    if(params){
      if(params.initialRouteName){
        this.setState({ initialRouteName: params.initialRouteName }) 
      }
    }else{
      this.setState({ initialRouteName:'Home'}) 
    }
  }
  render() {
    const { initialRouteName } = this.state
    return (
      <Tab.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" options={{ tabBarInactiveTintColor: '#666', tabBarStyle: { height: 60 }, tabBarLabelStyle: { fontSize: 14, marginBottom: 5 }, tabBarActiveTintColor: '#f00', title: "首页", tabBarIcon: ({ focused, color, size }) => <Text style={{ fontFamily: "iconfont", color, fontSize: 19 }} >{'\ue601'}</Text> }} component={HomeScreen} />
        <Tab.Screen name="Category" options={{ tabBarInactiveTintColor: '#666', tabBarStyle: { height: 60 }, tabBarLabelStyle: { fontSize: 14, marginBottom: 5 }, tabBarActiveTintColor: '#f00', title: "分类", tabBarIcon: ({ focused, color, size }) => <Text style={{ fontFamily: "iconfont", color, fontSize: 22 }} >{'\ue61f'}</Text> }} component={CategoryScreen} />
        <Tab.Screen name="Message" options={{ tabBarInactiveTintColor: '#666', tabBarStyle: { height: 60 }, tabBarLabelStyle: { fontSize: 14, marginBottom: 5 }, tabBarActiveTintColor: '#f00', title: '消息', tabBarIcon: ({ focused, color, size }) => <Text style={{ fontFamily: "iconfont", color, fontSize: 20 }} >{'\ue695'}</Text> }} component={MessageScreen} />
        <Tab.Screen name="My" options={{ tabBarInactiveTintColor: '#666', tabBarStyle: { height: 60 }, tabBarLabelStyle: { fontSize: 14, marginBottom: 5 }, tabBarActiveTintColor: '#f00', title: '我的', tabBarIcon: ({ focused, color, size }) => <Text style={{ fontFamily: "iconfont", color, fontSize: 22 }} >{'\ue60a'}</Text> }} component={MyScreen} />
      </Tab.Navigator>
    );
  }

}
const MyTabs = connect(state => ({ userInfo: state.userInfo }), { setUserInfo })(MyTabsClass)
export default MyTabs