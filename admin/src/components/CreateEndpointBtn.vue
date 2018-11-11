<template>
  <v-dialog v-model="modal" width="500">
    <v-icon slot="activator" class="muted fw">add</v-icon>
    <v-card>
      <v-card-title primary-title class="headline darken-20-percent">
        Create Endpoint
      </v-card-title>
      <v-card-text>
        <v-flex xs12>
          <v-text-field label="Name (recommended: kebab-case)" v-model="name"/>
        </v-flex>
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
        <v-btn flat color="primary" @click="createEndpoint">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createEndpoint } from './methods.js'

export default {
  props: {
    connection: { type: Object, required: true },
    sub: { type: Function, required: true},
  },
  data: () => ({
    name: 'example',
    icon: 'mdi-checkbox-blank-circle-outline',
    modal: false
  }),
  methods: {
    createEndpoint() {
      let endpoint = {
        name: this.name,
        icon: this.icon
      }
      createEndpoint(endpoint, this)
    }
  },
}
</script>