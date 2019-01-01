<template>
  <column raised editor-window>
    <v-card flat color="darken-20-percent" class="pl-5 py-3 no-grow">
      <h2>Create DB Record</h2>
    </v-card>
    <column align-center px-5 pt-3>
      <textarea style="width:200px; height:300px;white-space: pre-wrap; font-family: monospace" 
        class="darken-10-percent" 
        v-model="editorString"
        placeholder="JSON text area"
      ></textarea>
      <v-btn :disabled="!parsable || !hasKeys" @click="onCreateClick">
        Create
      </v-btn>
    </column>
  </column>
</template>

<script>
export default {
  props: {
    create: Function
  },
  data: () => ({
    editorString: '{\n    \n}',
    parsable: true,
    hasKeys: false
  }),
  methods: {
    onCreateClick() {
      if (this.parsable) this.create(JSON.parse(this.editorString))
    }
  },
  watch: {
    editorString(str) {
      try {
        let obj = JSON.parse(str)
        this.parsable = true
        this.hasKeys = Object.keys(obj).length ? true : false
      } catch(e) {
        this.parsable = false
      }
    }
  }
}
</script>

<style>

</style>
