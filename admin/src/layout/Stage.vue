<template>
  <v-content class="stage">
    <page/>
  </v-content>
</template>

<script>
import Page from './Page.vue'

export default {
  components: {
    Page
  },
}
</script>


<style scoped>
.stage,
.stage >>> .v-content__wrap {
  width: 100% !important;
  height: 100% !important;
}
.stage {
  width: 100% !important;
  height: 100% !important;
}
</style>
