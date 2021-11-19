import * as React from 'react';
import { View, useWindowDimensions, Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RecommendPage from './Recommend'
import ImageType from './ImageType';
import Forum from './Forum';
import Attention from './Attention';
import { NavigationContext } from '@react-navigation/native'
const RecommendRoute = () => (
  <NavigationContext.Consumer>
    {
      (value: any) => (
        <RecommendPage navigation={value} />
      )
    }
  </NavigationContext.Consumer>
);

const AttentionRoute = () => (
  <NavigationContext.Consumer>
    {
      (value: any) => (
        <Attention navigation={value} />
      )
    }
  </NavigationContext.Consumer>
);
const ForumRoute = () => (
  <NavigationContext.Consumer>
    {
      (value: any) => (
        <Forum navigation={value} />
      )
    }
  </NavigationContext.Consumer>
);
const PhotoRoute = () => (
  <NavigationContext.Consumer>
    {
      (value: any) => (
        <ImageType navigation={value} />
      )
    }
  </NavigationContext.Consumer>
);
const renderScene = SceneMap({
  recommend: RecommendRoute,
  attention: AttentionRoute,
  forum: ForumRoute,
  photo: PhotoRoute
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'attention', title: '关注' },
    { key: 'recommend', title: '推荐' },
    { key: 'forum', title: '论坛' },
    { key: 'photo', title: '图片' },
  ]);

  return (
    <TabView
      renderTabBar={props => <TabBar  {...props} renderLabel={({ route }) => <Text>{route.title}</Text>} style={style.TabBar} />}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />



  );
}
const style = StyleSheet.create({
  TabBar: {
    backgroundColor: '#fff',
    justifyContent: "center",
    alignContent: "center",
  }
})

