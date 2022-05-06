import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// TODO 路由访问权限控制
import './permission'

import 'virtual:svg-icons-register'
import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
