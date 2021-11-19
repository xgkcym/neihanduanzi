
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoverScreen from '..//Cover'
import TabScreen from '..//Tab'
import LoginScreen from '..//Login'
import ChatScreen from '..//Message/Chat';
import SettingScreen from '..//My/Setting';
import VideoInfoScreen from '..//VideoInfo';
import PublishScreen from '..//My/Publish';
import CopyreaderScreen from '..//My/Copyreader';
import IndividualityScreen from '..//My/Copyreader/Individuality';
import ImageInfoScreen from '..//ImageInfo';
import CardInfoScreen from '..//My/CardInfo';
import TextInfoScreen from '../TextInfo'
import SearchScreen from '../Search';
import UserDetailScreen from '../My/UserDetail';
import DomoScreen from '../Demo';
import { setNavigation } from '../../redux/actions/navigation';
import { setUserInfo } from '../../redux/actions/userInfo';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../util/request';
import JMessage from '../../util/JMessage';

const Stack = createNativeStackNavigator();
interface indexProps {
  setNavigation?: any
  setUserInfo?: any
}
function Index(props: indexProps) {
  const init = React.useCallback(async () => {
    const userInfostr: any = await AsyncStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfostr)
    try {
     await JMessage.login(userInfo.uid, userInfo.uid + 123)
    } catch (error) {
      console.log(error); 
    }
    props.setUserInfo(userInfo)
  }, [])
  React.useEffect(() => {
    init()
  }, [])
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={ref => props.setNavigation(ref)}>
        <Stack.Navigator initialRouteName='Tab' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Cover" component={CoverScreen} />
          <Stack.Screen name="Tab" component={TabScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="UserDetail" component={UserDetailScreen} />
          <Stack.Screen name="VideoInfo" component={VideoInfoScreen} />
          <Stack.Screen name="Publish" component={PublishScreen} />
          <Stack.Screen name="Copyreader" component={CopyreaderScreen} />
          <Stack.Screen name="Individuality" component={IndividualityScreen} />
          <Stack.Screen name="ImageInfo" component={ImageInfoScreen} />
          <Stack.Screen name="CardInfo" component={CardInfoScreen} />
          <Stack.Screen name="TextInfo" component={TextInfoScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Demo" component={DomoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
const Nav = connect(state => ({}), { setNavigation, setUserInfo })(Index)
export default Nav