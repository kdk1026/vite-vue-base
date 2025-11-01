import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';
import counterModule from "./modules/counterModule";

const store = createStore({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            paths: []
        })
    ],
    modules: {
        counter: counterModule
    }
});

export default store;