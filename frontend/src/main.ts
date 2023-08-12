import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import axios from 'axios'
import { createPinia } from 'pinia'
import router from './router'
import '@/assets/base.css'
import 'primeicons/primeicons.css'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

axios.defaults.baseURL = import.meta.env.VITE_HOST || 'http://localhost:3000'
axios.defaults.withCredentials = true;

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Antd)
app.component('EasyDataTable',Vue3EasyDataTable)

app.mount('#app')