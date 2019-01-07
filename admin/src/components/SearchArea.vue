<template>
  <column id="search-area" flex-1 :class="{searching}">
    <column pr-4 py-4>
      <box-primary rounded h-12 px-4 items-center justify-between flex>
        <row>
          <txt-primary>
            <mdi mdi-magnify text-2xl mr-2/>
          </txt-primary>
          <txt-primary text-2xl>
            {{ searching && searching.endpoint }}
          </txt-primary>
        </row>
        <row>
          <txt-primary @click="$modal.show(`new-record-${endpoint}`)">
            <mdi mdi-plus text-2xl cursor-pointer/>
          </txt-primary>
          <txt-primary @click="$store.commit('set-searching', null)">
            <mdi mdi-close text-2xl cursor-pointer/>
          </txt-primary>
        </row>
      </box-primary>
    </column>
    <column pb-4 pr-4 v-if="endpoint && searchInitiated">
      <search-results/>
    </column>
  </column>
</template>

<script>
import SearchResults from './SearchResults.vue'

export default {
  components: {
    SearchResults
  },
  data: () => ({
    searchInitiated: false
  }),
  computed: {
    searching() {
      return this.$store.getters.searching
    },
    endpoint() {
      return this.searching && this.searching.endpoint
    }
  },
  watch: {
    searching(after, before) {
      if (!before && after) {
        setTimeout(_=>{
          this.searchInitiated = true
        }, 300)
      } else if (before && after) {
        this.searchInitiated = false
        this.$nextTick(_ => {
          this.searchInitiated = true
        })
      }
    }
  }
}
</script>

<style>
#search-area {
  transition: transform 300ms;
  transform: translate(0,-100%);
}
#search-area.searching {
  transform: translate(0,0);
}
</style>
