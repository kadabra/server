import Vue from 'vue'
import SimpleVuex from "simple-vuex"

Vue.use(SimpleVuex)

export default SimpleVuex.Store({
  state: {
    dark: true,
    modal: false,
    route: 'loading',
    loggedIn: false,
    url: webpackHotUpdate ? 'localhost:7777' : window.location.href,
    endpoint: null
  }
})
