<template>
  <main class="stage pt-16 h-full w-full flex justify-center flex-row-reverse">
    <collapse-transition>
      <template v-if="!$store.getters.loggedIn && ['login', 'create'].includes($store.getters.route)">
        <container mx-auto pt-4 absolute>
          <login/>
          <div class="text-center pt-4" v-if="$store.getters.route==='login'">
            <txt-secondary>or <span class="underline cursor-pointer" @click="$store.commit('set-route', 'create')">create an account</span></txt-secondary>
          </div>
          <div class="text-center pt-4" v-else>
            <txt-secondary>or return to <span class="underline cursor-pointer" @click="$store.commit('set-route', 'login')">login</span></txt-secondary>
          </div>
        </container>
      </template>
    </collapse-transition>
    <template v-if="$store.getters.loggedIn">
      <search-area/>
      <endpoint-explorer/>
    </template>
  </main>
</template>

<script>
import Login from './../components/Login.vue'
import EndpointExplorer from './../components/EndpointExplorer.vue'
import SearchArea from './../components/SearchArea.vue'
import { CollapseTransition } from 'vue2-transitions'

export default {
  components: {
    CollapseTransition,
    Login,
    EndpointExplorer,
    SearchArea,
  }
}
</script>
