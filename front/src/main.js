import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' 

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  }
})


import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions);
app.use(vuetify);
app.mount('#app');