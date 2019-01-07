import { registerPrimitives } from "vue-primitives";
import Vue from "vue";

const adaptiveTextColor = {
  primary: ({store}) => store.getters.dark ? 'text-grey-light' : 'text-white',
  secondary: ({store}) => store.getters.dark ? 'text-black' : 'text-grey-dark',
  accent: ({store}) => store.getters.dark ? 'text-grey-dark' : 'text-grey-light',
  accentReactive: ({store}) => store.getters.dark ? 'text-grey-dark hover:text-grey-light' : 'text-grey-light hover:text-white'
}

const adaptiveBgColor = {
  primary: ({store}) => store.getters.dark ? 'bg-black' : 'bg-grey-dark',
  secondary: ({store}) => store.getters.dark ? 'text-grey-light' : 'text-grey-darkest',
  accent: ({store}) => store.getters.dark ? 'text-grey-dark' : 'text-grey-light'
}

registerPrimitives(Vue, {
  Container: { tag: "div" },
  Txt: { tag: "span" },
  Mdi: { tag: "span" },
  Row: { tag: "div", classes: 'flex' },
  Column: { tag: "div", classes: 'flex flex-col' },
  
  TxtPrimary: { 
    tag: "span", 
    classes: 'darkmode-transition',
    conditionals: [adaptiveTextColor.primary]
  },
  TxtSecondary: { 
    tag: "span", 
    classes: 'darkmode-transition',
    conditionals: [adaptiveTextColor.secondary]
  },
  TxtAccent: { 
    tag: "span", 
    classes: 'darkmode-transition',
    conditionals: [adaptiveTextColor.accent]
  },

  IconPrimaryStatic: { 
    tag: "span", 
    classes: 'mdi darkmode-transition',
    conditionals: [adaptiveTextColor.primary]
  },
  IconAccent: { 
    tag: "span", 
    classes: 'mdi darkmode-transition cursor-pointer',
    conditionals: [adaptiveTextColor.accentReactive]
  },
  IconAccent: { 
    tag: "span", 
    classes: 'mdi darkmode-transition cursor-pointer',
    conditionals: [adaptiveTextColor.accentReactive]
  },

  BoxPrimary: { 
    tag: "div", 
    classes: 'darkmode-transition',
    conditionals: [adaptiveBgColor.primary]
  },

  ModalBtn: {
    tag: 'button',
    classes: 'rounded py-2 px-4 flex-no-grow darkmode-transition font-semibold',
    conditionals: [
      ({store}) => store.getters.dark ? 'bg-grey-dark text-black' : 'bg-grey-light text-grey-darkest'
    ]
  },
  LoginBtn: {
    tag: 'button',
    classes: 'rounded py-2 w-24 px-4 flex-no-grow darkmode-transition font-semibold',
    conditionals: [
      ({store}) => store.getters.dark ? 'bg-grey-darkest text-white' : 'bg-grey-light text-grey-darkest'
    ]
  }
})
