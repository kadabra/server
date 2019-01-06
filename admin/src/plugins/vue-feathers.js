import Vue from 'vue'
import { VueFeathers } from '@vue-feathers/vue-feathers'
import { feathersClient } from './kadabra'

Vue.use(VueFeathers, { feathersClient })