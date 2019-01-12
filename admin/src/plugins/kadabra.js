import Vue from 'vue'
import client from '@kadabra/client'

let kadabraServerUrl = window.location.href // When the admin is published, the client and server have the same url
try {
  if (webpackHotUpdate) {  // But when developing the admin, the admin itself runs on localhost:8080. So instead we
    url = 'localhost:7777' // have to manually point to a local kadabra server, which always runs on localhost:7777
  }
} catch(_) {}

const kadabra = client(kadabraServerUrl)

Vue.prototype.$K = kadabra

// Code below is a hack, will update @kadabra/client soon to absolve the hack
export const feathersClient = service('users').client
Vue.prototype.$kadabra = feathersClient
