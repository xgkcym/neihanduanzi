import * as React from 'react';
import { View, useWindowDimensions,Text,StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


const AttentionRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const ForumRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const renderScene = SceneMap({
  attention: AttentionRoute,
  forum: ForumRoute,
});

export default function TabCard() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'attention', title: '全部'},
    { key: 'forum', title: '论坛' },
  ]);

  return (
    <TabView
      renderTabBar={props => <TabBar {...props} renderLabel={({route})=><Text>{route.title}</Text>}  style={style.TabBar}/>}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width}}
    />
  );
}
const style = StyleSheet.create({
  TabBar:{
    backgroundColor: '#fff',
    justifyContent:"center",
    alignContent:"center",
  }
})