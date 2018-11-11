<template>
  <column v-if="$store.getters.endpoint">
    <v-card flat color="darken-20-percent" class="pl-5 py-3 no-grow">
      <h2>/{{ endpoint.name }}</h2>
    </v-card>
    <v-flex px-5 pt-4>
      {{response}}
    </v-flex>
  </column>
</template>

<script>
export default {
  data() {
    return {
      subscription: null,
      response: {},
    }
  },
  computed: {
    endpoint() {
      return this.$store.getters.endpoint 
        ? this.$store.getters.endpoint.endpoint 
        : {}
    },
    connection() {
      return this.$store.getters.endpoint
        ? this.$store.getters.endpoint.connection
        : {}
    }
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
      let kadabra = component.$kadabra(component.connection.host)
      this.unsub()
      this.subscription = kadabra(component.endpoint.name)
        .watch({listStrategy: 'always'})
        .find({query: { $limit: 50 }})
        .subscribe(d => {
          component.response = d
        })
    },
    editConnection(connection) {
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
  watch: {
    endpoint(after, before) {
      if (after) {
        this.sub()
      }
    }
  },
}
</script>