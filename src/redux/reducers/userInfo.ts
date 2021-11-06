import { DefaultRootState } from "react-redux"
let stateInit = {}
export default function userInfoRedux(prestate = stateInit, action: { type: string, data: any }) {
  const { data, type } = action
  switch (type) {
    case 'setusers':
      return  data
      case 'updatausers':
      return  {...prestate,...data}
    default:
      return prestate
  }
}