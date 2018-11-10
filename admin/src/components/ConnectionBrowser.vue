<template>
  <v-card class="connection-browser">
    <connection :connection="connection" 
      v-for="connection in connections" :key="connection.name"
    />
  </v-card>
</template>

<script>
import Connection from './Connection.vue'

export default {
  components: {
    Connection
  },
  data: () => ({
    connections: [{name: 'Local'}],
  }),
}
</script>

<style scoped>
.connection-browser {
  min-width: 320px;
}
</style>
