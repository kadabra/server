import Vue from 'vue'
import './plugins/primitives'
import './plugins/kadabra'
import './plugins/vue-feathers'
import './plugins/context-menu'
import './plugins/modal'
import App from './layout/App.vue'
import store from "./store.js";

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
