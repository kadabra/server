<template>
  <row fill>
    <connection-browser/>
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
}
</script>