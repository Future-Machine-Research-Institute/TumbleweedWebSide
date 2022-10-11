import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router/router'
import i18n from './locals'

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')
