import { defineStore } from "pinia";

const INITIAL_STATE = {
    value: 0
};

export const useCounterStore = defineStore('counter', {
    state: () => ({
        ...INITIAL_STATE
    }),

    getters: {
        getValue: (state) => state.value
    },

    actions: {
        increment() {
            this.value += 1;
        },
        decrement() {
            this.value -= 1;
        },
        reset() {
            this.value = INITIAL_STATE.value;
        },
        incrementByAmount(payload) {
            this.value += payload;
        }
    },

    persist: {
        key: 'my-counter-ky',
        storage: sessionStorage,
        paths: ['value']
    }
});