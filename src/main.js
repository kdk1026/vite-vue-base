import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index';
import VueCookies from 'vue-cookies';
import store from './store';
import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);

const head = createHead();
app.use(head);

app.use(router);
app.use(store);
app.use(VueCookies);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.mount('#app');
