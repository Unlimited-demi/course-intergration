import { createApp } from 'vue'
import '@/assets/index.css'
import App from '@/App.vue'
import router from '@/helpers/router'
import pinia from '@/stores/pinia'


const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app');