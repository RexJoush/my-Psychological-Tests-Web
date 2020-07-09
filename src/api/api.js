/*
 * @Description: api全局管理
 * @Autor: Bonny.meng
 * @Date: 2020-07-08 22:20:05
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-08 23:07:31
 */
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'
import { post, get } from './httpconfig'
const baseurl = 'http://www.rexjoush.com:3000/webapp'

export default {
  // 首页-轮播图

  getSwiper() {
    return get(`${baseurl}/home/getSwiper`)
  },
  delSwiper(params) {
    return get(`${baseurl}/home/delSwiper`, params)
  },
  uploadSwiper(params) {
    return post(`${baseurl}/home/changeSwiper`, params)
  },

  getConsultantList(params) {
    return post(baseurl + '/home/getConsultantList', params)
  },
  changeEap(params) {
    return post(baseurl + '/home/changeEap', params)
  }

  // 发现-心理测试管理
  // 获取心理测试列表

  // 添加新测试

  // 发现-心理咨询师管理
  // 获取咨询师列表
  // 添加咨询师
  // 删除咨询师

}
