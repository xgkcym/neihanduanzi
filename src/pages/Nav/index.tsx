
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoverScreen from '..//Cover'
import TabScreen from '..//Tab'
import LoginScreen from '..//Login'
import ChatScreen from '..//Message/Chat';
import SettingScreen from '..//My/Setting';
import MyInfoScreen from '..//My/MyInfo';
import VideoInfoScreen from '..//VideoInfo';
import PublishScreen from '..//My/Publish';
import CopyreaderScreen from '..//My/Copyreader';
import IndividualityScreen from '..//My/Copyreader/Individuality';
import ImageInfoScreen from '..//ImageInfo';
import CardInfoScreen from '..//My/CardInfo';
import DomoScreen from '../Demo';
import { setNavigation } from '../../redux/actions/navigation';
import {connect} from 'react-redux'
const Stack = createNativeStackNavigator();
interface indexProps{
  setNavigation?:any
}
function index(props:indexProps) {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={ref=>props.setNavigation(ref)}>
        <Stack.Navigator initialRouteName='Tab' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Cover" component={CoverScreen} />
          <Stack.Screen name="Tab" component={TabScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="MyInfo" component={MyInfoScreen} />
          <Stack.Screen name="VideoInfo" component={VideoInfoScreen} />
          <Stack.Screen name="Publish" component={PublishScreen} />
          <Stack.Screen name="Copyreader" component={CopyreaderScreen} />
          <Stack.Screen name="Individuality" component={IndividualityScreen} />
          <Stack.Screen name="ImageInfo" component={ImageInfoScreen} />
          <Stack.Screen name="CardInfo" component={CardInfoScreen} />
          <Stack.Screen name="Demo" component={DomoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
const Nav = connect(state=>({}),{setNavigation})(index)
export default Nav