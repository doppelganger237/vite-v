import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import App from './App.vue'
import router from './router'

// 加载路由前获取登录用户信息
import './permission'

// svg图标生成
import 'virtual:svg-icons-register'

// 所有css样式
import 'uno.css'
import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())

const i18n = createI18n({
  locale: 'zh-CN',
  messages,
})
app.use(i18n)

app.mount('#app')
