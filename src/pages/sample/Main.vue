<template>
    <h2>메인 - {{ profile }}</h2>
    <ul>
        <li>기본 Vue 사용법 : https://github.com/stars/kdk1026/lists/vue</li>
        <li>utils 참고 : https://github.com/kdk1026/vite-util</li>
    </ul>
</template>

<script setup>
const profile = import.meta.env.VITE_PROFILE;
</script>

<style scoped>

</style>