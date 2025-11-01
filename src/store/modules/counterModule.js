const INITIAL_STATE = {
    value: 0
};

const counterModule = {
    namespaced: true,
    state: () => ({
        ...INITIAL_STATE
    }),
    getters: {
        getValue(state) {
            return state.value;
        }
    },
    mutations: {
        increment(state) {
            state.value += 1;
        },
        decrement(state) {
            state.value -= 1;
        },
        reset(state) {
            Object.assign(state, INITIAL_STATE);
        },
        incrementByAmount(state, payload) {
            state.value += payload;
        }
    },
    actions: {
        increment(context) {
            context.commit('increment');
        },
        decrement(context) {
            context.commit('decrement');
        },
        reset(context) {
            context.commit('reset');
        },
        incrementByAmount(context, payload) {
            context.commit('incrementByAmount', payload);
        },
    }
};

export default counterModule;