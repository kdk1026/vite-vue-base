import { createRouter, createWebHashHistory } from "vue-router";
import Main from "@/pages/sample/Main.vue";
import Vuex from "@/pages/sample/Vuex.vue";

const routes = [
    { path: '/', component: Main },
    { path: '/vuex', component: Vuex }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});