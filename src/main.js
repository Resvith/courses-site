import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import store from './store';

createApp(App)
.use(router)
.use(bootstrap)
.use(store)
.mount('#app')
