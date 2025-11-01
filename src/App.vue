<script setup>
import { useHead } from '@unhead/vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
import MenuBar from './components/layouts/MenuBar.vue';
import { useCustomBackNavigation } from './compositions/useCustomBackNavigation';

const title = import.meta.env.VITE_APP_TITLE;

useCustomBackNavigation();

useHead({
  title: title,
  meta: [
    { property: 'og:title', content: title }
  ]
});
</script>

<template>
  <ErrorBoundary>
    <metainfo></metainfo>
    <MenuBar />
    <router-view :key="$route.fullPath"></router-view>
  </ErrorBoundary>
</template>

<style scoped>
</style>
