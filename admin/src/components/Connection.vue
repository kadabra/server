<template>
  <v-treeview class="connection"
    v-model="tree"
    :open.sync="open"
    :items="items"
    item-key="name"
  >
    
    <template slot="prepend" slot-scope="{ item, open, leaf }">
      <v-flex no-grow pr-3>
        <template v-if="leaf">
          <v-icon v-if="item.icon">
            {{ item.icon }}
          </v-icon>
          <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
        </template>
      </v-flex>
    </template>

    <template slot="append" slot-scope="{ item, open, leaf }">
      <v-flex no-grow pl-3 pr-1 v-if="!leaf">
        <edit-connection-btn :connection="connection" :index="index"/>
        <create-endpoint-btn :connection="connection" :sub="sub"/>
      </v-flex>
      <v-flex no-grow pl-3 pr-1 v-else>
        <edit-endpoint-btn :connection="connection" :sub="sub" :endpoint="item"/>
        <v-icon class="muted fw pl-1" 
          @click="searchEndpoint(item, connection)">search</v-icon>
      </v-flex>
    </template>
  
  </v-treeview>
</template>

<script>
import EditConnectionBtn from './EditConnectionBtn.vue'
import CreateEndpointBtn from './CreateEndpointBtn.vue'
import EditEndpointBtn from './EditEndpointBtn.vue'

export default {
  components: {
    EditConnectionBtn,
    CreateEndpointBtn,
    EditEndpointBtn
  },
  props: {
    connection: Object,
    index: Number
  },
  data() {
    return {
      kadabra: this.$kadabra(this.connection.host),
      open: [this.connection.name],
      tree: [],
      rawEndpoints: {},
      subscription: null
    }
  },
  computed: {
    endpoints() {
      let endpoints = []
      for (let [name, options] of Object.entries(this.rawEndpoints)) {
        endpoints.push(options)
      }
      return endpoints.sort((a,b) => a.name>b.name ? 1 : a.name<b.name ? -1 : 0)
    },
    items() {
      return [{
        name: this.connection.name,
        children: this.endpoints
      }]
    },
  },
  methods: {
    unsub() {
      if (this.subscription) {
        this.subscription.unsubscribe()
        this.subscription = null
      }
    },
    sub() {
      let component = this
      this.unsub()
      this.subscription = component.kadabra('endpoints')
        .watch()
        .find()
        .subscribe(d => {
          component.rawEndpoints = d
        })
    },
    searchEndpoint(endpoint, connection) {
      this.$store.commit('set-endpoint', {endpoint, connection})
    },
  },
  mounted() {
    this.sub()
  },
}
</script>

<style scoped>
.connection >>> .v-treeview-node:not(.v-treeview-node--leaf) > .v-treeview-node__root {
  padding: 24px 16px;
  background: rgba(0,0,0,0.2);
}
.connection >>> .v-treeview-node.v-treeview-node--leaf > .v-treeview-node__root {
  padding: 20px 16px;
}
.connection >>> .v-treeview-node__label {
  padding-right: 16px;
}
.connection >>> .v-treeview-node--leaf {
  margin: 0;
}
</style>

<style>
.muted {
  opacity: 0.1;
}
.v-treeview-node__root:hover .muted {
  opacity: 0.5;
}
.v-treeview-node__root:hover .muted:hover,
.muted:hover {
  opacity: 1;
}
.fw {
  width: 32px;
}
</style>

