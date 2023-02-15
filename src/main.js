import { createApp } from 'vue';

import router from './router/index.js';
import App from './App.vue';

import DB from './database.js';
const dataBase = new DB();

const app = createApp(App);
app.provide('dataBase', dataBase);
app.use(router);

app.mount('#app');


