<template>
    <div>
        <h2>Count: {{ counter }}</h2>
        <button @click="handleIncrement">증가 (+1)</button>
        <button @click="handleDecrement">감소 (-1)</button>
        <button @click="handleIncrementByFive">10 증가 (+10)</button>
        <button @click="handleReset">초기화</button>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const counter = computed(() => store.getters["counter/getValue"]);

const handleIncrement = () => {
    store.dispatch("counter/increment");
};

const handleDecrement = () => {
    store.dispatch("counter/decrement");
};

const handleReset = () => {
    store.dispatch("counter/reset");
};

const handleIncrementByFive = () => {
    store.dispatch("counter/incrementByAmount", 10);
};
</script>

<style scoped>

</style>