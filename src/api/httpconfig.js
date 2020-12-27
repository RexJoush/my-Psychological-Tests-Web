/*
 * @Description: 
 * @Autor: Bonny.meng
 * @Date: 2020-07-07 10:01:39
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-12-27 16:11:24
 */ 
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'
import fa from 'element-ui/src/locale/lang/fa'
// 响应时间
axios.defaults.timeout = 5 * 1000
// 配置cookie
// axios.defaults.withCredentials = false
// 配置请求头
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded;charset=UTF-8'
// 静态资源
Vue.prototype.$static = ''

// 配置接口地址
axios.defaults.baseURL = ''
// let loadingInstance
// let isViron = false
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    console.log('request interceptors1 succeed')
    return config
  },
  error => {
    console.log('request interceptors1 failure')
    return Promise.reject(error)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
//   response => {
//       console.log('response interceptors2 succeed')

//       return response;
//   },
//   error => {
//       console.log('response interceptors2 failure')
//       return Promise.reject(error)
//   }

)

// 发送请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      }, (err) => {
        reject(err.data)
      }).catch((err) => {
        reject(err.data)
      })
  })
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((res) => {
        resolve(res)
        console.log('请求成功')
        console.log(res)
      })
  })
}
