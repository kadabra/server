<template>
  <row fill>
    <connection-browser :endpoints="endpoints"/>
    <endpoint-browser/>
  </row>
</template>

<script>
import ConnectionBrowser from '../components/ConnectionBrowser.vue'
import EndpointBrowser from '../components/EndpointBrowser.vue'

export default {
  components: {
    ConnectionBrowser,
    EndpointBrowser
  },
  data: () => ({
    rawEndpoints: {}
  }),
  computed: {
    endpoints() {
      let endpoints = []
      for (let [name, desc] of Object.entries(this.rawEndpoints)) {
        endpoints.push({name, desc})
      }
      endpoints.sort((a,b) => a.name>b.name ? 1 : a.name<b.name ? -1 : 0)
      return endpoints
    }
  },
  methods: {
    refreshEndpoints() {
      let component = this
      component.$K('endpoints')
        .find()
        .then(d => {
          component.rawEndpoints = d
        })
    }
  },
  mounted() {
    this.refreshEndpoints()
  },
}
</script>