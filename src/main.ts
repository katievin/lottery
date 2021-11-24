import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

axios.defaults.baseURL = 'https://fqijf4bszi.execute-api.ap-northeast-1.amazonaws.com/production/';

createApp(App).use(router).mount('#app');
