import Vue from 'vue'
import kadabraClient from '@kadabra/client'

const url = webpackHotUpdate ? 'localhost:7777' : window.location.href
const service = kadabraClient(url)
export const feathersClient = service('users').client

Vue.prototype.$K = service
Vue.prototype.$kadabra = feathersClient
