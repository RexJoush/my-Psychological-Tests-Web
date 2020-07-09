/*
 * @Description: 
 * @Autor: Bonny.meng
 * @Date: 2020-07-07 09:38:20
 * @LastEditors: Bonny.meng
 * @LastEditTime: 2020-07-07 10:41:55
 */
import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}