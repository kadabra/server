<template>
  <v-card class="connection-browser">
    <box fill-height justify-space-between>
      
      <column>
        <connection :connection="connection" :index="i" 
          v-for="(connection, i) in connections"
          :key="connection.name"
        />
      </column>
      
      <add-connection-btn/>
    
    </box>
  </v-card>
</template>

<script>
import AddConnectionBtn from './AddConnectionBtn.vue'
import Connection from './Connection.vue'

export default {
  components: {
    Connection,
    AddConnectionBtn
  },
  data: () => ({
    connections: []
  }),
  computed: {
    cons() {
      return this.$store.getters.connections
    }
  },
  methods: {
    setConnections() {
      this.connections = this.$store.getters.connections
    },
  },
  watch: {
    cons: {
      immediate: true,
      handler: "setConnections",
      deep: true
    }
  }
}
</script>

<style scoped>
.connection-browser {
  min-width: 320px;
}
</style>
