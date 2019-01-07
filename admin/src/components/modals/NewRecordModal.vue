<template>
  <column h-128 w-full bg-grey-darkest text-grey>
    <row p-4 mb-4 bg-black flex justify-center>
      <txt-accent uppercase font-semibold>New Record: {{endpoint.name}}</txt-accent>
    </row>
    <column px-6 flex-1 flex>
      <textarea class="flex-1 bg-grey-dark font-mono" 
        v-model="record" @blur="onBlur"
      />
    </column>
    <row justify-center pt-4 pb-6>
      <modal-btn capitalize mr-5 :class="{'opacity-25 cursor-auto': !valid}" @click="onClickCreate">
        Create record
      </modal-btn>
    </row>
  </column>
</template>

<script>
export default {
  props: {
    endpoint: Object,
    required: true
  },
  data() {
    return {
      record: "{}"
    }
  },
  computed: {
    valid() {
      try {
        const obj = JSON.parse(this.record) // Try to parse it
        if (
          typeof obj === "object" && obj !== null // if it's an object
          && Object.keys(obj).length > 0 // and it's got entries in it
          ) {
          return true // it's valid
        } 
      } catch(_) {}
      return false
    }
  },
  methods: {
    onBlur($event) {
      if (this.valid) {
        this.record = JSON.stringify(JSON.parse($event.target.value),null,4)
      }
    },
    onClickCreate() {
      if (this.valid) {
        const record = this.record
        this.$F.authenticate().then(_ => {
          this.$F.service(this.endpoint.name).create(JSON.parse(record)).then(_ => {
            this.$modal.hide(`new-record-${this.endpoint.name}`)
          })
        })
      }
    }
  }
}
</script>
