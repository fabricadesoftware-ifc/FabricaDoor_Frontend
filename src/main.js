import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import vuetify from './plugin/vuetify'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.use(Vue3Toastify, {
  timeout: 3000
})

app.mount('#app')
