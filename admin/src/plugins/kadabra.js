import Vue from 'vue'
import kadabraClient from '@kadabra/client'

let url = window.location.href
try {
  if (webpackHotUpdate) {
    url = 'localhost:7777'
  }
} catch(_) {}

const service = kadabraClient(url)
export const feathersClient = service('users').client

Vue.prototype.$K = service
Vue.prototype.$kadabra = feathersClient
