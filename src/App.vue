<script setup>
import ErrorBoundary from './components/ErrorBoundary.vue';
import MenuBar from './components/layouts/MenuBar.vue';
</script>

<template>
  <ErrorBoundary>
    <MenuBar />
    <router-view :key="$route.fullPath"></router-view>
  </ErrorBoundary>
</template>

<style scoped>
</style>
