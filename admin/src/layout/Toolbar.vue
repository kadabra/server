<template>
  <v-toolbar app>
    <span class="site-title display-1 bold">Kadabra</span>
    <v-spacer/>
    <dark-mode-toggle/>
  </v-toolbar>
</template>

<script>
import DarkModeToggle from "./DarkModeToggle.vue"

export default {
  components: {
    DarkModeToggle,
  },
}
</script>

<style scoped>
.title-wrapper:before {
  background-color: initial !important;
}
.site-title {
  text-transform: capitalize;
}
</style>
