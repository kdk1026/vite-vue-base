<template>
    <div>{{JSON.stringify(persons)}}</div>
    <button @click="handleAdd">추가</button>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';

const text = ref('');
const persons = ref([]);

onMounted(() => {
    text.value = 'Hello World';

    const initialData = [{ id: 1, name: '홍길동' }];
    persons.value = initialData;
});

watch(text, (newValue, oldValue) => {
    if ( newValue ) {
        alert(`watch: ${newValue}`);
    }
});

watchEffect(() => {
    if ( text.value ) {
        alert(`watchEffect: ${text.value}`);
    }
});

const handleAdd = () => {
    const nextId = persons.value.length + 1;
    const newPerson = { id: nextId, name: `임꺽정_${nextId}` };

    persons.value.push(newPerson);
};
</script>

<style scoped>

</style>