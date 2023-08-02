import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import '@/assets/base.css'
import 'primeicons/primeicons.css'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';


const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Antd)

app.mount('#app')