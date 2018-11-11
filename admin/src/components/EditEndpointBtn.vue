<template>
  <v-dialog v-model="modal" width="500">
    <v-icon slot="activator" class="muted fw">edit</v-icon>
    <v-card>
      <v-card-title primary-title class="headline darken-20-percent">
        Edit Endpoint: {{name}}
      </v-card-title>
      <v-card-text>
        <row>
          <v-flex xs3 center>
            <v-icon>{{icon}}</v-icon>
          </v-flex>
          <v-flex xs9>
            <v-text-field label="Icon" v-model="icon"/>
          </v-flex>
        </row>
        <p><a href="https://cdn.materialdesignicons.com/3.0.39/" target="_blank">See available icons here</a> (opens in new tab)</p>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat color="danger" @click="deleteEndpoint">Delete</v-btn>
        <v-btn flat color="primary" @click="updateEndpoint">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { deleteEndpoint, updateEndpoint } from './methods.js'

export default {
  props: {
    connection: { type: Object, required: true },
    sub: { type: Function, required: true},
    endpoint: { type: Object, required: true },
  },
  data: () => ({
    name: 'example',
    icon: 'mdi-checkbox-blank-circle-outline',
    modal: false
  }),
  methods: {
    updateEndpoint() {
      updateEndpoint(this.endpoint.name, this,)
    },
    deleteEndpoint() {
      deleteEndpoint(this.endpoint.name, this)
    },
  },
  watch: {
    modal(after, before) {
      if (after) {
        this.name = this.endpoint.name
        this.icon = this.endpoint.icon
      }
    }
  }
}
</script>