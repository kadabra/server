import Vue from 'vue'
import SimpleVuex from "simple-vuex"

Vue.use(SimpleVuex)

export default SimpleVuex.Store({
  state: {
    dark: true,
    menu: false,
    width: 0,
    height: 0,

    connections: [
      {
        name: 'Local',
        host: 'http://localhost:7777'
      }
    ],

    endpoint: null
  },
  mutations: {
    'replace-connection'(state, payload) {
      const { index, connection } = payload
      state.connections.splice(index, 1, connection)
    }
  }
})
