<template>
  <div id="kadabra-admin" class="h-screen w-screen darkmode-transition"
    :class="{
      'bg-grey-darkest theme-dark': $store.getters.dark,
      'bg-grey-lightest theme-light': !$store.getters.dark
    }"
  >
    <kadabra-header/>
    <stage/>
  </div>
</template>

<script>
import KadabraHeader from './KadabraHeader.vue'
import Stage from './Stage.vue'

export default {
  name: 'KadabraApp',
  components: {
    KadabraHeader,
    Stage
  },
  mounted() {
    this.$kadabra
      .authenticate()
      .then(() => {
        console.log('kadabra: automatically logged in');
        this.$store.commit('set-route', 'home')
        this.$store.commit('set-loggedIn', true)
      })
      .catch(e => {
        if (e.name !== 'NotAuthenticated') console.error('kadabra: auth error', e.name);
        this.$store.commit('set-route', 'login')
        this.$store.commit('set-loggedIn', false)
      })
  }
}
</script>
