import axios, { AxiosInstance,AxiosRequestConfig } from "axios";
import store from "../redux/store";
export const baseURL = 'http://192.168.137.170:3000'
// export const baseURL = 'http://192.168.137.151:3000'
// export const baseURL = 'http://192.168.43.137:3000'

const request: AxiosInstance = axios.create({
  baseURL:baseURL+'/moveApp',
  timeout:5000,
  headers:{
    authorization:store.getState().userInfo.token
  }
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // console.log(config);
  console.log(config);
  
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  if(response.data.status == 401){
    store.getState().navigation.navigate('Login')
  }
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default request;