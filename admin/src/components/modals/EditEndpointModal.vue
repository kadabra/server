<template>
  <div class="h-full w-full bg-grey-darkest text-grey">
    <row p-4 mb-4 bg-black flex justify-center>
      <txt-accent uppercase font-semibold>Edit Endpoint</txt-accent>
    </row>
    <row pt-2 px-6>
      <column flex-1 pr-8>
        <text-field disabled v-model="endpointName" name="name *" placeholder=""/>
        <text-field v-model="endpointDesc" name="description" placeholder=""/>
        <row items-center>
          <text-field v-model="endpointIcon" name="icon *" class="pr-6 w-4/5" placeholder=""/>
          <mdi text-5xl text-center :class="`mdi-${endpointIcon}`"/>
        </row>
      </column>
      <column flex-1>
        <row flex-wrap border border-black h-48 overflow-auto bg-grey>
          <mdi :class="`mdi-${icon}`"
            w-8
            text-grey-darker hover:text-black darkmode-transition cursor-pointer text-3xl m-1 
            v-for="icon in icons" :key="icon"
            @click="endpointIcon = icon"
          />
        </row>
      </column>
    </row>
    <column px-6>
      <txt-accent uppercase text-xs pb-2>Private</txt-accent>
      <row items-center px-4>
        <input type="checkbox" v-model="endpointPrivate"/>
        <txt-accent capitalize text pl-4
          v-text="endpointPrivate 
            ? 'Private: only logged-in users can access this endpoint' 
            : 'Public: anyone can access this endpoint'"
        />
      </row>
    </column>
    <row justify-center pt-4 pb-6>
      <modal-btn mr-5 :class="{'opacity-25 cursor-auto': !valid}" capitalize @click="onClickUpdate">Update endpoint</modal-btn>
      <modal-btn ml-5 :class="{'opacity-25 cursor-auto': !valid}" capitalize @click="onClickDelete">Delete endpoint</modal-btn>
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
  props: {
    endpoint: Object,
    required: true
  },
  data() {
    return {
      endpointName: this.endpoint.name,
      endpointDesc: this.endpoint.desc || '',
      endpointIcon: this.endpoint.icon ,
      endpointPrivate: this.endpoint.private || false,
      icons: mdi
    }
  },
  computed: {
    valid() {
      return this.endpointName && this.endpointIcon && mdi.includes(this.endpointIcon)
    }
  },
  methods: {
    onClickUpdate() {
      if (this.valid) {
        this.$F.authenticate()
        .then(_ => {
          this.$F.service('endpoints').patch(this.endpointName, { 
            name: this.endpointName, 
            desc: this.endpointDesc, 
            private: this.endpointPrivate, 
            icon: this.endpointIcon 
          })
          this.$modal.hide(`edit-endpoint-${this.endpointName}`)
        })
      }
    },
    onClickDelete() {
      if (this.valid) {
        var confirmed = confirm("Are you sure?");
        if (confirmed) {
          this.$F.authenticate()
          .then(_ => {
            this.$F.service('endpoints').remove(this.endpointName)
            this.$modal.hide(`edit-endpoint-${this.endpointName}`)
          })
        }
      }
    }
  }
}
</script>
