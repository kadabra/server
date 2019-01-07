<template>
  <column field mb-6>
    <txt-accent v-if="name" text-xs uppercase>{{name}}</txt-accent>
    <input :value="text" @input="e => $emit('input', e.target.value)"
      :disabled="disabled"
      :type="type" class="mt-2 w-full p-1 darkmode-transition" 
      :placeholder="placeholder"
      :class="{
        'opacity-50': disabled,
        'bg-grey-dark text-black': $store.getters.dark,
        'bg-grey-light text-grey-darkest': !$store.getters.dark
      }"
    >
  </column>
</template>

<script>
export default {
  model: {
    prop: 'text',
  },
  props: {
    text: {
      type: String,
      required: true
    },
    disabled: Boolean,
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: 'example'
    }
  }
}
</script>
