import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index';
import VueCookies from 'vue-cookies';
import store from './store';
import { createHead } from '@unhead/vue/client'

const app = createApp(App);

/* 안먹힘... */
app.config.devtools = import.meta.env.MODE !== 'prod';

const head = createHead();
app.use(head);

app.use(router);
app.use(store);
app.use(VueCookies);

app.mount('#app');
