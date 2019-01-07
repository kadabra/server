import Vue from 'vue'
import SimpleVuex from "simple-vuex"

Vue.use(SimpleVuex)

let url = window.location.href
try {
  if (webpackHotUpdate) {
    url = 'localhost:7777'
  }
} catch(_) {}

export default SimpleVuex.Store({
  state: {
    dark: true,
    modal: false,
    searching: null,
    editing: null,
    route: 'loading',
    loggedIn: false,
    endpoint: null,
    url
  }
})
