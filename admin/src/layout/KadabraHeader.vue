<template>
  <header id="kadabra-header" class="z-10 py-2 px-3 bg-black fixed w-screen darkmode-transition"
    :class="{
      'bg-black': $store.getters.dark,
      'bg-grey-dark': !$store.getters.dark
    }"
  >
    <img src="presto.png"/>
    <row items-center>
      <txt-primary text-4xl pl-3 font-semibold>Kadabra</txt-primary>
    </row>
    <mdi text-4xl cursor-pointer darkmode-transition
      @click="$store.commit('toggle-dark')"
      :class="{
        'mdi-brightness-3 text-grey-light hover:text-white': $store.getters.dark,
        'mdi-brightness-5 text-white hover:text-grey-lighter': !$store.getters.dark
      }"
    />
    <mdi text-3xl mdi-logout darkmode-transition
      @click="logout"
      :class="{
        'text-grey-darker': $store.getters.dark && !$store.getters.loggedIn,
        'text-grey-light hover:text-white cursor-pointer': $store.getters.dark && $store.getters.loggedIn,
        'text-grey-lighter': !$store.getters.dark && !$store.getters.loggedIn,
        'text-white hover:text-grey-lighter': !$store.getters.dark && $store.getters.loggedIn
      }"
    />
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('set-route', 'login')
      setTimeout(() => {
        if (this.$store.getters.loggedIn) {
          this.$kadabra.logout()
            .then(()=>{
              document.cookie = 'feathers-jwt' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            })
            .then(()=>this.$store.commit('toggle-loggedIn', false))
            .then(()=>console.log('kadabra: logged out'))
            .catch(e=>console.log(e))
        }
      }, 400)
    }
  }
}
</script>

<style scoped>
#kadabra-header {
  height: 4rem;
  display: grid;
  grid-template-columns: 3rem auto 3rem 3rem;
  align-items: center;
}
</style>