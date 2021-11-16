import {DefaultRootState} from 'react-redux'
import {AxiosRequestConfig} from 'axios'
declare module 'react-redux'{
  export interface DefaultRootState{
    userInfo:any,
    jmessage:any,
  }
}
declare module 'axios'{
  export interface AxiosRequestConfig{
    uid?:any
  }
}
