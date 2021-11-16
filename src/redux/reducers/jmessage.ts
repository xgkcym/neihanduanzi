let stateInit:any[] = []
export default function navigationRedux(prestate = stateInit,action:{type:any,data:any}){
  const { data, type } = action
  switch (type) {
    case 'asyncSetMessage':
      return  data
    default:
      return prestate
  }
}