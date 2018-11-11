import Vue from 'vue'
import client from '@kadabra/client'

Vue.prototype.$K = client()
Vue.prototype.$kadabra = client
