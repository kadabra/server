<template>
  <v-dialog v-model="modal" width="500">
    
    <v-card slot="activator"
      ripple color="darken-20-percent"
      class="pointer flex no-grow center pa-2"
    >
      <span class='pr-2'>Add Connection</span>
      <v-icon>add</v-icon>
    </v-card>

    <v-card>
      <v-card-title primary-title 
        class="headline darken-20-percent"
      >
        Add New Connection
      </v-card-title>
      <v-card-text>
        <v-flex xs12>
          <v-text-field
            label="Name"
            v-model="name"
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="Host"
            v-model="host"
          />
        </v-flex>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat color="primary"
          @click="addConnection"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    name: 'Example',
    host: 'www.example.com',
    modal: false
  }),
  methods: {
    addConnection() {
      if (!this.name || !this.host) return
      let connections = this.$store.getters.connections
      connections.push({
        name: this.name,
        host: this.host
      })
      this.modal = false
    }
  }
}
</script>