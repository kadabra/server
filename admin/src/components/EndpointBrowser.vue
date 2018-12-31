<template>
  <div class="endpoint-browser">
    <column>
      <v-flex endpoint-browser-header px-5 py-3 no-grow align-center justify-space-between :class="endpoint.name ? 'darken-20-percent' : undefined">
        <h2>{{ endpoint.name ? `/${endpoint.name}` : "Select an endpoint" }}</h2>
        <span class="mdi mdi-window-close title pointer" v-if="endpoint.name" @click="closeBrowser"/>
      </v-flex>
      <v-flex px-5 pt-4>
        {{ response }}
      </v-flex>
    </column>
    <v-card :class="{ offscreen: ! endpoint.name }">
      <editor-window/>
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
    response: null,
    editorString: '{\n    \n}'
  }),
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
    closeBrowser() {
      this.$store.commit('set-endpoint', '')
      this.response = null
    }
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
</style>
