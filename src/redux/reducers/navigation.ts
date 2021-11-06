let stateInit = {}
export default function navigationRedux(prestate = stateInit,action:{type:any,data:any}){
  const { data, type } = action
  switch (type) {
    case 'navigation':
      return  { ...prestate, ...data }
    default:
      return prestate
  }
}