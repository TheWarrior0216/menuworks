import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
import VueGoogleMaps from "@fawmi/vue-google-maps";
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import './registerGlobalSocketHandlers'
import { router } from './router'


const root = createApp(App)
async function init() {
  await registerGlobalComponents(root)
  root
    .use(VueGoogleMaps, {
      load: {
        key: 'AIzaSyDq46WiXwnl9UoaNDabGfEvFnXrc7ZoXEI',
      },
    })
    .use(router)
    .mount('#app')
}
init()
