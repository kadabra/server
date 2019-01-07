<template>
  <div class="h-full w-full bg-grey-darkest text-grey">
    <row p-4 mb-4 bg-black flex justify-center>
      <txt-accent uppercase font-semibold>New Endpoint</txt-accent>
    </row>
    <row pt-2 px-6>
      <column flex-1 pr-8>
        <text-field v-model="newEndpointName" name="name *" placeholder=""/>
        <text-field v-model="newEndpointDesc" name="description" placeholder=""/>
        <row items-center>
          <text-field v-model="newEndpointIcon" name="icon *" class="pr-6 w-4/5" placeholder=""/>
          <mdi text-5xl text-center :class="`mdi-${newEndpointIcon}`"/>
        </row>
      </column>
      <column flex-1>
        <row flex-wrap border border-black h-48 overflow-auto bg-grey>
          <mdi :class="`mdi-${icon}`"
            w-8
            text-grey-darker hover:text-black darkmode-transition cursor-pointer text-3xl m-1 
            v-for="icon in icons" :key="icon"
            @click="newEndpointIcon = icon"
          />
        </row>
      </column>
    </row>
    <column px-6>
      <txt-accent uppercase text-xs pb-2>Private</txt-accent>
      <row items-center px-4>
        <input type="checkbox" v-model="newEndpointPrivate"/>
        <txt-accent capitalize text pl-4
          v-text="newEndpointPrivate 
            ? 'only logged-in users can access this endpoint' 
            : 'anyone can access this endoint'"
        />
      </row>
    </column>
    <row justify-center pt-4 pb-6>
      <modal-btn :class="{'opacity-25': !valid}" capitalize @click="onClick">Create endpoint</modal-btn>
    </row>
  </div>
</template>

<script>
import TextField from './../TextField.vue'
import mdi from './../../utils/mdi.js'

export default {
  components: {
    TextField
  },
  data: () => ({
    newEndpointName: '',
    newEndpointDesc: '',
    newEndpointIcon: '',
    newEndpointPrivate: false,
    icons: mdi
  }),
  computed: {
    valid() {
      return this.newEndpointName && this.newEndpointIcon && mdi.includes(this.newEndpointIcon)
    }
  },
  methods: {
    onClick() {
      if (this.valid) {
        this.$K('endpoints').create({ 
          name: this.newEndpointName, 
          desc: this.newEndpointDesc, 
          private: this.newEndpointPrivate, 
          icon: this.newEndpointIcon 
        })
        this.newEndpointName = ''
        this.newEndpointDesc = '' 
        this.newEndpointPrivate = false
        this.newEndpointIcon = ''
        this.$modal.hide('new-endpoint')
      }
    }
  }
}
</script>
