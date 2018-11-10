import Vue from 'vue'
import SimpleVuex from "simple-vuex"

Vue.use(SimpleVuex)

export default SimpleVuex.Store({
  state: {
    dark: true,
    menu: false,
    width: 0,
    height: 0
  }
})
