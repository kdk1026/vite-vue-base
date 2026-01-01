<template>
    <div>
        <h1>Vue3 공식 상태관리</h1>
    </div>
    <div>
        <h2>Count: {{ counter }}</h2>
        <button @click="handleIncrement">증가 (+1)</button>
        <button @click="handleDecrement">감소 (-1)</button>
        <button @click="handleIncrementByFive">10 증가 (+10)</button>
        <button @click="handleReset">초기화</button>
    </div>
</template>

<script setup>
import { useCounterStore } from '@/store/counterStore';
import { computed } from 'vue';

const counterStore = useCounterStore();

const counter = computed(() => counterStore.getValue);

const handleIncrement = () => {
    counterStore.increment();
};

const handleDecrement = () => {
    counterStore.decrement();
};

const handleReset = () => {
    counterStore.reset();
};

const handleIncrementByFive = () => {
    counterStore.incrementByAmount(10);
};
</script>

<style scoped>

</style>