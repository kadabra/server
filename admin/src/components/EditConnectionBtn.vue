<template>
  <v-dialog v-model="modal" width="500">
    <v-icon slot="activator" class="muted fw">settings</v-icon>
    <v-card>
      <v-card-title primary-title 
        class="headline darken-20-percent"
      >
        Edit Connection
      </v-card-title>
      <v-card-text>
        <v-flex xs12 px-4>
          <v-text-field label="Name" v-model="name"/>
        </v-flex>
        <v-flex xs12 px-4>
          <v-text-field label="Host" v-model="host"/>
        </v-flex>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat color="primary"
          @click="editConnection"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    connection: { type: Object, required: true },
    index: { type: Number, required: true}
  },
  data: () => ({
    name: 'Example',
    host: 'www.example.com',
    modal: false
  }),
  methods: {
    editConnection() {
      if (! this.name || ! this.host) return
      let connection = { name: this.name, host: this.host }
      let payload = {
        index: this.index, 
        connection
      }
      this.$store.commit('replace-connection', payload)
      this.modal = false
    }
  },
  watch: {
    modal(after, before) {
      if (after) {
        this.name = this.connection.name
        this.host = this.connection.host
      }
    }
  }
}
</script>