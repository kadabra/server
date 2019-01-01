<template>
  <div class="endpoint-browser">
    <column>
      <v-flex endpoint-browser-header px-5 py-3 no-grow align-center justify-space-between :class="endpoint && endpoint.name ? 'darken-20-percent' : undefined">
        <h2>
          <span class="headline">
            {{ endpoint && endpoint.name ? `/${endpoint.name}` : "Select an endpoint" }}
            <span v-if="response">({{ response.total }})</span>
          </span>
        </h2>
        <span class="mdi mdi-window-close title pointer" v-if="endpoint && endpoint.name" @click="closeBrowser"/>
      </v-flex>
      <row db-record-holder no-grow px-5 pt-4 v-if="response">
        <v-card class="db-record ma-1 pl-3 pb-3 pt-4 pr-4 no-grow" v-for="(record, i) in response.data" :key="i">
          <v-menu offset-y class="db-record-menu-btn">
            <div slot="activator">
              <span class="mdi mdi-dots-vertical title pointer" v-if="endpoint && endpoint.name"/>
            </div>
            <v-list>
              <v-list-tile @click="remove(record)">
                <v-list-tile-title>Delete</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <pre>{{ record | formatted }}</pre>
        </v-card>
      </row>
    </column>
    <v-card :class="{ offscreen: ! (endpoint && endpoint.name) }">
      <editor-window :create="create"/>
    </v-card>
  </div>
</template>

<script>
import EditorWindow from './EditorWindow.vue'

export default {
  components: {
    EditorWindow
  },
  data: () => ({
    subscription: null,
    kadabra: null,
    page: 1,
    response: null,
    editorString: '{\n    \n}'
  }),
  filters: {
    formatted(record) {
      let obj = Object.assign({}, record)
      delete obj._id
      return JSON.stringify(obj, null, 2)
    }
  },
  computed: {
    endpoint() {
      return this.$store.getters.endpoint 
        ? this.$store.getters.endpoint.endpoint 
        : null
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
        this.kadabra = null
      }
    },
    sub() {
      let component = this
      this.kadabra = this.$kadabra(this.connection.host)(this.endpoint.name)
      this.subscription = this.kadabra
        .watch({listStrategy: 'always'})
        .find({query: { $limit: false }})
        .subscribe(response => {
          component.response = response
        })
    },
    create(obj) {
      if (!Object.keys(obj)) return
      this.kadabra.create(obj)
    },
    remove(record) {
      if (record._id) this.kadabra.remove(record._id)
    },
    closeBrowser() {
      this.$store.commit('set-endpoint', '')
      this.response = null
    }
  },
  mounted() {
    if (this.endpoint && !this.response) {
      this.unsub()
      this.sub()
    }  
  },
  watch: {
    endpoint(after, before) {
      if (after) {
        this.unsub()
        this.sub()
      }
    }
  },
}
</script>

<style scoped>
.endpoint-browser-header {
  transition: background-color 300ms;
}
.offscreen {
  transform: translate(300px)
}
.endpoint-browser {
  display: grid;
  grid-template-columns: auto 300px;
  width: 100%;
}
.db-record-holder {
  flex-wrap: wrap;
}
.db-record {
  position: relative;
  min-width: 80px;
}
.db-record-menu-btn {
  opacity: 0.3;
  position: absolute;
  right: 0;
  top: 0.25rem;
}
.db-record-menu-btn:hover {
  opacity: 1.0;
}
</style>
