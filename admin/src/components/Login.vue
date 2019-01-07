<template>
  <div class="mt-32 rounded-lg w-72 m-auto py-4 px-6 darkmode-transition"
    :class="{
      'bg-black': $store.getters.dark,
      'bg-grey-dark': !$store.getters.dark
    }"
  >
    <row justify-center>
      <txt-primary capitalize text-2xl mb-4 font-semibold>{{ $store.getters.route }}</txt-primary>
    </row>
    <column field mb-6>
      <txt-accent text-xs uppercase>User</txt-accent>
      <input type="text" v-model="email" class="mt-2 w-full p-1 darkmode-transition" 
        :class="{
          'bg-grey-darkest text-grey-lightest': $store.getters.dark,
          'bg-grey-light text-grey-darkest': !$store.getters.dark
        }"
      >
    </column>
    <column field mb-6>
      <txt-accent text-xs uppercase>Password</txt-accent>
      <input v-model="pass" type="password" class="mt-2 w-full p-1 darkmode-transition" 
        :class="{
          'bg-grey-darkest text-white': $store.getters.dark,
          'bg-grey-light text-grey-darkest': !$store.getters.dark
        }"
      >
    </column>
    
    <collapse-transition>
      <column field v-if="$store.getters.route==='create'">
        <txt-accent text-xs uppercase>
          Magic Word 
          <mdi mdi-help-circle-outline :title="`This is available in the Kadabra cli for the connected server (${$store.getters.url})`"/>
        </txt-accent>
        <input v-model="magic" class="mt-2 mb-6 w-full p-1 darkmode-transition" 
          :class="{
            'bg-grey-darkest text-white': $store.getters.dark,
            'bg-grey-light text-grey-darkest': !$store.getters.dark
          }"
        >
      </column>
    </collapse-transition>

    <row items-center justify-around mb-2>
      <login-btn capitalize @click="onClick">{{ $store.getters.route }}</login-btn>
    </row>

  </div>
</template>

<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  data: () => ({
    email: '',
    pass: '',
    magic: '',
  }),
  components: {
    CollapseTransition
  },
  methods: {
    createUser() {
      if (this.email && this.pass) {
        this.$K('users').create({
          email: this.email,
          password: this.pass,
          magic: this.magic
        }).then(() => {
          this.$store.commit('set-route', 'login')
          console.log('kadabra: created user in')
        }).catch(e => {
          console.error('kadabra: error creating user', e);
        });
      }
    },
    login() {
      if (this.email && this.pass) {
        this.$kadabra.logout()
          .then(() => {
            this.$kadabra.authenticate({
              strategy: "local",
              email: this.email,
              password: this.pass
            }).then(() => {
              this.$store.commit('toggle-loggedIn')
              console.log('kadabra: logged in')
            }).then(() => {
              setTimeout(() => {
                this.$store.commit('set-route', 'home')
              }, 400)
            }).catch(e => {
              console.error('kadabra: auth error', e);
            });
          })
      }
    },
    onClick() {
      if (this.$store.getters.route === 'create') {
        this.createUser()
      } else {
        this.login()
      }
    }
  }
}
</script>
