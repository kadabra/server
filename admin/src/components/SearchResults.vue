<template>
  <row flex-1 flex-wrap>
    <div class="result-wrapper p-1" v-for="(result, i) in results" :key="i">
      <box-primary class="result rounded p-1">
        <row items-center justify-between pl-1 pb-1>
          <txt-primary pr-2>id: {{ result._id }}</txt-primary>
          <txt-primary cursor-pointer>
            <mdi mdi-close text-lg @click="remove(result._id)"/>
          </txt-primary>
        </row>
        <row items-center justify-between>
          <box-secondary p-1 flex-1 overflow-hidden>
            <txt-primary>
              <pre class="result-data cursor-pointer"
                @click="onClickResult(result)"
              >{{ result | noId }}</pre>
            </txt-primary>
          </box-secondary>
        </row>
      </box-primary>
    </div>
  </row>
</template>

<script>
export default {
  data() {
    return {
      subscription: null,
      results: [],
      endpoint: this.$store.getters.searching.endpoint
    }
  },
  filters: {
    noId(result) {
      const _res = Object.assign({}, result)
      delete _res._id
      return _res
    }
  },
  methods: {
    sub() {
      this.subscription = this.$F.authenticate().then(_ => {
        this.$F.service(this.endpoint)
        .watch()
        .find({ query: { $limit: '-1' } })
        .subscribe(d => { 
          this.results = d.data ? d.data : d
        })
      })
    },
    remove(id) {
      const confirmation = window.confirm("Are you sure you want to delete this record?")
      if (confirmation) {
        this.$F.authenticate().then(_ => {
          this.$F.service(this.endpoint)
          .remove(id)
        })
      }
    },
    onClickResult(result) {
      this.$store.commit('set-editing', result)
      this.$modal.show(`edit-record-${this.endpoint}`)
    }
  },
  created() {
    this.sub()
  },
}
</script>

<style scoped>
.result-wrapper {
  width: 16rem;
  overflow: hidden;
}
.result-data {
  max-height: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
