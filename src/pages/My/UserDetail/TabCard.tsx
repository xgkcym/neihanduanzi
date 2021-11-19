import { NavigationContext } from '@react-navigation/core';
import * as React from 'react';
import { View, useWindowDimensions,Text,StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AllArticle from './AllArticle'
import TextArticle from './TextArticle'
const AllArticleRoute = () => (
  <NavigationContext.Consumer>
  {
    (value: any) => (
      <AllArticle navigation={value} />
    )
  }
</NavigationContext.Consumer>
);
const TextArticleRoute = () => (
  <NavigationContext.Consumer>
  {
    (value: any) => (
      <TextArticle navigation={value} />
    )
  }
</NavigationContext.Consumer>
);
const renderScene = SceneMap({
  allArticle: AllArticleRoute,
  textArticle: TextArticleRoute,
});

export default function TabCard() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'allArticle', title: '全部'},
    { key: 'textArticle', title: '论坛' },
  ]);
  React.useEffect(()=>{
    
  })
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