import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 加载路由前获取登录用户信息
import './permission'

// svg图标生成
import 'virtual:svg-icons-register'

// 所有css样式
import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
