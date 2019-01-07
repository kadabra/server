<template>
  <div class="endpoint-explorer" :class="{ show: $store.getters.route === 'home' }">
    <div class="w-72 pt-4 mb-2 mx-2">
      <box-primary bg-black endpoint-header p-2 w-48 mx-auto h-10 items-center rounded>
        <span/>
        <txt-accent uppercase font-semibold w-full text-center>Endpoints</txt-accent>
        <icon-accent mdi-plus text-lg @click="$modal.show('new-endpoint')"/>
      </box-primary>
      <modal name="new-endpoint" height="auto">
        <new-endpoint-modal/>
      </modal>
    </div>
    <box-primary class="endpoint bg-black m-2 py-2 pl-3 w-72 h-10 flex items-center rounded"
      v-for="(endpoint, i) in allEndpoints" :key="i"
    >
      <icon-primary-static text-xl :class="`mdi-${endpoint.icon}`"/>
      <txt-primary endpoint-name cursor-pointer font-semibold text>{{ endpoint.name }}</txt-primary>
      <icon-accent mdi-dots-vertical text-lg item-wrapper__item @click.prevent.stop="openMenu($event, endpoint)"/>
    </box-primary>
    <vue-simple-context-menu
      :elementId="'myUniqueId'"
      :options="[{ name: 'Search' }, { name: 'New Record' }, { name: 'Edit Icon' }, { name: 'Delete Endpoint' }]"
      :ref="'contextMenu'"
      @optionClicked="optionClicked"
    />
  
  </div>
</template>

<script>
import NewEndpointModal from './modals/NewEndpointModal.vue'
import TextField from './TextField.vue'
import { mixins } from '@vue-feathers/vue-feathers'
const endpointsMixin = mixins.StreamsMixin(['endpoints'])

export default {
  mixins: [endpointsMixin],
  components: {
    NewEndpointModal,
    TextField
  },
  data: () => ({
  }),
  computed: {
    allEndpoints() {
      const output = [{ name: 'users', icon: 'account-multiple' }]
      for (let endpoint of Object.values(this.endpoints)) {
        output.push(endpoint)
      }
      return output
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    openMenu(event, item) {
      this.$refs.contextMenu.showMenu(event, item)
    },
    optionClicked({item, option}) {
      if (option.name === "Delete Endpoint") this.$K('endpoints').remove(item.name)
    },
    onInput(e) {
      console.log(e)
      alert(e)
    }
  },
  mounted() {
    this.subAll()
  }
}
</script>

<style scoped>
.endpoint-explorer {
  transition: transform 300ms;
  transform: translate(-20rem);
}
.endpoint-explorer.show {
  transform: translate(0);
}
.endpoint-header {
  display: grid;
  grid-template-columns: 2rem auto 2rem;
}
.endpoint {
  display: grid;
  grid-template-columns: 2rem auto 2rem;
}
.endpoint-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 13rem;
  overflow: hidden;
}
</style>
