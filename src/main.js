import { createApp } from 'vue';
import App from './App.vue';
import router from './routing';
import axios from 'axios';

const app = createApp(App);


axios.defaults.baseURL = 'http://localhost:3000';
app.config.globalProperties.$http = axios; 

app.use(router).mount('#app');