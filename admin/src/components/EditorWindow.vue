<template>
  <column raised editor-window>
    <v-card flat color="darken-20-percent" class="pl-5 py-3 no-grow">
      <h2>Create</h2>
    </v-card>
    <v-flex px-5 pt-3>
      <textarea style="width:200px; height:300px;white-space: pre-wrap; font-family: monospace" class="darken-10-percent" 
      :value="editorString"
      @blur="myData=JSON.parse($event.target.value)"/>
    </v-flex>
  </column>
</template>

<script>
export default {
  data: () => ({
    editorString: '{\n    \n}'
  })
}
</script>

<style>

</style>
