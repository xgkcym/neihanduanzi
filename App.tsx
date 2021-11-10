// In App.js in a new project

import * as React from 'react';
import { Provider } from 'react-redux'
import store from './src/redux/store';
import JMessage from './src/util/JMessage';
import Nav from './src/pages/Nav'
export default  function App() {
  const [isNav,setisNav] = React.useState(false)
  React.useEffect(()=>{
    JMessageInit()
    setisNav(true)
  },[])
  async function JMessageInit(){
    await JMessage.init()
  }

  return (
    <Provider store={store}>
      {isNav?<Nav/>:<></>}
    </Provider>
  );
}

