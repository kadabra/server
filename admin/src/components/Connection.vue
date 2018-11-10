<template>
  <v-treeview class="connection"
    v-model="tree"
    :open.sync="open"
    :items="items"
    item-key="name"
  >
    <template slot="prepend" slot-scope="{ item, open, leaf }">
      <v-flex no-grow pr-2>
        <template v-if="leaf">
          <v-icon v-if="item.icon">
            {{ item.icon }}
          </v-icon>
          <v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
        </template>
      </v-flex>
    </template>
    <template slot="append" slot-scope="{ item, open, leaf }">
      <v-flex no-grow pl-3 pr-1 v-if="leaf">
        <v-icon class="muted fw" @click="editEndpoint">edit</v-icon>
        <v-icon class="muted fw pl-1" @click="searchEndpoint">search</v-icon>
        <v-flex class="fw"/>
      </v-flex>
      <v-flex no-grow pl-3 pr-1 v-else>
        <v-icon class="muted fw" @click.stop="serverSettings">settings</v-icon>
        <v-icon class="muted fw" @click.stop="refreshEndpoints">refresh</v-icon>
        <v-icon class="muted fw" @click.stop="createEndpoint">add</v-icon>
      </v-flex>
    </template>
  </v-treeview>
</template>

<script>
  export default {
    props: {
      connection: Object
    },
    data() {
      return {
        open: [this.connection.name],
        tree: [],
        rawEndpoints: {}
      }
    },
    computed: {
      endpoints() {
        let endpoints = []
        for (let [name, desc] of Object.entries(this.rawEndpoints)) {
          endpoints.push({name, desc})
        }
        endpoints.sort((a,b) => a.name>b.name ? 1 : a.name<b.name ? -1 : 0)
        return endpoints
      },
      items() {
        let connection = {
          name: this.connection.name,
          children: this.endpoints
        }
        return [connection]
      },
    },
    methods: {
      refreshEndpoints() {
        let component = this
        component.$K('endpoints')
          .find()
          .then(d => {
            component.rawEndpoints = d
          })
      },
      serverSettings() {
        alert('Server Settings [coming soon]')
      },
      createEndpoint() {
        alert('Create Endpoint')
      },
      editEndpoint() {
        alert('Edit Endpoint')
      },
      searchEndpoint() {
        alert('Search Endpoint')
      },
    },
    mounted() {
      this.refreshEndpoints()
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
