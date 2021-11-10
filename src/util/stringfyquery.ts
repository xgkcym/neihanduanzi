const stringfyquery = (query:any)=>{
  let str = '?'
  for(let i in query){
    str += `${i}=${query[i]}&`
  }
  str = str.substr(0,str.length-1)
  return str
}
export default stringfyquery