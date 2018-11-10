<template>
  <v-app class="app-root" :dark="$store.getters.dark">
    <toolbar/>
    <stage/>
  </v-app>
</template>

<script>
import Toolbar from './Toolbar.vue'
import Stage from './Stage.vue'

export default {
  components: {
    Toolbar,
    Stage,
  },
  data: () => ({
    drawer: false,
  }),
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.$store.commit('set-width', window.innerWidth);
      this.$store.commit('set-height', window.innerHeight);
    }
  }
}
</script>

<style scoped>
.app-root {
  width: 100vw;
  height: 100vh;
}
.app-root >>> .application--wrap {
  width: 100% !important;
  height: 100% !important;
}
</style>

