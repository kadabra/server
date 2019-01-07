<template>
  <column h-128 w-full bg-grey-darkest text-grey>
    <row p-4 mb-4 bg-black flex justify-center>
      <txt-accent uppercase font-semibold>Edit Record: {{endpoint.name}} / {{editing._id}}</txt-accent>
    </row>
    <column px-6 flex-1 flex>
      <textarea class="flex-1 bg-grey-dark font-mono" 
        v-model="record" @blur="onBlur"
      />
    </column>
    <row justify-center pt-4 pb-6>
      <modal-btn capitalize mr-5 :class="{'opacity-25 cursor-auto': !valid}" @click="onClickUpdate">
        Update Record
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
      record: JSON.stringify(this.$store.getters.editing, null, 4)
    }
  },
  computed: {
    editing() {
      return this.$store.getters.editing
    },
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
    onClickUpdate() {
      const record = JSON.parse(this.record)
      const id = record._id
      delete record._id
      if (this.valid && (this.editing._id === id)) {
        this.$F.authenticate().then(_ => {
          this.$F.service(this.endpoint.name).update(id, record).then(_ => {
            this.$modal.hide(`edit-record-${this.endpoint.name}`)
          })
        })
      } else {
        console.log("Don't change the id")
      }
    }
  }
}
</script>
