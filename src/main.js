import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueAxios, axios)
app.use(VueTailwindDatepicker)

app.mount('#app')
