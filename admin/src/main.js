import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/primitives'
import './plugins/kadabra'
import App from './layout/App.vue'
import store from "./store.js";

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
