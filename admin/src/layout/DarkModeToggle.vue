<template>
  <v-flex fit no-grow>
    <v-btn icon large @click.stop="toggleDark">
      <v-icon large>
        {{icon}}
      </v-icon>
    </v-btn>
  </v-flex>
</template>

<script>
export default {
  methods: {
    toggleDark() {
      this.$store.commit("set-dark", !this.dark)
    },
  },
  computed: {
    dark() {
      return this.$store.getters.dark
    },
    icon() {
      return this.dark ? "brightness_3" : "brightness_5"
    },
  },
}
</script>
