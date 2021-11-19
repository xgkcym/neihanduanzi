import { NavigationContext } from '@react-navigation/native';
import React from 'react'
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import request from '../../util/request';
import stringfyquery from '../../util/stringfyquery';
import Article from './Article';
import Users from './Users';
import PubSub from 'pubsub-js';
const ArticleRoute = () => (
  <NavigationContext.Consumer>
    {
      (value: any) => (
        <Article navigation={value} />
      )
    }
  </NavigationContext.Consumer>
);
const UsersRoute = () => (
  <NavigationContext.Consumer>
    {
      (value: any) => (
        <Users navigation={value} />
      )
    }
  </NavigationContext.Consumer>
);
const renderScene = SceneMap({
  article: ArticleRoute,
  users: UsersRoute,
});
function Index(props: any) {
  const [search, setSearch] = React.useState('')
  const [index, setIndex] = React.useState(1);
  const updateSearch = React.useCallback((value) => {
    setSearch(value)
  }, [search])
  const layout = useWindowDimensions();
  const [routes] = React.useState([
    { key: 'article', title: '文章' },
    { key: 'users', title: '用户' },
  ]);
  const onSearch = () => {
    getArticle()
    getUsers()
  }
  const getArticle = async () => {
    const article = await request.get('/search/article' + stringfyquery({ title: search }))
    PubSub.publish('article', article)
  }
  const getUsers = async () => {
    const users = await request.get('/search/users' + stringfyquery({ nickname: search }))
    PubSub.publish('users', users)
  }
  React.useEffect(() => {
    PubSub.subscribe('getArticle', () => {
      getArticle()
    })
    PubSub.subscribe('getUsers', () => {
      getUsers()
    })
    return () => {
      PubSub.unsubscribe('getArticle');
      PubSub.unsubscribe('getUsers');
    }
  }, [])
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SearchBar
          showLoading
          searchIcon={<Text onPress={() => props.navigation.goBack()} style={{ fontFamily: "iconfont", color: "#fff", fontSize: 20 }}>{'\ue600'}</Text>}
          clearIcon={<Text onPress={onSearch} style={{ fontFamily: "iconfont", color: "#fff", fontSize: 20 }}>{'\ue651'}</Text>}
          containerStyle={{ flex: 1 }}

          placeholder="输入您要搜索的关键字"
          onChangeText={updateSearch}
          value={search}
        />
      </View>
      <TabView
        renderTabBar={props => <TabBar  {...props} renderLabel={({ route }) => <Text>{route.title}</Text>} style={style.TabBar} />}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>

  )
}
const style = StyleSheet.create({
  TabBar: {
    backgroundColor: '#fff',
    justifyContent: "center",
    alignContent: "center",
  }
})

const Search = Index
export default Search