/*
 * @Description:
 * @Autor: Bonny.meng
 * @Date: 2020-07-01 16:51:03
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-08 10:54:22
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import VueResource from 'vue-resource'

import axios from 'axios'
import api from './api/api'

Vue.prototype.axios = axios
Vue.prototype.$api = api

/* 使用VueResource插件*/
Vue.use(VueResource)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
// 加上token
// 在请求头中加token
// axios.interceptors.request.use(
//   config => {
//   // 判断是否存在token，如果存在的话，则每个http header都加上token
//     let token = "eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNpMy90KwjAMQOF3yfUKXZO0y15G-pNABXW4DQTx3d288vbjnDese4EZcrv1Owywr_q89HZKtepVAgZjShgyNzFT8Wksxikc8Vofi_7N-lpgHlmCR6Q0DdDz9oNRKPkTrls_-obFiLA5xlAdMZMrMZnzmuOkEtm8wOcLAAD__w.Z5ot6ZYYqgkIrP__Lk7AXFEGhUIajMQGjaF0CDxW2bg"
//     if (!config.headers.hasOwnProperty('Authorization') && token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
